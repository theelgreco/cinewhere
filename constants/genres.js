export const movieGenres = [
  {
    id: 28,
    genre: "Action",
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
  {
    id: 10751,
    genre: "Family",
  },
  {
    id: 14,
    genre: "Fantasy",
  },
  {
    id: 36,
    genre: "History",
  },
  {
    id: 27,
    genre: "Horror",
  },
  {
    id: 10402,
    genre: "Music",
  },
  {
    id: 9648,
    genre: "Mystery",
  },
  {
    id: 10749,
    genre: "Romance",
  },
  {
    id: 878,
    genre: "Science Fiction",
  },
  {
    id: 10770,
    genre: "TV Movie",
  },
  {
    id: 53,
    genre: "Thriller",
  },
  {
    id: 10752,
    genre: "War",
  },
  {
    id: 37,
    genre: "Western",
  },
];

export const tvGenres = [
  {
    id: 10759,
    genre: "Action & Adventure",
  },
  {
    id: 16,
    genre: "Animation",
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
  {
    id: 10751,
    genre: "Family",
  },
  {
    id: 10762,
    genre: "Kids",
  },
  {
    id: 9648,
    genre: "Mystery",
  },
  {
    id: 10763,
    genre: "News",
  },
  {
    id: 10764,
    genre: "Reality",
  },
  {
    id: 10765,
    genre: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    genre: "Soap",
  },
  {
    id: 10767,
    genre: "Talk",
  },
  {
    id: 10768,
    genre: "War & Politics",
  },
  {
    id: 37,
    genre: "Western",
  },
];

export const movieIds = [
  12, 14, 16, 18, 27, 28, 35, 36, 37, 53, 80, 99, 878, 9648, 10402, 10749,
  10751, 10752, 10770,
];

export const tvIds = [
  16, 18, 35, 37, 80, 99, 9648, 10751, 10759, 10762, 10763, 10764, 10765, 10766,
  10767, 10768,
];

// [16, 37, 53]

// while its less than index increment index
// if index + 1 = value ==> keep
// if index + 1 > value ==> remove

export const genreIds = [
  28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
  53, 10752, 37, 10759, 10762, 10763, 10764, 10765, 10766, 10767, 10768,
];

export const genreLookupObject = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  10770: "TV Movie",
};
