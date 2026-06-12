import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    } = body;

    await resend.emails.send({
      from: "AXION <onboarding@resend.dev>",

      to: [
        process.env.CONTACT_EMAIL!,
      ],

      subject: `AXION Contact - ${subject}`,

      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <hr />

        <p>${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}