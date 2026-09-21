function FilterPanel({ filters = [], values = {}, onChange }) {
  return (
    <aside className="filter-panel" aria-label="Filter destinations">
      {filters.map((filter) => (
        <label className="filter-panel__field" key={filter.name}>
          <span>{filter.label}</span>
          <select
            value={values[filter.name] ?? ""}
            onChange={(event) => onChange?.(filter.name, event.target.value)}
          >
            <option value="">All</option>
            {filter.options.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </label>
      ))}
    </aside>
  );
}

export default FilterPanel;
