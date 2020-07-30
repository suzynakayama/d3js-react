import React, { useState, useEffect } from 'react';
import './Filters.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Filters = ({setFilter}) => {
  const [chosen, setChosen] = useState("all");

  const handleChange = evt => {
    if (evt.target.value === 'all') setChosen('all');
    if (evt.target.value === 'closed') setChosen("closed");
  };

  useEffect(() => {
    setFilter(chosen)
  }, [chosen, setFilter])

  return (
    <div className="filters">
      <h3 className="filters-title">Filters</h3>
      <div className="filters-container">
        <label className="label-container">
          <input
            type="radio"
            value="all"
            onChange={ handleChange }
            checked={ chosen === "all" }
          />
          <span className="square"></span>
          All CQA Results
          <FontAwesomeIcon icon={faInfoCircle} />
        </label>
        <label className="label-container">
          <input
            type="radio"
            value="closed"
            onChange={handleChange}
            checked={chosen === "closed"}
          />
          <span className="square"></span>
          CQAs with Closed Loop
          <FontAwesomeIcon icon={faInfoCircle} />
        </label>
      </div>
    </div>
  );
}

export default Filters
