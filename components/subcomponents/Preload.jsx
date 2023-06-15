import MovieCard from "./MovieCard";
import { makeArrayOfEmptyObjects } from "utils/utils";
import { useEffect, useState } from "react";

export default function Preload({ rowSize, parentComponent, genre }) {
  if (rowSize) {
    return makeArrayOfEmptyObjects(rowSize).map((obj, index) => {
      return (
        <MovieCard
          film={obj}
          key={`${index}${parentComponent}${rowSize}temp`}
        />
      );
    });
  } else {
    return makeArrayOfEmptyObjects(20).map((obj, index) => {
      return (
        <MovieCard
          film={obj}
          key={`${index}${parentComponent}${20}temp`}
          genre={genre}
        />
      );
    });
  }
}
