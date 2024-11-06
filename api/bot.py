import discord
from discord.ext import commands

intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)


@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}")


async def add_role_to_user(guild_id, user_id, role_name):
    guild = await bot.fetch_guild(guild_id)
    member = await guild.fetch_member(user_id)

    role = discord.utils.get(guild.roles, name=role_name)
    await member.add_roles(role)


async def print_guilds():
    for guild in bot.guilds:
        print(f"{guild.id}: {guild.name}")


def get_guild_id():
    for guild in bot.guilds:
        return guild.id
