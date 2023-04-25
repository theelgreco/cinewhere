import styles from "@/styles/Search.module.css";
export default function Search({
  searchText,
  setSearchText,
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
    if (searchText) {
      const newOptions = { ...options };
      newOptions.params.title = searchText;
      newOptions.url =
        "https://streaming-availability.p.rapidapi.com/v2/search/title";
      setOptions(newOptions);
    }
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
