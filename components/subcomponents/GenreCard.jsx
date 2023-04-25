import styles from "@/styles/GenreCard.module.css";
import clsx from "clsx";
import { useState } from "react";

export default function GenreCard({ genre, mouseMoving, isMobile }) {
  const [isSelected, setIsSelected] = useState(false);
  const [noneSelectedGenre, setNoneSelectedGenre] = useState(false);

  function handleClick(e) {
    if (mouseMoving) {
      return;
    } else if (!isSelected) {
      setIsSelected(true);
      setNoneSelectedGenre(false);
    } else {
      setIsSelected(false);
    }
  }

  return (
    <div
      className={clsx({
        [styles.unselected]:
          (!isSelected && !isMobile) || (!isSelected && isMobile),
        [styles.selected]: isSelected,
        // [styles.mobile]: !isSelected && isMobile,
        // [styles.mobileSelected]: isSelected && isMobile,
      })}
      onClick={handleClick}>
      <p> {genre}</p>
    </div>
  );
}
