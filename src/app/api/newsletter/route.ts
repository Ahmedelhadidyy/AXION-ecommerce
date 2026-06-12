import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // ✅ Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // ✅ Send welcome email
    await resend.emails.send({
      from: "AXION <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to AXION Newsletter! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center; border-radius: 12px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">AXION</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Welcome to the Community</p>
          </div>

          <h2 style="color: #10b981; font-size: 24px; margin-bottom: 16px;">
            🎯 You're In!
          </h2>

          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
            Thanks for subscribing to AXION Newsletter! You'll now get:
          </p>

          <ul style="color: #4b5563; line-height: 1.8; margin-bottom: 30px;">
            <li>✨ New product launches & exclusive drops</li>
            <li>💪 Training tips from pro athletes</li>
            <li>🎁 Special discounts & early access</li>
            <li>📢 Community updates & events</li>
          </ul>

          <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <p style="color: #1f2937; margin: 0; font-weight: bold;">
              💡 Pro Tip: Check your inbox for our latest collection drops!
            </p>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="https://your-domain.com/shop" style="background: #10b981; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              Start Shopping
            </a>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; color: #9ca3af; font-size: 12px; text-align: center;">
            <p>
              The goal is not to be better than others. The goal is to be better than yesterday.
            </p>
            <p style="margin-top: 10px;">
              © 2024 AXION. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    // ✅ Send confirmation to admin (optional)
    await resend.emails.send({
      from: "AXION <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "admin@axion.com",
      subject: `New Newsletter Subscriber: ${email}`,
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
    });
  } catch (error) {
    console.error("Newsletter error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to subscribe. Please try again.",
      },
      { status: 500 }
    );
  }
}