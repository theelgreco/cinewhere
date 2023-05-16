import styles from "@/styles/SearchBar.module.css";
import { useEffect, useRef } from "react";

export default function SearchBar({
  handleChange,
  expandSearch,
  handleClick,
  focus,
}) {
  const search = useRef();

  useEffect(() => {
    if (focus) search.current.focus();
  }, []);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="search by title"
        onChangeCapture={handleChange}
        onClick={expandSearch}
        ref={search}
      />
      {/* <button onClick={handleClick}>Submit</button> */}
    </div>
  );
}
