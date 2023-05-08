import styles from "@/styles/GenreCard.module.css";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function GenreCard({
  genreId,
  genre,
  mouseMoving,
  isMobile,
  selectedGenres,
  setSelectedGenres,
  setGenreIdToSearch,
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

    if (!isSelected) {
      setIsSelected(true);
      setSelectedGenres([...selectedGenres, { id: genreId, genre: genre }]);

      setGenreIdToSearch(genreId);
    } else {
      setIsSelected(false);
      const selectedGenresCopy = [...selectedGenres];
      const indexToRemove = selectedGenresCopy.findIndex((el) => {
        return el.genre === genre;
      });
      selectedGenresCopy.splice(indexToRemove, 1);
      setSelectedGenres(selectedGenresCopy);
    }
  }

  return (
    <div
      id={genreId}
      className={clsx({
        [styles.unselected]: !isSelected,
        [styles.selected]: isSelected,
        // [styles.mobile]: !isSelected && isMobile,
        // [styles.mobileSelected]: isSelected && isMobile,
      })}
      onClick={handleClick}>
      <p>{genre}</p>
    </div>
  );
}
