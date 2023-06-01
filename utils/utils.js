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
  console.log(date);
  return date;
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
