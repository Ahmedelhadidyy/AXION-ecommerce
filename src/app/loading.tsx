// export default function Loading() {
//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       <div className="text-center">
//         <div
//           className="
//           mx-auto
//           mb-6
//           h-16
//           w-16
//           animate-spin
//           rounded-full
//           border-4
//           border-primary/20
//           border-t-primary
//         "
//         />

//         <h2 className="text-2xl font-bold">
//           Loading AXION...
//         </h2>

//         <p className="mt-3 text-white/60">
//           Preparing your experience.
//         </p>
//       </div>
//     </main>
//   );
// }

export default function Loading() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="mb-8">
          <div className="inline-block relative w-16 h-16">
            {/* Outer rotating circle */}
            <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin" />

            {/* Inner pulsing circle */}
            <div className="absolute inset-4 border-2 border-primary/30 rounded-full animate-pulse" />

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
          </div>
        </div>

        {/* Loading Text */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Preparing Your
          <br />
          <span className="text-primary">AXION Experience</span>
        </h1>

        <p className="text-white/60 text-lg mb-12 max-w-md mx-auto">
          Just a moment. We are loading something special for you.
        </p>

        {/* Animated Loading Bars */}
        <div className="space-y-3 max-w-xs mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-primary to-primary/40 rounded-full animate-pulse" />
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary/40 to-primary rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary to-primary/40 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>

        {/* Performance Quote */}
        <p className="mt-16 text-white/40 text-sm italic">
          The goal is not to be better than others. The goal is to be better
          than yesterday.
        </p>
      </div>
    </main>
  );
}
