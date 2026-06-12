"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // ✅ Auto close success message after 4 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const onSubmit = async (data: ContactFormData) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Something went wrong.");
      return;
    }

    // ✅ Show success toast
    setShowSuccess(true);
    reset();
  };

  return (
    <main>
      {/* Hero */}

      <section className="px-6 py-32 text-center">
        <span className="text-primary text-2xl font-semibold uppercase tracking-[0.3em]">
          Contact AXION
        </span>

        <h1 className="mt-8 text-5xl font-bold md:text-7xl text-white">
          We are Here
          <br />
          To Help.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60">
          Questions about products, orders, partnerships or anything else? We
          would love to hear from you.
        </p>
      </section>

      {/* Contact Cards */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center hover:bg-primary/10 transition">
            <Mail className="mx-auto mb-4 text-primary" size={32} />

            <h3 className="text-xl font-bold text-white">Email</h3>

            <p className="mt-3 text-white/60">support@axion.com</p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center hover:bg-primary/10 transition">
            <Phone className="mx-auto mb-4 text-primary" size={32} />

            <h3 className="text-xl font-bold text-white">Phone</h3>

            <p className="mt-3 text-white/60">+20 100 123 4567</p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center hover:bg-primary/10 transition">
            <MapPin className="mx-auto mb-4 text-primary" size={32} />

            <h3 className="text-xl font-bold text-white">Location</h3>

            <p className="mt-3 text-white/60">Cairo, Egypt</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Send Us A Message
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 md:grid-cols-2"
          >
            {/* First Name */}

            <div>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="w-full rounded-lg border border-primary/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary focus:outline-none transition"
              />

              {errors.firstName && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}

            <div>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="w-full rounded-lg border border-primary/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary focus:outline-none transition"
              />

              {errors.lastName && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full rounded-lg border border-primary/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary focus:outline-none transition"
              />

              {errors.email && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}

            <div>
              <input
                {...register("phone")}
                placeholder="Phone"
                className="w-full rounded-lg border border-primary/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary focus:outline-none transition"
              />

              {errors.phone && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Subject */}

            <div className="md:col-span-2">
              <input
                {...register("subject")}
                placeholder="Subject"
                className="w-full rounded-lg border border-primary/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary focus:outline-none transition"
              />

              {errors.subject && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}

            <div className="md:col-span-2">
              <textarea
                {...register("message")}
                rows={6}
                placeholder="Your Message"
                className="w-full rounded-lg border border-primary/20 bg-white/5 p-4 text-white placeholder:text-white/50 focus:border-primary focus:outline-none transition resize-none"
              />

              {errors.message && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              aria-label="submit"
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 rounded-lg bg-primary text-black font-bold py-4 transition hover:bg-primary/70 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-primary/40 active:scale-95 cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* ✅ Success Toast */}
          {showSuccess && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="bg-primary/20 border border-primary/40 rounded-lg p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-primary">
                    Message sent successfully!
                  </p>
                  <p className="text-sm text-white/70">
                    Thank you for reaching out. We will contact you soon.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Banner */}

      <section className="relative mt-24 h-96 md:h-150 overflow-hidden rounded-3xl mx-6">
        <Image
          src="/images/contact1.png"
          alt="Contact AXION"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-right lg:pl-96">
            <h2 className="text-4xl md:text-4xl font-bold text-white leading-tight">
              Need Help?
              <br />
              Our Team Is Ready.
            </h2>
            <p className="mt-6 text-sm text-white/80 max-w-2xl mx-auto">
              We are here to answer any questions and support your journey.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-12 text-center text-4xl text-white font-bold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 hover:bg-primary/10 transition">
            <h3 className="font-bold text-primary text-lg">
              How long does shipping take?
            </h3>

            <p className="mt-3 text-white/60">
              Orders are usually delivered within 2–5 business days.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 hover:bg-primary/10 transition">
            <h3 className="font-bold text-primary text-lg">
              Can I return products?
            </h3>

            <p className="mt-3 text-white/60">
              Yes, returns are accepted within 14 days of delivery.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 hover:bg-primary/10 transition">
            <h3 className="font-bold text-primary text-lg">
              Do you ship internationally?
            </h3>

            <p className="mt-3 text-white/60">
              International shipping will be available soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
