exports.handler = async function (event) {
  const genre = event.queryStringParameters.genre;
  const apiKey = process.env.TMDB_API_KEY;

  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch TMDb data" }),
    };
  }
};
