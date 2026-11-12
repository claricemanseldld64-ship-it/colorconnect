
export default async (req) => {
  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram environment variables are missing");
    }

    const data = await req.json();

    // Build Telegram message
    const message = `
🔔 NEW WEBSITE FORM SUBMISSION

👤 Name: ${data.name || "Not provided"}
📧 Email: ${data.email || "Not provided"}
📞 Phone: ${data.phone || "Not provided"}

📝 Message:
${data.message || "No message provided"}
    `;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    const result = await telegramResponse.json();

    if (!telegramResponse.ok || !result.ok) {
      throw new Error(result.description || "Telegram delivery failed");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Telegram error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Something went wrong"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
