const genres = {
  AI: 878,
  Food: 528,
  Drama: 18,
  Horror: 27,
  Comedy: 35,
};

const rowsContainer = document.getElementById("rows");
const heroVideo = document.getElementById("heroVideo");
const heroTitle = document.getElementById("heroTitle");
const heroOverview = document.getElementById("heroOverview");

async function fetchMovies(genreId) {
  const res = await fetch(`/.netlify/functions/tmdb?genre=${genreId}`);
  const data = await res.json();
  return data.results;
}

async function loadRows() {
  for (const [name, id] of Object.entries(genres)) {
    const movies = await fetchMovies(id);

    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<h2>${name}</h2><div class="row-posters"></div>`;

    const posters = row.querySelector(".row-posters");

    movies.forEach((movie) => {
      if (!movie.poster_path) return;

      const poster = document.createElement("div");
      poster.className = "poster";

      poster.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">
        <video muted loop src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"></video>
      `;

      posters.appendChild(poster);
    });

    rowsContainer.appendChild(row);
  }
}

async function loadHero() {
  const movies = await fetchMovies(18);
  const movie = movies[0];

  heroTitle.textContent = movie.title;
  heroOverview.textContent = movie.overview;

  heroVideo.src = "https://samplelib.com/lib/preview/mp4/sample-10s.mp4";
}

loadHero();
loadRows();

/* LOGIN MODAL */
const modal = document.getElementById("loginModal");
document.getElementById("loginBtn").onclick = () =>
  (modal.style.display = "flex");
document.querySelector(".close").onclick = () => (modal.style.display = "none");
