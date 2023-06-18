/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    API_KEY:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDZjYTEzZGJlYmNiMmIxNGYxNTRjODE0ZTE1NmQ5OSIsInN1YiI6IjY0NWQ0NDQzMTU2Y2M3MDBmZmE5YTFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vMuMXOgxFYgh_viKM6qoUnOX1r9LHXVkb8C_wqedtvs",
  },
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
};
