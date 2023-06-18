import styles from "@/styles/SearchSelect.module.css";

export default function SearchSelect({
  regions,
  languages,
  options,
  setOptions,
  setOptionsClicked,
}) {
  function handleSelect(e) {
    console.log({ [e.target.id]: e.target.value });
    setOptions({
      ...options,
      [e.target.id]: e.target.value,
    });
    setOptionsClicked(true);
  }

  if (languages && regions) {
    return (
      <div className={styles.selectFlex}>
        <select
          id="watch_region"
          className={styles.regionSelect}
          onChange={handleSelect}
          value={options.watch_region}>
          {regions.map((region) => {
            return (
              <option key={region.iso_3166_1} value={region.iso_3166_1}>
                {region.english_name}
              </option>
            );
          })}
        </select>
        <select
          id="with_original_language"
          className={styles.languageSelect}
          onChange={handleSelect}
          value={options.with_original_language}>
          {languages ? (
            languages.map((lang, index) => {
              return (
                <option key={lang.iso_639_1} value={lang.iso_639_1}>
                  {index === 0
                    ? `${lang.name}`
                    : `(${lang.iso_639_1.toUpperCase()}) ${lang.name}`}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </select>
      </div>
    );
  }
}
