import "./style.css";

const SearchBar = ({ setOrder, setMovieName, movieName, onSearch, search }) => {
  // Se almacena el valor del orden en el estado order
  const handleOnChangeOrder = (e) => {
    setOrder(e.target.value);
  };

  // Se van guardando los cambios en el input de busqueda "movieName"
  const handleOnChangeMovieName = (e) => {
    setMovieName(e.target.value);
  };

  // Se almacena la información del estado "movieName" en el estado "search", esto se hizo así para poder controlar el momento en el que se hace la búsqueda
  const onSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div id="searchBarContainer">
      {
        // Esta validación se utiliza con el fin de que si se realizo alguna búsqueda no aparezca el selector de orden ya que la api no permite controlar el orden en búsquedas por nombre.
        !search && (
          <div id="selectContainer">
            <label style={{ color: "white" }}>Sort by</label>
            <select onChange={handleOnChangeOrder}>
              <option value="release_date.desc">Most Recent</option>
              <option value="release_date.asc">Oldest</option>
            </select>
          </div>
        )
      }

      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          value={movieName}
          onChange={handleOnChangeMovieName}
          placeholder="Search Movie..."
        />
        <button onClick={onSearch}>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
