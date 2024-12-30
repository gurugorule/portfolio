import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { kv } from "@vercel/kv";

const RATE_LIMIT = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 3600; // per hour (in seconds)

// In-memory store for rate limiting when Vercel KV is not available
const localRateLimit = new Map<string, number>();

export async function POST(req: Request) {
  console.log("Received request to send email");

  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  let currentCount = 0;

  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      currentCount = (await kv.get<number>(`rate-limit:${ip}`)) || 0;
    } else {
      currentCount = localRateLimit.get(ip) || 0;
    }
  } catch (error) {
    console.error("Error accessing rate limit data:", error);
    // Fallback to local rate limiting
    currentCount = localRateLimit.get(ip) || 0;
  }

  if (currentCount >= RATE_LIMIT) {
    console.log(`Rate limit exceeded for IP: ${ip}`);
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // Increment rate limit count
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      await kv.set(`rate-limit:${ip}`, currentCount + 1, {
        ex: RATE_LIMIT_WINDOW,
      });
    } else {
      localRateLimit.set(ip, currentCount + 1);
      setTimeout(() => localRateLimit.delete(ip), RATE_LIMIT_WINDOW * 1000);
    }
  } catch (error) {
    console.error("Error updating rate limit data:", error);
    // Fallback to local rate limiting
    localRateLimit.set(ip, currentCount + 1);
    setTimeout(() => localRateLimit.delete(ip), RATE_LIMIT_WINDOW * 1000);
  }

  // Parse request body
  const { name, email, message } = await req.json();
  console.log("Request body:", {
    name,
    email,
    message: message.substring(0, 50) + "...",
  });

  // Check environment variables
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
