'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Welcome() {
  const searchParams = useSearchParams();
  const license_key = searchParams.get('license_key');

  useEffect(() => {
    var discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    
    var redirectUri = window.location.origin + '/discord';
    console.log(redirectUri);

    if (license_key) {
      const discordOAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify+guilds.join`;

      sessionStorage.setItem('license_key', license_key);
      // Redirect to Discord OAuth
      window.location.href = discordOAuthUrl;
    }
  }, [license_key]);

  return <div>Redirecting to Discord for authentication...</div>;
}