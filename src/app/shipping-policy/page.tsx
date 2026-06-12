export default function ShippingPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto py-24 flex flex-col items-center justify-between">
      <h1 className="text-3xl text-primary font-bold mb-6">Shipping Policy</h1>

      <p className="text-white/50 leading-7">
        At AXION, we aim to deliver your orders as fast and safely as possible.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Processing Time</h2>
      <p className="text-white/50 leading-7">
        Orders are usually processed within 1–3 business days after payment
        confirmation.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Delivery Time</h2>
      <p className="text-white/50 leading-7">
        Delivery time depends on your location. Typically, it takes 3–7 business
        days.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Shipping Fees</h2>
      <p className="text-white/50 leading-7">
        Shipping fees may vary based on your region and order size.
      </p>
    </main>
  );
}
