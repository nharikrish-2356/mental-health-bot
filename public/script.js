const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");
const voiceBtn = document.getElementById("voice");

sendBtn.addEventListener("click", sendMessage);

// 🎤 VOICE RECOGNITION
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN"; // supports English (India)
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onresult = function (event) {
    const voiceText = event.results[0][0].transcript;
    messageInput.value = voiceText;
    sendMessage();
  };

  recognition.onerror = function (event) {
    alert("Voice recognition error: " + event.error);
  };
} else {
  alert("Voice recognition not supported in this browser.");
}

async function sendMessage() {
  const message = messageInput.value;
  if (!message) return;

  const token = localStorage.getItem("token");

  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  document.getElementById("chatbox").innerHTML +=
    `<p><b>You:</b> ${message}</p>`;
  document.getElementById("chatbox").innerHTML +=
    `<p><b>Kamaai:</b> ${data.reply}</p>`;

  messageInput.value = "";
}