import SortBy from "./subcomponents/SortBy";
import ShowType from "./subcomponents/ShowType";
import { movieGenres, tvGenres } from "constants/genres";

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
}) {
  function handleClick(e) {
    let mediaObj = { movie: movieGenres, tv: tvGenres };

    set_media_type(e.target.id);

    setSelectedGenres([]);
    setGenreList(mediaObj[e.target.id]);

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
