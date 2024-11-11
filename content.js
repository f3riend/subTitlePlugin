function enableSubtitles() {
  const subtitleButton = document.querySelector(".ytp-subtitles-button");
  if (
    subtitleButton &&
    !subtitleButton.classList.contains("ytp-button-active")
  ) {
    subtitleButton.click();
  }
}

function applyRedTextColorAndAddNumber() {
  const captionSegments = document.querySelectorAll(".ytp-caption-segment");
  captionSegments.forEach((segment) => {
    if (!segment.dataset.modified) {
      let text = segment.textContent;

      chrome.runtime.sendMessage({
        action: "speak",
        text: text,
      });

      segment.dataset.modified = "true";
    }
  });
}

function debounce(func, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

function observeSubtitles() {
  const captionContainer = document.querySelector(
    ".caption-window.ytp-caption-window-bottom"
  );
  if (captionContainer) {
    const debouncedApply = debounce(applyRedTextColorAndAddNumber, 200);

    const observer = new MutationObserver(() => {
      debouncedApply();
    });

    observer.observe(captionContainer, { childList: true, subtree: true });

    applyRedTextColorAndAddNumber();
  }
}

async function load() {
  await new Promise((r) => setTimeout(r, 1000));
  enableSubtitles();
  setTimeout(observeSubtitles, 1000);
}

window.addEventListener("load", load);
