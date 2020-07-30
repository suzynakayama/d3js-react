import React from 'react';
import './Graph.css'
import AreaChart from '../AreaChart/AreaChart';

const Graph = ({ graphData, setGraph }) => {
  return (
    <div className="graph">
      <AreaChart graphData={ graphData }/>
    </div>
  );
};

export default Graph
