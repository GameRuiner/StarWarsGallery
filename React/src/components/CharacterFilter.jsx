import React, { useCallback } from "react";

export const CharacterFilter = ({ characterDict, onFilterSelection }) => {
  const handleFilterChange = useCallback(
    (selectedFilter) => {
      onFilterSelection(selectedFilter);
    },
    [onFilterSelection]
  );
  return (
    <div className="filter-list">
      {Object.entries(characterDict).map((element) => (
        <div
          className="filter-list-item clickable-element"
          key={element[0]}
          onClick={() => handleFilterChange(element[0])}
        >
          {element[0]}
        </div>
      ))}
      <div
        className="filter-list-item clickable-element"
        key="All"
        onClick={() => handleFilterChange(null)}
      >
        All
      </div>
    </div>
  );
};
