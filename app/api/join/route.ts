// app/api/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimiter";
import logger from "@/lib/logger";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["info@nouvoayiti2075.com", "nouvoayiti2075@gmail.com"];

function getClientIP(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const tier = "public";

  try {
    logger.info(`[JOIN_SUBMISSION] Request received from IP: ${ip}`);

    if (!rateLimit(ip, tier)) {
      logger.warn(`[RATE_LIMIT_BLOCKED] IP: ${ip} exceeded tier '${tier}'`);
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);

    const name = (body?.name || "").toString().trim();
    const email = (body?.email || "").toString().trim();
    const phone = (body?.phone || "").toString().trim();
    const location = (body?.location || "").toString().trim();
    const message = (body?.message || "").toString().trim();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      logger.warn(
        `[JOIN_WARNING] RESEND_API_KEY is not set. Skipping email send but returning success for IP: ${ip}`,
      );
      return NextResponse.json(
        {
          success: true,
          message:
            "Mèsi anpil! Nou resevwa enfòmasyon ou yo. (Nòt: voye imèl la tanporèman dezaktive sou anviwònman sa a.)",
        },
        { status: 200 },
      );
    }

    const resend = new Resend(resendApiKey);

    // Send confirmation to user
    await resend.emails.send({
      from: "Ayiti 2075 <info@nouvoayiti2075.com>",
      to: [email],
      subject: "Ayiti 2075 – Konfimasyon enskripsyon ou",
      html: `
        <p>Bonjour / Bonjou ${name},</p>
        <p>Mèsi paske ou rejwenn misyon Nouvo Ayiti 2075 la.</p>
        <ul>
          <li><strong>Non :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          ${phone ? `<li><strong>Telefòn :</strong> ${phone}</li>` : ""}
          ${location ? `<li><strong>Kote w ye :</strong> ${location}</li>` : ""}
          <li><strong>Mesaj :</strong> ${message || "—"}</li>
        </ul>
        <p>
          Nou kontan resevwa ou nan ekip la. N ap kontinye fè w konnen pwochen etap yo.
        </p>
        <p>Ekip Ayiti 2075</p>
      `,
    });

    logger.info(`[EMAIL_SENT] Confirmation sent to: ${email}`);

    // Notify admins
    await resend.emails.send({
      from: "Ayiti Bot <info@nouvoayiti2075.com>",
      to: ADMIN_EMAILS,
      subject: "Nouvo manm ki rejwenn Ayiti 2075",
      html: `
        <p>📥 Nou resevwa nouvo fòm enskripsyon:</p>
        <ul>
          <li><strong>Non :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          ${phone ? `<li><strong>Telefòn :</strong> ${phone}</li>` : ""}
          ${location ? `<li><strong>Kote li soti :</strong> ${location}</li>` : ""}
          <li><strong>Mesaj :</strong> ${message || "—"}</li>
        </ul>
      `,
    });

    logger.info(`[ADMIN_ALERT] Admin notification sent for: ${email}`);

    return NextResponse.json(
      {
        success: true,
        message:
          "Mèsi anpil! Nou resevwa enskripsyon ou. Tanpri tcheke bwat imèl ou pou konfimasyon an.",
      },
      { status: 200 },
    );
  } catch (error) {
    logger.error(
      `[JOIN_ERROR] Failed to process submission from IP: ${ip}`,
      error,
    );
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
