"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // ✅ Validate email
      if (!email || !email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      // ✅ Send to API
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      // ✅ Success state
      setIsSuccess(true);
      setEmail("");

      // Reset after 4 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-32 bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Newsletter
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Stay Updated
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Get exclusive drops, training tips, and special offers delivered to
            your inbox. Join the AXION community today.
          </p>
        </div>

        {/* Form */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                aria-label="submit"
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-primary text-black font-bold px-8 py-4 hover:bg-primary/70 transition duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="mt-4 text-sm text-red-400 text-left">⚠️ {error}</p>
            )}

            {/* Privacy note */}
            <p className="mt-4 text-xs text-white/40">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        ) : (
          /* Success State */
          <div className="mx-auto max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="rounded-lg border border-primary/20 bg-primary/10 px-6 py-8 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20">
                <Check className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Welcome to AXION! 🎉
              </h3>

              <p className="text-white/70 text-sm">
                Check your email for exclusive offers and stay tuned for our
                latest drops.
              </p>
            </div>
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-white/10">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary mb-2">50K+</p>
            <p className="text-sm text-white/60">Active Members</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-primary mb-2">100%</p>
            <p className="text-sm text-white/60">Spam Free</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-primary mb-2">Weekly</p>
            <p className="text-sm text-white/60">Fresh Content</p>
          </div>
        </div>
      </div>
    </section>
  );
}
