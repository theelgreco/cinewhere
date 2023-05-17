import styles from "@/styles/Type.module.css";
import { useState, useEffect } from "react";

export default function Type({ options, setOptions }) {
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(null);

  function handleSelect(e) {
    if (e.target.id === "sort_by") setSort(e.target.value);
    if (e.target.id === "order") setOrder(e.target.value);
  }

  useEffect(() => {
    if (sort && order) {
      setOptions({ sort_by: `${sort}.${order}` });
    }
  }, [sort, order]);

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <section className={styles.Type}>
      <div className={styles.select}>
        <select id="sort_by" onChange={handleSelect}>
          <option value="" disabled defaultValue="">
            Sort by
          </option>
          <option value="popularity">Popularity</option>
          <option value="revenue">Revenue</option>
          <option value="primary_release_date">Release Date</option>
          <option value="vote_average">Vote Average</option>
          <option value="vote_count">Vote Count</option>
        </select>
        <select id="order" onChange={handleSelect}>
          <option value="" disabled defaultValue="">
            Order
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {/* <div className={styles.flex_col}>
        <div className={styles.flex_row}>
          <div className={styles.tv}>TV</div>
          <div className={styles.movies}>MOVIES</div>
        </div>
        <div className={styles.both}>BOTH</div>
      </div> */}
    </section>
  );
}
