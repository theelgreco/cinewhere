import styles from "@/styles/Genres.module.css";
import GenreCard from "@/subcomponents/GenreCard";
import { useEffect, useState } from "react";
import { movieGenres, tvGenres, genreIds } from "constants/genres";

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
  clicked,
  setClicked,
  media_type,
}) {
  function handleContext(e) {
    e.preventDefault();
  }

  let mediaObj = { movie: movieGenres, tv: tvGenres };

  // useEffect(() => {
  //   let mediaGenreIds = {};

  //   mediaObj[media_type].forEach((genre) => {
  //     mediaGenreIds[genre.id] = true;
  //   });

  //   let filtered = selectedGenres.filter((genre) => {
  //     if (mediaGenreIds[genre.id]) return genre;
  //   });

  //   // setGenreList(mediaObj[media_type]);
  //   setSelectedGenres(filtered);
  // }, [media_type]);

  useEffect(() => {
    // let mediaObj = { movie: movieGenres, tv: tvGenres };

    const otherGenres = genreList.slice(selectedGenres.length);
    if (otherGenres.length) {
      const sorted = otherGenres.sort((a, b) => {
        return a.genre.localeCompare(b.genre);
      });
      setGenreList([...selectedGenres, ...sorted]);
    }
  }, [selectedGenres]);

  return (
    <section className={styles.section}>
      <div
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
      </div>
      <div title="Reset genres" className={styles.reset}>
        <img
          onMouseDown={() => {
            if (selectedGenres.length) {
              setSelectedGenres([]);
              setGenreList([...mediaObj[media_type]]);
              setGenreIdToSearch({ id: null, add: false });
            }
          }}
          src="/svg/reset_icon.svg"
        />
      </div>
    </section>
  );
}
