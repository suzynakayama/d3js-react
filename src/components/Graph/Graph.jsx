import React from 'react';
import './Graph.css'
import AreaChart from '../AreaChart/AreaChart';
import GraphTitle from '../GraphTitle/GraphTitle';

const Graph = ({ graphData, name }) => {
  return (
    <div className="graph">
      <GraphTitle name={ name }/>
      <AreaChart graphData={ graphData }/>
    </div>
  );
};

export default Graph
