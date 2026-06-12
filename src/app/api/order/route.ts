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
      orderId,
      customerInfo,
      items,
      subtotal,
    } = body;

    const productsHtml = items
      .map(
        (item: {
          name: string;
          quantity: number;
          price: number;
          size?: string;
        }) => `
          <tr>
            <td>${item.name}</td>
            <td>${item.size || "-"}</td>
            <td>${item.quantity}</td>
            <td>$${(
              item.price *
              item.quantity
            ).toFixed(2)}</td>
          </tr>
        `
      )
      .join("");

    await resend.emails.send({
      from:
        "AXION Orders <onboarding@resend.dev>",

      to: [
        process.env.CONTACT_EMAIL!,
      ],

      subject: `🛒 New Order ${orderId}`,

      html: `
        <h1>New AXION Order</h1>

        <hr />

        <h2>Customer Information</h2>

        <p><strong>Name:</strong> ${customerInfo.firstName} ${customerInfo.lastName}</p>

        <p><strong>Email:</strong> ${customerInfo.email}</p>

        <p><strong>Phone:</strong> ${customerInfo.phone}</p>

        <p><strong>Country:</strong> ${customerInfo.country}</p>

        <p><strong>City:</strong> ${customerInfo.city}</p>

        <p><strong>Address:</strong> ${customerInfo.address}</p>

        <hr />

        <h2>Order Details</h2>

        <p><strong>Order ID:</strong> ${orderId}</p>

        <table border="1" cellpadding="10" cellspacing="0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            ${productsHtml}
          </tbody>
        </table>

        <h2>
          Total: $${subtotal.toFixed(2)}
        </h2>
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