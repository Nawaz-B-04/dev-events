import ExploreBtn from "@/components/ExploreBtn";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-32 px-6 bg-gradient-to-b from-slate-900 to-slate-950 min-h-[85vh]">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            🚀 The #1 Platform for Developers
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Discover Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">bigbreak_</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers at the world's best hackathons, conferences, and intimate meetups.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/events" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
              Explore Events
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
            <Link href="/signup" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-full font-bold text-lg transition-all flex items-center justify-center">
              Join Community
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-12 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple text placeholders for logos */}
            <span className="text-xl font-bold text-gray-500">GOOGLE</span>
            <span className="text-xl font-bold text-gray-500">MICROSOFT</span>
            <span className="text-xl font-bold text-gray-500">AMAZON</span>
            <span className="text-xl font-bold text-gray-500">NETFLIX</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-950 text-white px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How DevEvents Works</h2>
            <p className="text-gray-400 text-lg">Your journey to the next big opportunity starts here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-colors group">
              <div className="w-14 h-14 bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔎</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Does It Suit You?</h3>
              <p className="text-gray-400 leading-relaxed">
                Filter events by stack, location, and price. Find the perfect match for your career goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors group">
              <div className="w-14 h-14 bg-purple-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎟️</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Book Instantly</h3>
              <p className="text-gray-400 leading-relaxed">
                Secure your spot in seconds. Receive QR tickets directly to your email and dashboard.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-green-500/50 transition-colors group">
              <div className="w-14 h-14 bg-green-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Level Up</h3>
              <p className="text-gray-400 leading-relaxed">
                Connect with industry leaders, learn new skills, and accelerate your developer journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 mx-4 rounded-3xl mb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/icons/hero-pattern.svg')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to join the movement?</h2>
          <p className="text-blue-100 text-lg mb-8">Create your account today and get access to exclusive developer events worldwide.</p>
          <Link href="/signup" className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors inline-block shadow-lg">
            Get Started for Free
          </Link>
        </div>
      </section>
    </>
  )
}