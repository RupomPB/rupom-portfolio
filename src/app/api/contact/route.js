// Contact API Route — /api/contact
// Uses Resend to deliver emails securely server-side.
// Required env variables: RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // ---- Server-side validation ----
    const errors = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Please provide your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please provide a valid email address.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Your message must be at least 10 characters.";
    }

    if (name && name.trim().length > 120) {
      errors.name = "Name is too long.";
    }

    if (email && email.trim().length > 320) {
      errors.email = "Email address is too long.";
    }

    if (message && message.trim().length > 5000) {
      errors.message = "Message is too long (max 5000 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return Response.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const sanitizedName    = name.trim().slice(0, 120);
    const sanitizedEmail   = email.trim().slice(0, 320);
    const sanitizedMessage = message.trim().slice(0, 5000);

    // ---- Check Resend config ----
    const apiKey      = process.env.RESEND_API_KEY;
    const toEmail     = process.env.CONTACT_EMAIL || "rupombadhan111@gmail.com";
    const fromEmail   = process.env.FROM_EMAIL;

    if (!apiKey || apiKey === "re_your_key_here") {
      // Integration ready but key not configured — return informative error
      return Response.json(
        {
          success: false,
          message: "Email service not yet configured. Please add RESEND_API_KEY to your environment variables.",
          configError: true,
        },
        { status: 503 }
      );
    }

    if (!fromEmail) {
      return Response.json(
        {
          success: false,
          message: "FROM_EMAIL environment variable is not set.",
          configError: true,
        },
        { status: 503 }
      );
    }

    // ---- Build email HTML ----
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Portfolio Contact</title>
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f5f2ed; margin: 0; padding: 20px; }
    .wrapper { max-width: 580px; margin: 0 auto; }
    .card { background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: #080b09; padding: 32px 36px; }
    .header-title { color: #34d399; font-size: 13px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px; }
    .header-h1 { color: #edf0ec; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.03em; }
    .body { padding: 36px; }
    .field-label { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #7a8880; margin-bottom: 6px; }
    .field-value { font-size: 15px; color: #12170f; margin-bottom: 24px; }
    .field-value a { color: #1a9e6a; text-decoration: none; }
    .message-box { background: #f5f2ed; border-radius: 10px; padding: 20px; border-left: 3px solid #34d399; margin-bottom: 24px; }
    .message-text { font-size: 15px; line-height: 1.7; color: #2d3830; white-space: pre-wrap; }
    .footer-text { font-size: 12px; color: #98a09c; border-top: 1px solid #edeae4; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <p class="header-title">Portfolio Contact</p>
        <h1 class="header-h1">New message received</h1>
      </div>
      <div class="body">
        <p class="field-label">From</p>
        <p class="field-value">${sanitizedName}</p>

        <p class="field-label">Reply-to email</p>
        <p class="field-value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>

        <p class="field-label">Message</p>
        <div class="message-box">
          <p class="message-text">${sanitizedMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </div>

        <p class="footer-text">
          This message was submitted via the contact form at rupom-portfolio.<br>
          Reply directly to this email to respond to ${sanitizedName}.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // ---- Send via Resend ----
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:     fromEmail,
        to:       [toEmail],
        reply_to: sanitizedEmail,
        subject:  `Portfolio Contact: ${sanitizedName}`,
        html:     emailHtml,
        text:     `New contact form submission\n\nFrom: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("[contact] Resend error:", errorData);

      return Response.json(
        {
          success: false,
          message: "Failed to send your message. Please try again or email me directly.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: "Your message has been sent! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return Response.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
