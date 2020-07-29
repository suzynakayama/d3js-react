import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import Filters from '../Filters/Filters';

import data from '../../data/data.json';
import Card from '../Card/Card';
import AllCards from '../AllCards/AllCards';

const Dashboard = () => {
  const [filter, setFilter] = useState('all')
  const { areaData, gaugeData } = data;
  console.log(areaData);
  console.log(gaugeData);
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Performance Management</h1>
      <div className="dashboard-grey">
        <section>
          <span>
            <FontAwesomeIcon icon={faGlobe} />
            <h1 className="dashboard-subtitle">Diagnostic Tool</h1>
          </span>
          <FontAwesomeIcon icon={faThumbtack} />
        </section>
      </div>
      <section className="dashboard-main">
        <Filters setFilter={setFilter} />
        graph
        <AllCards data={gaugeData} />
      </section>
    </div>
  );
}

export default Dashboard
