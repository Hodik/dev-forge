'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DiscordCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    const license_key = sessionStorage.getItem('license_key');

    if (code && license_key) {
    // Make an API request to your backend
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/activate', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, license_key }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.redirect_to) {
                window.location.href = data.redirect_to;
            }
        })
        .catch(error => {
            console.error('Error during activation:', error);
        });
    }
  }, [code]);

  return <div>Processing your request...</div>;
}