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
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selectedGenres.includes(genre)) {
      setIsSelected(true);
    }
  }, []);

  function handleClick(e) {
    if (!e.target.id) {
      console.log(e.target.parentElement.id, "<--- parent");
    } else {
      console.log(e.target.id);
    }

    if (mouseMoving) {
      return;
    }

    if (!isSelected) {
      setIsSelected(true);
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setIsSelected(false);
      const selectedGenresCopy = [...selectedGenres];
      selectedGenresCopy.splice(selectedGenresCopy.indexOf(genre), 1);
      setSelectedGenres(selectedGenresCopy);
    }
  }

  return (
    <div
      id={genreId}
      className={clsx({
        [styles.unselected]:
          (!isSelected && !isMobile) || (!isSelected && isMobile),
        [styles.selected]: isSelected,
        // [styles.mobile]: !isSelected && isMobile,
        // [styles.mobileSelected]: isSelected && isMobile,
      })}
      onClick={handleClick}>
      <p>{genre}</p>
    </div>
  );
}
