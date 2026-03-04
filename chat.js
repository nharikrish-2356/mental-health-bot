export function resetMemory(memory) {
  memory.userName = null;
  memory.mood = null;
  memory.lastIntent = null;
  memory.topic = null;
}

export function getReply(message, memory) {
  message = message.toLowerCase();

  // Initialize memory if empty
  if (!memory.userName) memory.userName = null;
  if (!memory.mood) memory.mood = null;

  // -------- NAME DETECTION --------
  const nameMatch = message.match(/my name is (\w+)|i am (\w+)|call me (\w+)/i);
  if (nameMatch) {
    const name = nameMatch[1] || nameMatch[2] || nameMatch[3];
    memory.userName = name;
    return `Nice to meet you, ${name}! 😊`;
  }

  // -------- EMOTION DETECTION --------
  const emotionWords = {
    sad: ["sad", "depressed", "cry", "lonely", "hurt"],
    happy: ["happy", "excited", "great", "awesome"],
    angry: ["angry", "mad", "frustrated"],
    stressed: ["stress", "tired", "overwhelmed"]
  };

  let detectedEmotion = null;
  let highestScore = 0;

  for (let emotion in emotionWords) {
    let score = emotionWords[emotion].filter(word =>
      message.includes(word)
    ).length;

    if (score > highestScore) {
      highestScore = score;
      detectedEmotion = emotion;
    }
  }

  if (detectedEmotion) {
    memory.mood = detectedEmotion;
  }

  // -------- TOPIC DETECTION --------
  const topics = {
    study: ["exam", "study", "college", "school", "marks"],
    career: ["job", "career", "interview", "work"],
    love: ["love", "relationship", "breakup", "crush"],
    life: ["future", "purpose", "life meaning"]
  };

  for (let topic in topics) {
    if (topics[topic].some(word => message.includes(word))) {
      memory.topic = topic;
    }
  }

  // -------- RESPONSE LOGIC --------
  let reply = "";

  if (memory.mood === "sad") {
    reply = "I’m really sorry you're feeling this way 💙 Want to talk more about it?";
  } 
  else if (memory.mood === "happy") {
    reply = "That’s amazing 😄 Tell me what made your day better!";
  } 
  else if (memory.mood === "angry") {
    reply = "It’s okay to feel angry sometimes. What happened?";
  } 
  else if (memory.mood === "stressed") {
    reply = "You seem stressed 😔 Try taking a deep breath. What's causing it?";
  }

  // Topic specific enhancement
  if (memory.topic === "study") {
    reply += " 📚 Are exams coming soon?";
  }

  if (memory.topic === "career") {
    reply += " 💼 Are you preparing for interviews?";
  }

  if (memory.topic === "love") {
    reply += " ❤️ Relationships can be complicated. Want advice?";
  }

  if (memory.topic === "life") {
    reply += " 🌱 Finding purpose takes time. What are you searching for?";
  }

  // Greeting
  if (["hi", "hello", "hey"].some(word => message.includes(word))) {
    reply = "Hey there 👋 How are you feeling today?";
  }

  // Fallback
  if (!reply) {
    const fallbacks = [
      "Tell me more 🤔",
      "I’m listening 👂",
      "Can you explain that a little more?",
      "Interesting… go on."
    ];
    reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Personalization
  if (memory.userName) {
    reply = `${memory.userName}, ${reply}`;
  }

  return reply;
}