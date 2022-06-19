import React, { useEffect, useState } from "react";
import Menu from "../../commponents/Menu";
import MovieList from "../../commponents/MovieList";
import SearchBar from "../../commponents/SearchBar";
import { apiKey } from "../../config";

function Home(props) {
  const [categories, setCategories] = useState([]);
  const [categoriesAsObj, setCategoriesAsObj] = useState({});
  const [order, setOrder] = useState("primary_release_date.desc");
  const [movieName, setMovieName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  // Almacena el contenido del text input de la search bar para pasarlo como parametro a la movieList y que esta se encargue de realizar la busqueda
  const onSearch = () => {
    setSelectedCategory();
    setSearch(movieName);
  };

  // Petición de las categorías a la API
  const fetchCategories = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        apiKey +
        "&language=en-US"
    )
      .then((res) => res.json())
      .then((json) => {
        // Se almacenan las categorías como array para mostrarlas en el menu
        setCategories(json.genres);

        // Se almacenan las categorías como un objeto en el que cada clave es el id de la categoría y el valor es el nombre de la misma para acceder a ellas mas fácilmente
        const categoriesObj = {};
        json.genres.forEach((genre) => (categoriesObj[genre.id] = genre.name));
        setCategoriesAsObj(categoriesObj);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Menu
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCatedory={selectedCategory}
        setSearch={setSearch}
        setMovieName={setMovieName}
      />
      <SearchBar
        setOrder={setOrder}
        movieName={movieName}
        setMovieName={setMovieName}
        onSearch={onSearch}
        search={search}
      />
      <MovieList
        categoriesAsObj={categoriesAsObj}
        selectedCategory={selectedCategory}
        order={order}
        search={search}
      />
    </>
  );
}

export default Home;
