import styles from "@/styles/SearchBar.module.css";
import { useState, useEffect, useRef } from "react";

export default function SearchBar({ handleChange, expandSearch, focus, refs }) {
  const search = useRef();
  const submit = useRef();
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (focus) search.current.focus();
    if (refs) {
      search.current.value = refs.search.current;
    }
  }, []);

  useEffect(() => {
    if (pressed) {
      submit.current
        .animate(
          {
            // backgroundColor: "rgb(51, 44, 99)",
            boxShadow: "inset 0px 0px 3px 2px rgba(0, 0, 0, 0.5)",
          },
          { duration: 200 }
        )
        .finished.then(() => {
          setPressed(false);
          search.current.blur();
          submit.current.blur();
        });
    }
  }, [pressed]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setPressed(true);
    }
  }

  function handleClick(e) {
    if (e.button === 0) {
      setPressed(true);
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search by title"
        onChange={handleChange}
        onClick={expandSearch}
        onFocus={expandSearch}
        onKeyDown={handleKeyDown}
        ref={search}
      />
      <button ref={submit} onMouseDown={handleClick} onKeyDown={handleKeyDown}>
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          className={styles.searchIcon}>
          <g>
            <path
              fill="#e8bcf1"
              d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
}
