import React from "react";
import "./style.css";

export default function Menu({
  categories = [],
  setSelectedCategory,
  selectedCatedory,
  setMovieName,
  setSearch,
}) {
  // Se almacena el id de la categoría seleccionada en el estado "selectecCategory" y se resetean los estados de búsqueda
  const handleOnClick = (movie) => {
    setMovieName("");
    setSearch("");
    setSelectedCategory(movie);
  };

  return (
    <div id="topMenuContainer">
      <button
        className={
          selectedCatedory === undefined
            ? "categoryName selectedCategory"
            : "categoryName"
        }
        key={"default"}
        // Se define selectedCategory como undefined cuando se selecciona la opción "all"
        onClick={handleOnClick}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          className={
            selectedCatedory === category.id
              ? "categoryName selectedCategory"
              : "categoryName"
          }
          key={category.id}
          // Se define selectedCategory como el id de la categoría seleccionada
          onClick={() => handleOnClick(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
