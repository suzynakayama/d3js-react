import React, { useState } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faThumbtack } from '@fortawesome/free-solid-svg-icons';

import Filters from '../Filters/Filters';
import data from '../../data/data.json';
import AllCards from '../AllCards/AllCards';
import Graph from '../Graph/Graph';

const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  const [graph, setGraph] = useState('Quality Score');
  const { areaData, gaugeData } = data;
  const newGaugeData = filter === 'all' ? gaugeData : gaugeData.filter(data => data.score === 100);
  const graphData = areaData[graph];

  return (
    <div className='dashboard'>
      <h1 className='dashboard-title'>Performance Management</h1>
      <div className='dashboard-grey'>
        <section>
          <span>
            <FontAwesomeIcon icon={ faGlobe } />
            <h1 className='dashboard-subtitle'>Diagnostic Tool</h1>
          </span>
          <FontAwesomeIcon icon={ faThumbtack } />
        </section>
      </div>
      <section className='dashboard-main'>
        <Filters setFilter={ setFilter } />
        <AllCards data={ newGaugeData } setGraph={ setGraph } />
        <Graph graphData={ graphData } name={ graph } filter={ newGaugeData } />
      </section>
    </div>
  );
};

export default Dashboard;
