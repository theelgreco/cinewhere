import styles from "@/styles/Search.module.css";
export default function Search({
  searchText,
  setSearchText,
  setShowSearchResults,
}) {
  function handleChange(e) {
    if (e.target.value) {
      setSearchText(e.target.value);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    setShowSearchResults({ show: true, text: searchText });
    e.target.previousSibling.value = "";
    setSearchText("");
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
