import { useEffect, useState } from "react";
import Button from "./Button";

function SearchBar({
  onSearch,
  placeholder = "Search destinations, states or experiences",
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function handleSubmit(event) {
    event.preventDefault();
    onSearch?.(value.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor="site-search">
        Search TravelBharat
      </label>
      <span className="search-bar__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        id="site-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}

export default SearchBar;