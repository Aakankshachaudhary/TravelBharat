import { useId } from "react";

function FilterPanel({ filters = [], values = {}, onChange }) {
  const idPrefix = useId();

  return (
    <aside className="filter-panel" aria-label="Filter destinations">
      {filters.map((filter) => {
        const id = `${idPrefix}-${filter.name}`;
        return (
          <div className="filter-panel__field" key={filter.name}>
            <label htmlFor={id}>{filter.label}</label>
            <select
              id={id}
              value={values[filter.name] ?? ""}
              onChange={(event) => onChange?.(filter.name, event.target.value)}
            >
              <option value="">All</option>
              {filter.options.map((option) => {
                const optionValue = typeof option === "object" ? option.value : option;
                const optionLabel = typeof option === "object" ? option.label : option;
                return (
                  <option value={optionValue} key={optionValue}>
                    {optionLabel}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </aside>
  );
}

export default FilterPanel;
