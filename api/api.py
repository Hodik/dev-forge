from fastapi import FastAPI, Request, HTTPException, Header, Body
import asyncio
import uvicorn
import logging
import hashlib
import hmac
import requests
import os
from bot import add_role_to_user, bot, get_guild_id
from fastapi.middleware.cors import CORSMiddleware
from discord.errors import NotFound

api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

LEMON_WEBHOOK_SECRET = os.getenv("LEMON_WEBHOOK_SECRET")
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")
LEMON_API_KEY = os.getenv("LEMON_API_KEY")


def get_access_token(code):
    url = "https://discord.com/api/oauth2/token"
    data = {
        "client_id": os.getenv("DISCORD_CLIENT_ID"),
        "client_secret": os.getenv("DISCORD_CLIENT_SECRET"),
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": os.getenv("DISCORD_REDIRECT_URI"),
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(url, data=data, headers=headers)
    response.raise_for_status()  # Raise an error for bad responses
    return response.json().get("access_token")


def get_user_info(access_token):
    url = "https://discord.com/api/users/@me"
    headers = {"Authorization": f"Bearer {access_token}"}

    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an error for bad responses
    return response.json()


def add_user_to_guild(access_token, user_id, guild_id):
    url = f"https://discord.com/api/v10/guilds/{guild_id}/members/{user_id}"
    headers = {
        "Authorization": f"Bot {DISCORD_TOKEN}",
        "Content-Type": "application/json",
    }
    data = {"access_token": access_token}

    response = requests.put(url, headers=headers, json=data)

    if response.status_code == 201:
        print("User successfully added to the guild.")
    elif response.status_code == 204:
        print("User is already a member of the guild.")
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)


def lemon_request(
    api_key: str, path: str, method: str = "GET", body: dict | None = None
):
    return requests.request(
        method,
        f"https://api.lemonsqueezy.com/v1" + path,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
        },
        json=body,
    )


def license_key_status(license_key: str):
    response = lemon_request(
        LEMON_API_KEY,
        f"/licenses/validate",
        method="POST",
        body={"license_key": license_key},
    )
    data = response.json()
    return data["license_key"]["status"]


def activate_license_key_lemonsqueezy(license_key: str, discord_user_id: str):
    response = lemon_request(
        LEMON_API_KEY,
        f"/licenses/activate",
        method="POST",
        body={"license_key": license_key, "instance_name": discord_user_id},
    )
    data = response.json()
    return data["license_key"]["status"]


def get_license_key_discord_user_id(license_key_id: str):
    response = lemon_request(
        LEMON_API_KEY,
        f"/license-key-instances?filter[license_key_id]={license_key_id}",
        method="GET",
    )
    data = response.json()
    return data["data"][0]["attributes"]["name"]


async def activate_license_key(license_key: str, discord_user_id: str):
    activate_license_key_lemonsqueezy(license_key, discord_user_id)
    await add_role_to_user(get_guild_id(), discord_user_id, "active")


async def cancel_subscription(license_key_id: str):
    discord_user_id = get_license_key_discord_user_id(license_key_id)
    await add_role_to_user(get_guild_id(), discord_user_id, "inactive")


@api.post("/webhook")
async def webhook(request: Request, signature: str = Header(alias="X-Signature")):
    digest = hmac.new(
        LEMON_WEBHOOK_SECRET.encode(), await request.body(), hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(digest, signature):
        raise HTTPException(status_code=401, detail="Invalid signature")

    data = await request.json()
    logging.info(f"Received webhook: {data}")

    event_type = data["meta"]["event_type"]

    if event_type == "license_key_updated" and data["data"]["status"] in {
        "disabled",
        "expired",
    }:
        await cancel_subscription(data["data"]["id"])
        return {"message": "License key cancelled"}

    return {"message": "Event not handled"}


@api.get("/discord-callback")
async def discord_callback(request: Request):
    print(request.query_params)
    return {"message": request.query_params}


@api.post("/activate")
async def activate_license(license_key: str = Body(), code: str = Body()):
    try:
        access_token = get_access_token(code)
        user_info = get_user_info(access_token)
        discord_user_id = user_info["id"]
    except Exception as e:
        raise HTTPException(
            status_code=400, detail="Error getting access token: " + str(e)
        ) from e

    try:
        license_status = license_key_status(license_key)
        print("LICENSE STATUS for ", license_key, "is", license_status)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e

    if license_status != "inactive":
        raise HTTPException(status_code=400, detail="License key is not inactive")

    add_user_to_guild(access_token, discord_user_id, get_guild_id())

    try:
        await activate_license_key(license_key, discord_user_id)
    except NotFound:
        raise HTTPException(status_code=400, detail="User is not a member of the guild")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

    return {
        "message": "License key activated",
        "redirect_to": f"discord://discordapp.com/channels/{get_guild_id()}",
    }


@api.get("/guilds")
async def get_guilds():
    return [{"id": g.id, "name": g.name} for g in bot.guilds]


async def start_bot():
    await bot.start(DISCORD_TOKEN)


async def start_api():
    config = uvicorn.Config(api, host="0.0.0.0", port=8000, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()


async def main():
    # Run both the bot and the API concurrently
    await asyncio.gather(start_bot(), start_api())


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        asyncio.get_event_loop().run_until_complete(bot.close())
