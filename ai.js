import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateReply(message) {
  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: "You are a calm, supportive mental health assistant." },
      { role: "user", content: message }
    ]
  });

  return completion.choices[0].message.content;
}