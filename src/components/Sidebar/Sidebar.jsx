import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbtack,
  faEnvelopeOpenText,
  faRedo,
  faShapes,
  faSignal
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div>
        <FontAwesomeIcon icon={ faThumbtack } />
      </div>
      <div>
        <FontAwesomeIcon icon={ faSignal } />
      </div>
      <div>
        <FontAwesomeIcon icon={ faEnvelopeOpenText } />
      </div>
      <div>
        <FontAwesomeIcon icon={ faShapes } />
      </div>
      <div>
        <FontAwesomeIcon icon={ faRedo } />
      </div>
    </aside>
  );
};

export default Sidebar;
