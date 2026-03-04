import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("public"));

/* ---------------- MEMORY ---------------- */
let moodHistory = [];
let lastEmotion = null;

/* ---------------- EMOTION DETECTION ---------------- */
function detectEmotion(message) {
  const text = message.toLowerCase();

  if (
    text.includes("suicide") ||
    text.includes("kill myself") ||
    text.includes("want to die") ||
    text.includes("end my life")
  ) return "crisis";

  if (text.match(/sad|depressed|lonely|cry|hurt/)) return "sad";
  if (text.match(/anxious|stress|panic|worried|fear/)) return "anxious";
  if (text.match(/angry|mad|frustrated|annoyed/)) return "angry";
  if (text.match(/happy|good|excited|great|awesome/)) return "happy";

  return "neutral";
}

/* ---------------- RANDOM PICK ---------------- */
function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------------- SMART RESPONSE ENGINE ---------------- */
function generateReply(message, emotion) {
  const text = message.toLowerCase();

  /* Greetings */
  if (text.match(/hi|hello|hey/)) {
    return randomPick([
      "Hello 🌿 I'm Kamaai. How are you feeling today?",
      "Hi there 💚 I'm here to listen. What's on your mind?",
      "Hey 😊 Tell me how your day is going."
    ]);
  }

  /* Thanks */
  if (text.includes("thank")) {
    return "You're always welcome 💙 I'm here anytime you need to talk.";
  }

  /* Motivation */
  if (text.match(/motivate|motivation|inspire/)) {
    return randomPick([
      "You are capable of more than you believe 💪",
      "Small progress is still progress. Keep going 🌱",
      "Even tough days build strong people."
    ]);
  }

  /* Sad */
  if (emotion === "sad") {
    return randomPick([
      "I'm really sorry you're feeling this way 💙 Do you want to tell me what happened?",
      "It's okay to feel sad sometimes. Your feelings matter.",
      "You don't have to go through this alone. I'm listening."
    ]);
  }

  /* Anxious */
  if (emotion === "anxious") {
    return randomPick([
      "Let's pause for a moment. Take a slow breath in... and out 🌬️",
      "Anxiety can feel overwhelming, but you're safe right now.",
      "Would you like to try a quick grounding exercise?"
    ]);
  }

  /* Angry */
  if (emotion === "angry") {
    return randomPick([
      "I understand that you're frustrated. Want to talk about it?",
      "Anger is a valid emotion. What triggered it?",
      "Let's slow things down together. I'm here."
    ]);
  }

  /* Happy */
  if (emotion === "happy") {
    return randomPick([
      "That's beautiful to hear 😊 What made your day better?",
      "Yay! I love positive energy 🌟 Tell me more!",
      "I'm glad you're feeling good 💚"
    ]);
  }

  /* Relationship */
  if (text.match(/breakup|relationship|love problem/)) {
    return "Relationships can be complicated 💔 Would you like to share what happened?";
  }

  /* Study stress */
  if (text.match(/exam|study|college|fail/)) {
    return "Academic pressure can be heavy 🎓 But one result doesn't define your worth.";
  }

  /* Overthinking */
  if (text.includes("overthinking")) {
    return "Overthinking can drain your energy. Try focusing only on what you can control right now 🌿";
  }

  /* Default */
  return "I'm here for you 🌿 Tell me more about what you're experiencing.";
}

/* ---------------- CRISIS RESPONSE ---------------- */
function getCrisisResponse() {
  return `I'm really sorry you're feeling this way. 💙

You are not alone.

🇮🇳 India – KIRAN Mental Health Helpline:
📞 1800-599-0019 (24/7)

If you're in immediate danger, please contact emergency services.

You deserve care and support.`;
}

/* ---------------- CHAT ROUTE ---------------- */
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Please type something 😊" });
  }

  const emotion = detectEmotion(userMessage);
  moodHistory.push(emotion);
  lastEmotion = emotion;

  if (emotion === "crisis") {
    return res.json({ reply: getCrisisResponse() });
  }

  const reply = generateReply(userMessage, emotion);
  res.json({ reply });
});

/* ---------------- MOOD HISTORY ROUTE ---------------- */
app.get("/mood-history", (req, res) => {
  res.json({ moods: moodHistory });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🧠 Kamaai Intelligent Mental Health Bot running on port " + PORT);
});