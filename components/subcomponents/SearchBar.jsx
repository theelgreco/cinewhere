import styles from "@/styles/SearchBar.module.css";
import { useEffect, useRef } from "react";

export default function SearchBar({
  handleChange,
  expandSearch,
  handleClick,
  focus,
  searchText,
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
        onChange={handleChange}
        onClick={expandSearch}
        ref={search}
        value={searchText}
      />
      {/* <button onClick={handleClick}>Submit</button> */}
    </div>
  );
}
