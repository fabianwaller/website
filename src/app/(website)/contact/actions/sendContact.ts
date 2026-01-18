"use server";

import { TelegramBot } from "typescript-telegram-bot-api";
import { z } from "zod";

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!botToken || !chatId) {
  throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables");
}

const bot = new TelegramBot({ botToken: botToken });

const contactSchema = z.object({
  firstname: z.string().min(2).max(100),
  lastname: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(5000),
});

function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

export const sendContact = async (values: unknown) => {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  const { firstname, lastname, email, message } = parsed.data;

  const sanitizedFirstname = sanitizeText(firstname);
  const sanitizedLastname = sanitizeText(lastname);
  const sanitizedEmail = sanitizeText(email);
  const sanitizedMessage = sanitizeText(message);

  try {
    await bot.sendMessage({
      chat_id: chatId,
      text: `Name: ${sanitizedFirstname} ${sanitizedLastname}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
    });
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    throw new Error("Failed to send message");
  }
};
