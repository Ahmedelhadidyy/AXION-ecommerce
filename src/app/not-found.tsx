// import Link from "next/link";

// export default function NotFound() {
//   return (
//     <main className="flex min-h-screen items-center justify-center px-6">
//       <div className="max-w-2xl text-center">
//         <span className="text-primary text-8xl font-bold">
//           404
//         </span>

//         <h1 className="mt-6 text-5xl font-bold">
//           Page Not Found
//         </h1>

//         <p className="mt-6 text-lg text-white/60">
//           Looks like this page
//           does not exist anymore.
//         </p>

//         <Link
//           href="/"
//           className="
//           mt-10
//           inline-flex
//           rounded-full
//           bg-primary
//           px-8
//           py-4
//           font-bold
//           text-black
//           transition
//           hover:bg-primary/80
//         "
//         >
//           Back Home
//         </Link>
//       </div>
//     </main>
//   );
// }

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-28 bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Design */}
        <div className="mb-12">
          <div className="relative inline-block">
            {/* Large 404 Text with styling */}
            <h1 className="text-9xl md:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/50 leading-none mb-4">
              404
            </h1>

            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 border border-primary/20 rounded-full" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary/10 rounded-full" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        {/* Subheading */}
        <p className="text-xl text-white/60 mb-6">
          Looks like this page did not make the cut. It is missing from our
          lineup, but do not worry— we have got plenty of other destinations
          ready for you.
        </p>

        {/* Motivational message */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-10">
          <p className="text-primary font-semibold text-lg">
            Sometimes the best journey is finding a new path.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-black font-bold py-4 px-8 rounded-lg hover:bg-primary/70 transition duration-300 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 border border-primary/40 text-white font-bold py-4 px-8 rounded-lg hover:bg-primary/10 transition duration-300 active:scale-95"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Footer text */}
        <p className="mt-10 mb-10 text-white/40 text-sm">
          Lost? Try searching or contact our support team at{" "}
          <Link
            href="/contact"
            className="text-primary hover:text-primary/70 transition"
          >
            support@axion.com
          </Link>
        </p>

        {/* Decorative SVG background */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </main>
  );
}
