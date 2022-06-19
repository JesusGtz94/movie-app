import React, { useEffect, useState } from "react";
import { apiKey } from "../../config";

import "./style.css";

function MovieList({ categoriesAsObj = {}, selectedCategory, order, search }) {
  const [actualPage, setActualPage] = useState(1);
  const [visibleMovies, setVisibleMovies] = useState([]);

  // Esta función se encarga de traer las películas de la API de 20 en 20, si se le pasa el parámetro "resetResults" como true borrara todas las películas y traera de nuevo las primeras 20
  // Esta función también aplica los filtros "selectedCategory" , "order" y las búsquedas por nombre en la query cuando estos se le pasan al componente.
  const getMovies = (resetResults) => {
    const reset = resetResults === true;

    const category = selectedCategory ? "&with_genres=" + selectedCategory : "";
    const page = !reset ? actualPage : 1;
    const nextPage = !reset ? actualPage + 1 : 2;
    const query = search ? "&query=" + search : "";
    const queryType = !query ? "discover" : "search";

    const url =
      "https://api.themoviedb.org/3/" +
      queryType +
      "/movie?api_key=" +
      apiKey +
      query +
      "&language=en-US&sort_by=" +
      order +
      "&include_adult=false&include_video=false&page=" +
      page +
      category +
      "&with_watch_monetization_types=flatrate";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setVisibleMovies((oldState) =>
          !reset ? [...oldState, ...json.results] : json.results
        );
      });

    setActualPage(nextPage);
  };

  // Se hace la primera petición de las películas de la base de datos y se resetea cada que se selecciona una categoría o se cambia el orden.
  useEffect(() => {
    getMovies(true);
    // eslint-disable-next-line
  }, [selectedCategory, order, search]);

  return (
    <div id="movieListContainer">
      {visibleMovies.map((movie) => (
        <MovieCard
          movie={movie}
          key={movie.id}
          // Se pasa un array con los nombres de las categorias correspondientes a la película
          categories={movie.genre_ids.map((id) => {
            return categoriesAsObj[id];
          })}
        />
      ))}
      {visibleMovies.length > 0 && (
        <button id="loadMoreButton" onClick={getMovies}>
          Load More
        </button>
      )}
      {visibleMovies.length === 0 && <p id="noMoviesFound">No movies found</p>}
    </div>
  );
}

const MovieCard = ({ movie, categories }) => {
  return (
    <div className="movieCardContainer">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/original" + movie.poster_path
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
        }
        width={651 / 3}
        height={977 / 3}
        alt={movie.title}
      />
      <div className="movieDataContainer">
        <h3 className="whiteText">{movie.title}</h3>
        <p className="whiteText">{movie.release_date}</p>
        <p className="whiteText">{movie.overview}</p>
        <h4 className="whiteText">Categories: </h4>
        <p className="whiteText">
          {categories.length > 0 ? categories.join(", ") : "None"}
        </p>
      </div>
    </div>
  );
};

export default MovieList;
