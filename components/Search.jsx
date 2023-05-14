import styles from "@/styles/Search.module.css";
export default function Search({
  searchText,
  setSearchText,
  setShowSearchResults,
  options,
  setOptions,
}) {
  function handleChange(e) {
    if (e.target.value) {
      setSearchText(e.target.value);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    setShowSearchResults(true);
  }

  return (
    <section className={styles.Search}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="search by title"
          onChangeCapture={handleChange}
        />
        <button onClick={handleClick}>Submit</button>
      </div>
    </section>
  );
}
