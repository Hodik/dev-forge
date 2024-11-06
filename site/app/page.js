import Link from 'next/link';

export default function Home() {

  return (
    <div>
      <h1>Welcome to Our Community</h1>
      <p>Join our community to get exclusive benefits!</p>
      <Link href="https://denislearnstech.lemonsqueezy.com/buy/eac3d37a-f784-4b64-8639-b35eeaf0fb98">
        <button>Get Access</button>
      </Link>
      <Link href="https://denislearnstech.lemonsqueezy.com/billing">
        <button>Manage Subscription</button>
      </Link>
    </div>
  );
}