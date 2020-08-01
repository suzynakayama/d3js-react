import React, { useState } from 'react';
import './AllCards.css'
import Card from '../Card/Card';

const AllCards = ({ data, setGraph }) => {
  const [selected, setSelected] = useState('Quality Score');

  return (
    <div className='all-cards'>
      {data.map((card) => (
        <Card
          key={ card.name }
          card={ card }
          selected={ selected }
          setSelected={ setSelected }
          setGraph={ setGraph }/>
      ))}
    </div>
  );
};

export default AllCards;
