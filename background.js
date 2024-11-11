chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "speak") {
    chrome.tts.speak(message.text, {
      rate: 1,
      pitch: 1,
      volume: 1,
      lang: "tr-TR",
    });
  }
});
