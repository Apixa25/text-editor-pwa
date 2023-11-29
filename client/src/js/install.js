const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("👍", "beforeinstallprompt", event);
  window.deferredPrompt = event;
  // show the button
  butInstall.classList.toggle("hidden", false);
});
butInstall.addEventListener("click", async () => {
  // When button is clicked, access the stored event.
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // Show prompt.
  promptEvent.prompt();
  // Reset the deferred prompt variable (it can only be used once).
  window.deferredPrompt = null;
  // Hide the button.
  butInstall.classList.toggle("hidden", true);
});
window.addEventListener("appinstalled", (event) => {
  // Clear prompt.
  window.deferredPrompt = null;
});
