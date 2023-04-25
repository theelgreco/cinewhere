import styles from "@/styles/Genres.module.css";
import GenreCard from "@/subcomponents/GenreCard";
import genres from "../constants/genres";

export default function Genres({
  handleMouseMove,
  handleMouseUp,
  mouseMoving,
  handleMouseDown,
  isMobile,
}) {
  function handleContext(e) {
    e.preventDefault();
  }

  function detectTrackPad(e) {
    let isTrackpad = false;
    if (e.wheelDeltaY) {
      if (e.wheelDeltaY === e.deltaY * -3) {
        isTrackpad = true;
      }
    } else if (e.deltaMode === 0) {
      isTrackpad = true;
    }
    return isTrackpad;
  }

  return (
    // <div className={styles.sideText}>
    //     <p>genres</p>
    //   </div>
    <section
      className={styles.Genres}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContext}>
      <div id="Genres" className={styles.genreFlex}>
        {genres.map((genre) => {
          return (
            <GenreCard
              key={genre.id}
              genre={genre.genre}
              mouseMoving={mouseMoving}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </section>
  );
}
