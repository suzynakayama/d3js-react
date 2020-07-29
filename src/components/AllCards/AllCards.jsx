import React from 'react';
import './AllCards.css'
import Card from '../Card/Card';

const AllCards = ({data}) => {
  return (
    <div className="all-cards">
      { data.map(card => <Card key={ card.name } card={ card } />) }
    </div>
  )
};

export default AllCards
