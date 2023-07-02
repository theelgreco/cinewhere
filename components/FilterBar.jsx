import SortBy from "./subcomponents/SortBy";
import ShowType from "./subcomponents/ShowType";
import { movieGenres, tvGenres, movieIds, tvIds } from "constants/genres";

export default function FilterBar({
  set_media_type,
  setSelectedGenres,
  setGenreList,
  setOptionsClicked,
  media_type,
  options,
  setOptions,
  sort,
  setSort,
  order,
  setOrder,
  optionsClicked,
  selectedGenres,
}) {
  function handleClick(e) {
    let mediaObj = {
      movie: { data: movieGenres, ids: movieIds },
      tv: { data: tvGenres, ids: tvIds },
    };

    set_media_type(e.target.id);

    if (selectedGenres && selectedGenres.length) {
      let selectedGenresCopy = [];
      selectedGenres.forEach((genre) => {
        selectedGenresCopy.push({ ...genre });
      });
      const otherIds = mediaObj[e.target.id].ids;

      const filtered = selectedGenresCopy.filter((genre) => {
        return otherIds.indexOf(genre.id) > -1;
      });

      setSelectedGenres(filtered);
    }

    setOptionsClicked(true);
  }

  const filterBarStyle = {
    display: "flex",
    flexWrap: "nowrap",
    gap: "25px",
    alignItems: "center",
    marginLeft: "10px",
  };

  return (
    <div style={filterBarStyle}>
      <ShowType handleClick={handleClick} media_type={media_type} />
      <SortBy
        options={options}
        setOptions={setOptions}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        optionsClicked={optionsClicked}
        setOptionsClicked={setOptionsClicked}
      />
    </div>
  );
}
