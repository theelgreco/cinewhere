const { placeItemsAtStart } = require("../utils/utils");

describe("test suite for genreArrange", () => {
  test("given an item, returns the list with item at the start", () => {
    const input = [
      {
        id: 28,
        genre: "Action",
      },
      {
        id: 7,
        genre: "Adult",
      },
      {
        id: 12,
        genre: "Adventure",
      },
      {
        id: 16,
        genre: "Animation",
      },
      {
        id: 1,
        genre: "Biography",
      },
      {
        id: 35,
        genre: "Comedy",
      },
      {
        id: 80,
        genre: "Crime",
      },
      {
        id: 99,
        genre: "Documentary",
      },
      {
        id: 18,
        genre: "Drama",
      },
    ];
    const string = "Documentary";
    const selectedItems = [];
    const isSelected = false;
    const actual = placeItemsAtStart(input, string, selectedItems, isSelected);
    expect(actual[0]).toEqual({
      id: 99,
      genre: "Documentary",
    });
  });
  test("places item second when one is already selected", () => {
    const input = [
      { id: 99, genre: "Documentary" },
      { id: 28, genre: "Action" },
      { id: 7, genre: "Adult" },
      { id: 12, genre: "Adventure" },
      { id: 16, genre: "Animation" },
      { id: 1, genre: "Biography" },
      { id: 35, genre: "Comedy" },
      { id: 80, genre: "Crime" },
      { id: 18, genre: "Drama" },
    ];
    const selectedItems = ["Documentary"];
    const string = "Comedy";
    const isSelected = false;
    const actual = placeItemsAtStart(input, string, selectedItems, isSelected);
    expect(actual[1]).toEqual({ id: 35, genre: "Comedy" });
  });
  test("places item back at correct position when isSelected is true and original index > length of selected items", () => {
    const originalOrder = [
      {
        id: 28,
        genre: "Action",
      },
      {
        id: 7,
        genre: "Adult",
      },
      {
        id: 12,
        genre: "Adventure",
      },
      {
        id: 16,
        genre: "Animation",
      },
      {
        id: 1,
        genre: "Biography",
      },
      {
        id: 35,
        genre: "Comedy",
      },
      {
        id: 80,
        genre: "Crime",
      },
      {
        id: 99,
        genre: "Documentary",
      },
      {
        id: 18,
        genre: "Drama",
      },
    ];
    const input = [
      { id: 99, genre: "Documentary" },
      { id: 35, genre: "Comedy" },
      { id: 28, genre: "Action" },
      { id: 7, genre: "Adult" },
      { id: 12, genre: "Adventure" },
      { id: 16, genre: "Animation" },
      { id: 1, genre: "Biography" },
      { id: 80, genre: "Crime" },
      { id: 18, genre: "Drama" },
    ];
    const selectedItems = ["Documentary"];
    const string = "Comedy";
    const isSelected = true;
    const actual = placeItemsAtStart(
      input,
      string,
      selectedItems,
      isSelected,
      originalOrder
    );
    expect(actual[6]).toEqual({
      id: 35,
      genre: "Comedy",
    });
  });
  test("places item back at correct position when isSelected is true and original index === length of selected items", () => {
    const originalOrder = [
      {
        id: 28,
        genre: "Action",
      },
      {
        id: 7,
        genre: "Adult",
      },
      {
        id: 12,
        genre: "Adventure",
      },
      {
        id: 16,
        genre: "Animation",
      },
      {
        id: 1,
        genre: "Biography",
      },
      {
        id: 35,
        genre: "Comedy",
      },
      {
        id: 80,
        genre: "Crime",
      },
      {
        id: 99,
        genre: "Documentary",
      },
      {
        id: 18,
        genre: "Drama",
      },
    ];
    const input = [
      { id: 12, genre: "Adventure" },
      { id: 1, genre: "Biography" },
      { id: 80, genre: "Crime" },
      { id: 28, genre: "Action" },
      { id: 7, genre: "Adult" },
      { id: 16, genre: "Animation" },
      { id: 35, genre: "Comedy" },
      { id: 99, genre: "Documentary" },
      { id: 18, genre: "Drama" },
    ];
    const selectedItems = ["Biography", "Crime"];
    const string = "Adventure";
    const isSelected = true;
    const actual = placeItemsAtStart(
      input,
      string,
      selectedItems,
      isSelected,
      originalOrder
    );

    expect(actual[4]).toEqual({ id: 12, genre: "Adventure" });
  });
});
