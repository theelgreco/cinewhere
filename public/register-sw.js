console.log(navigator);

navigator.serviceWorker
  .register("install-sw.js", { scope: "./" })
  .then((reg) => {
    console.log("Service worker  registered");
  });
