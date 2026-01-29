const twilio = require("twilio");

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

module.exports = async ({ pdfUrl, orderId }) => {
  await client.messages.create({
    from: "whatsapp:+14155238886", // Twilio sandbox
    to: "whatsapp:+91XXXXXXXXXX", // ADMIN NUMBER
    body: `🧾 New Order Received\nOrder ID: ${orderId}`,
    mediaUrl: [pdfUrl], // ✅ PDF ATTACHMENT
  });
};
