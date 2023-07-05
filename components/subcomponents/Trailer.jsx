import styles from "@/styles/Trailer.module.css";

export default function Trailer({ trailerPlaying, trailer, autoplay }) {
  if (trailerPlaying && trailer) {
    return (
      <>
        <iframe
          className={styles.video}
          src={trailer}
          title="YouTube video player"
          frameBorder={0}
          allow={`accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; ${autoplay}`}></iframe>
      </>
    );
  }
}
