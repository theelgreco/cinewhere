console.log(navigator);
if (navigator.serviceWorker.controller) {
  console.log("Active service worker found");
} else {
  navigator.serviceWorker
    .register("install-sw.js", { scope: "./" })
    .then((reg) => {
      console.log("Service worker  registered");
    });
}
