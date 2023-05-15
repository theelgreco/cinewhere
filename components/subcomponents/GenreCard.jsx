import styles from "@/styles/GenreCard.module.css";
import clsx from "clsx";
import genres from "constants/genres";
import { useState, useEffect } from "react";

export default function GenreCard({
  genreId,
  genre,
  mouseMoving,
  isMobile,
  selectedGenres,
  setSelectedGenres,
  setGenreIdToSearch,
  genreList,
  setGenreList,
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    selectedGenres.forEach((obj) => {
      if (obj.genre === genre) {
        setIsSelected(true);
      }
    });

    if (!selectedGenres.length) {
      setIsSelected(false);
      setGenreIdToSearch(null);
    }
  }, [selectedGenres]);

  function handleClick(e) {
    if (mouseMoving) {
      return;
    }

    const genreListCopy = [...genreList];
    const findGenreIndex = genreListCopy.findIndex((el) => {
      return el.genre === genre;
    });
    const genreToReplace = genreListCopy[findGenreIndex];
    genreListCopy.splice(findGenreIndex, 1);

    if (!isSelected) {
      setIsSelected(true);
      setSelectedGenres([...selectedGenres, { id: genreId, genre: genre }]);
      setGenreIdToSearch(genreId);

      genreListCopy.splice(selectedGenres.length, 0, genreToReplace);
      setGenreList(genreListCopy);
    } else {
      setIsSelected(false);
      const selectedGenresCopy = [...selectedGenres];
      const indexToRemove = selectedGenresCopy.findIndex((el) => {
        return el.genre === genre;
      });
      selectedGenresCopy.splice(indexToRemove, 1);
      setSelectedGenres(selectedGenresCopy);

      genreListCopy.splice(selectedGenres.length - 1, 0, genreToReplace);
      setGenreList(genreListCopy);
    }
  }

  return (
    <div
      id={genreId}
      className={clsx({
        [styles.unselected]: !isSelected,
        [styles.selected]: isSelected,
      })}
      onClick={handleClick}>
      <p>{genre}</p>
    </div>
  );
}
