if (navigator.serviceWorker.controller) {
  console.log("Active service worker found");
  console.log(navigator.serviceWorker);
} else {
  navigator.serviceWorker
    .register("install-sw.js", { scope: "./" })
    .then((reg) => {
      console.log(reg);
      console.log("Service worker  registered");
    });
}
