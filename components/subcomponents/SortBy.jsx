import { useState, useEffect } from "react";
import styles from "@/styles/SortBy.module.css";

export default function SortBy({ options, setOptions }) {
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");

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
    <div className={styles.sort}>
      <select id="sort_by" onChange={handleSelect} value={sort}>
        <option value="" disabled defaultValue="">
          Sort by
        </option>
        <option value="popularity">Popularity</option>
        <option value="revenue">Revenue</option>
        <option value="primary_release_date">Release Date</option>
        <option value="vote_average">Vote Average</option>
        <option value="vote_count">Vote Count</option>
      </select>
      <select id="order" onChange={handleSelect} value={order}>
        <option value="" disabled defaultValue="">
          Order
        </option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
