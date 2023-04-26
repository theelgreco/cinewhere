import "@/styles/globals.css";
import styles from "@/styles/App.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);

  if (router.asPath === "/") {
    return <div className={styles.preload}></div>;
  } else {
    return <Component {...pageProps} />;
  }
}
