"use server";

import { ValuesType } from "@/components/ContactForm";
import { TelegramBot } from "typescript-telegram-bot-api";

const bot = new TelegramBot({ botToken: process.env.TELEGRAM_BOT_TOKEN });

export const sendContact = async (values: ValuesType) => {
  try {
    await bot.sendMessage({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: `Name: ${values.firstname + " " + values.lastname} \nEmail: ${values.email} \nMessage: ${values.message}`,
      message_thread_id: process.env.TELEGRAM_TOPIC_ID ? parseInt(process.env.TELEGRAM_TOPIC_ID) : undefined,

    });
  } catch (error) {
    console.error(error);
    throw new Error("error sending contact");
  }
};
