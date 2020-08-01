import React from 'react';
import './Graph.css'
import AreaChart from '../AreaChart/AreaChart';
import GraphTitle from '../GraphTitle/GraphTitle';

const Graph = ({ graphData, name, filter }) => {
  return filter === "all" ? (
    <div className="graph">
      <GraphTitle name={name} />
      <AreaChart graphData={graphData} />
    </div>
  ) : (
    <div className="graph-nothing">
      <h1 className="nothing">No data</h1>
    </div>
  );
};

export default Graph
