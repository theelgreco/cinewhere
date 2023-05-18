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
  clicked,
  setClicked,
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
    if (mouseMoving || clicked) {
      return;
    }

    setClicked(true);

    const genreListCopy = [...genreList];
    const findGenreIndex = genreListCopy.findIndex((el) => {
      return el.genre === genre;
    });
    const genreToReplace = genreListCopy[findGenreIndex];
    genreListCopy.splice(findGenreIndex, 1);

    if (!isSelected && !clicked) {
      setIsSelected(true);
      setSelectedGenres([...selectedGenres, { id: genreId, genre: genre }]);
      setGenreIdToSearch(genreId);

      genreListCopy.splice(selectedGenres.length, 0, genreToReplace);
      setGenreList(genreListCopy);
    } else if (isSelected && !clicked) {
      setIsSelected(false);
      const selectedGenresCopy = [...selectedGenres];
      const indexToRemove = selectedGenresCopy.findIndex((el) => {
        return el.genre === genre;
      });
      selectedGenresCopy.splice(indexToRemove, 1);
      setSelectedGenres(selectedGenresCopy);

      genreListCopy.splice(selectedGenres.length - 1, 0, genreToReplace);
      setGenreList(genreListCopy);
      setGenreIdToSearch(null);
    }

    setTimeout(() => {
      setClicked(false);
    }, 800);
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
