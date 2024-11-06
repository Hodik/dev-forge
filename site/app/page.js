import Link from 'next/link';

// pages/index.js// pages/index.js
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="flex flex-col items-center mt-8 pb-20 w-full mb-32 gap-6 text-center md:pb-6 min-h-screen relative">
        <img
          src="/me.png"
          alt="logo"
          className="rounded-full w-32 h-32 sm:w-48 sm:h-48 shadow-lg object-cover"
        />
        <div className="flex flex-col w-full gap-4 max-w-xl items-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-black">
            Denis's Dev Forge
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Dedicated community for professional software engineers to level up their careers. No indie hackers. Connect and learn from seniors.
          </p>
          <div className="grid grid-cols-2 w-full gap-2 max-w-lg">
            <div className="flex-col items-start border-2 text-start rounded-lg flex p-3" style={{ borderColor: 'rgb(60, 130, 246)' }}>
              <p className="text-md font-bold" style={{ color: 'rgb(60, 130, 246)' }}>Membership</p>
              <p className="text-gray-600">$17.99 / month</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-lg flex-col gap-4 items-center">
          <p className="text-lg font-bold text-start w-full text-black">Access to</p>
          <div className="flex w-full gap-2 flex-wrap">
            <div className="w-min flex flex-col items-center relative rounded-lg">
              <div className="bg-[#5865f2] rounded-lg w-full">
                <div className="w-min py-2 px-6 flex gap-2 cursor-pointer rounded-lg justify-center items-center relative w-full">
                  <img width="20" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" alt="Icon" />
                  <p className="font-bold text-md text-gray-100">Discord</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="items-start w-full flex flex-col gap-6 max-w-lg justify-center">
          <p className="text-lg font-bold text-black">Inside the community</p>
          <div className="w-full flex flex-row gap-4">
            <div className="w-12 h-12 min-w-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-xl">🤝</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold text-start text-black">1 on 1 Access To Denis</p>
              <p className="text-md text-start text-gray-600">Chat with Denis directly + other devs. Chat about career, interview prep, building products and startups. You will have someone to ask questions and get advice.</p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-4">
            <div className="w-12 h-12 min-w-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-xl">📚</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold text-start text-black">Book club</p>
              <p className="text-md text-start text-gray-600">We read tech books here. We know what to read and why from experience. Join us to discuss and learn together.</p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-4">
            <div className="w-12 h-12 min-w-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-xl">💻</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold text-start text-black">Open source club</p>
              <p className="text-md text-start text-gray-600">We contribute to open source projects together. Build your experience and get your name out there. (Even without having a job)</p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-4">
            <div className="w-12 h-12 min-w-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-xl">📜</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold text-start text-black">Early and discounted access to Denis's courses</p>
              <p className="text-md text-start text-gray-600">Receive early access to Denis's future courses on backend development, cloud infrastructure and get them at a discount.</p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-4">
            <div className="w-12 h-12 min-w-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-xl">🫂</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold text-start text-black">Join a community of professional engineers</p>
              <p className="text-md text-start text-gray-600">Talk to others, share your experiences, do projects together and learn from each other.</p>
            </div>
          </div>
        </div>
        <div className="w-screen z-10 flex flex-col fixed bottom-0">
          <div className="h-32 w-full" style={{ background: 'linear-gradient(transparent, rgb(255, 255, 255))' }}></div>
          <div className="w-full px-4 pb-2 gap-2 flex flex-col items-center bg-white">
            <Link className="w-full" href="https://denislearnstech.lemonsqueezy.com/buy/eac3d37a-f784-4b64-8639-b35eeaf0fb98">
              <button className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-primary/90 px-4 py-2 w-full flex-col tracking-tight text-lg font-bold text-white max-w-lg h-auto min-h-16 rounded-full shadow-lg" style={{ backgroundColor: 'rgb(60, 130, 246)' }}>
                <p className="text-md">Subscribe • $17.99 USD / month</p>
              </button>
            </Link>
            <p className="mx-auto max-w-md text-gray-400">
              <a className="cursor-pointer">Cancel anytime</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}