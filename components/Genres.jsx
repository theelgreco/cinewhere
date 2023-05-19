import styles from "@/styles/Genres.module.css";
import GenreCard from "@/subcomponents/GenreCard";
import { useEffect, useState } from "react";

export default function Genres({
  handleMouseMove,
  handleMouseUp,
  mouseMoving,
  handleMouseDown,
  isMobile,
  setGenreIdToSearch,
  selectedGenres,
  setSelectedGenres,
  genreList,
  setGenreList,
}) {
  const [clicked, setClicked] = useState(false);

  function handleContext(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const otherGenres = genreList.slice(selectedGenres.length);
    if (otherGenres.length) {
      const sorted = otherGenres.sort((a, b) => {
        return a.genre.localeCompare(b.genre);
      });
      setGenreList([...selectedGenres, ...sorted]);
    }
  }, [selectedGenres]);

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
        {genreList.map((genre) => {
          return (
            <GenreCard
              key={genre.id}
              genreId={genre.id}
              genre={genre.genre}
              mouseMoving={mouseMoving}
              isMobile={isMobile}
              setGenreIdToSearch={setGenreIdToSearch}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              genreList={genreList}
              setGenreList={setGenreList}
              clicked={clicked}
              setClicked={setClicked}
            />
          );
        })}
      </div>
    </section>
  );
}
