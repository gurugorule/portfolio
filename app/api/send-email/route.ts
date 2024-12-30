import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function POST(req: Request) {
  console.log("Received request to send email");

  const { name, email, message } = await req.json();
  console.log("Request body:", {
    name,
    email,
    message: message.substring(0, 50) + "...",
  });

  const apiKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.TO_EMAIL;
  const fromEmail = process.env.FROM_EMAIL;

  console.log("Environment variables:", {
    apiKeySet: !!apiKey,
    toEmailSet: !!toEmail,
    fromEmailSet: !!fromEmail,
  });

  if (!apiKey || !apiKey.startsWith("SG.")) {
    console.error("Invalid SendGrid API key format");
    return NextResponse.json(
      { error: "Invalid API key configuration" },
      { status: 500 },
    );
  }

  if (!toEmail || !fromEmail) {
    console.error("Missing TO_EMAIL or FROM_EMAIL environment variables");
    return NextResponse.json(
      { error: "Invalid email configuration" },
      { status: 500 },
    );
  }

  sgMail.setApiKey(apiKey);

  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <h1>New message from ${name}</h1>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    console.log("Attempting to send email");
    await sgMail.send(msg);
    console.log("Email sent successfully");
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Failed to send email:", error.toString());
    if (error.response) {
      console.error("SendGrid error response:", error.response.body);
    }
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
