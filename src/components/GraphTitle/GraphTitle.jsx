import React from 'react';
import './GraphTitle.css';

const GraphTitle = ({name}) => {

  return (
    <div className="graph-options">
      <span className="graph-title">{ name } Trend</span>
      <span>
        <button className="graph-btn light">Day</button>
        <button className="graph-btn">Week</button>
        <button className="graph-btn dark">Month</button>
        <button className="graph-btn">Quarter</button>
        <button className="graph-btn">Half</button>
        <button className="graph-btn">Year</button>
      </span>
    </div>
  )
}

export default GraphTitle
