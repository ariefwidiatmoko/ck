import React from "react";

export const Searchbar = ({ id, placeholder, item }) => {
  return (
    <div className="level-item" id={id}>
      <div className="field has-addons">
        <p className="control">
          <input
            className="input is-small is-rounded"
            type="text"
            placeholder={placeholder}
            aria-labelledby={id}
          />
        </p>
        <p className="control">
          <button
            aria-label="Search"
            className="button is-small is-link is-rounded is-outlined"
          >
            <i className="fas fa-search" />
          </button>
        </p>
      </div>
    </div>
  );
};
