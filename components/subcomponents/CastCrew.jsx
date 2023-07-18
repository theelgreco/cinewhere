import styles from "@/styles/CastCrew.module.css";
import { useEffect } from "react";

export default function CastCrew({ arr, page, setPage, title }) {
  useEffect(() => {
    console.log(page);
    console.log(arr);
  }, []);

  if (arr[page]) {
    return (
      <div className={styles.column + " " + styles.cast}>
        <h3>{title}</h3>
        <div className={styles.wrapper}>
          <div className={styles.flex}>
            {arr[page - 1] ? (
              <p
                className={styles.leftArrow}
                onClick={() => {
                  const prevPage = page - 1;
                  setPage(prevPage);
                }}>
                {"<"}
              </p>
            ) : (
              <></>
            )}
            {arr[page].length ? (
              arr[page].map((member) => {
                return (
                  <div
                    key={`${member.name}${member.character || member.job}`}
                    className={styles.member}>
                    {member.profile_path ? (
                      <div
                        className={styles.profile_pic}
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/w500${member.profile_path})`,
                        }}></div>
                    ) : (
                      <div className={styles.noImage}></div>
                    )}
                    <p className={styles.castText}>{member.name}</p>
                    <p className={styles.castText}>
                      {member.character || member.job}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>No Results</p>
            )}
            {arr[page + 1] ? (
              <p
                className={styles.rightArrow}
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                }}>
                {">"}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}
