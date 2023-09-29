import { getFilmServicesTmdb } from "api";
import { useRouter } from "next/router";

export const placeItemsAtStart = (
  list,
  string,
  selectedItems,
  isSelected,
  originalOrder
) => {
  const listCopy = [...list];
  const indexOfItem = listCopy.findIndex((el) => {
    return el.genre === string;
  });
  const item = listCopy[indexOfItem];
  listCopy.splice(indexOfItem, 1);

  if (!isSelected) {
    listCopy.splice(selectedItems.length, 0, item);
  } else if (isSelected) {
    const originalIndex = originalOrder.findIndex((el) => {
      return el.genre === string;
    });
    originalIndex >= selectedItems.length
      ? listCopy.splice(originalIndex + selectedItems.length - 1, 0, item)
      : listCopy.splice(selectedItems.length - 1, 0, item);
  }

  return listCopy;
};

export const getTodaysDate = () => {
  const date = new Date().toISOString().split("T")[0];

  return date;
};

export const getOfficialTrailer = (res, baseUrl) => {
  let regex = /Official Trailer/i;
  let trail = res.videos.results.find((el) => regex.test(el.name));
  if (!trail) trail = res.videos.results.find((el) => el.type === "Trailer");
  if (!trail) trail = res.videos.results.find((el) => el.type === "Teaser");
  if (trail) {
    return trail.key;
  }

  return undefined;
};

export const makeArrayOfEmptyObjects = (num) => {
  let arr = [];
  arr.length = num * 4;
  arr.fill({});
  return arr;
};

export const getAllDescendantElements = (node, arr) => {
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    arr.push(child);
    getAllDescendantElements(child, arr);
  }
  return arr;
};

export const filterData = async (data, media, country) => {
  let copy = [...data];

  let filtered = await Promise.all(
    copy.map(async (el) => {
      const res = await getFilmServicesTmdb(el.id, media, country);
      if (res) return el;
    })
  );

  filtered = filtered.filter((el) => el !== undefined);

  return filtered;
};

export const updateRows = (filmArray, number, rowObj) => {
  if (!Array.isArray(filmArray)) return;

  let row = 0;
  filmArray.forEach((film, index) => {
    if (index % number === 0) {
      row++;
    }

    rowObj[film.id] = row;
  });
  return rowObj;
};

class TodaysDate {
  constructor() {
    this.date = new Date().toISOString().split("T")[0];
    this.year = this.date.split("-")[0];
    this.month = this.date.split("-")[1];
    this.day = this.date.split("-")[2];
  }
}

export const todaysDate = new TodaysDate();
