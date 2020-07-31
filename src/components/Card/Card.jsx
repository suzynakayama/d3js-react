import React from 'react';
import './Card.css'
import Donut from '../Donut/Donut';

const Card = ({ card, selected, setSelected, setGraph }) => {
  const { name, sample, score, vsly } = card;

  const smallText = vsly ? vsly : "N/A";

  const handleClick = () => {
    setSelected(card.name);
    setGraph(card.name);
  };

  return (
    <div
      className={selected === card.name ? "card clicked" : "card"}
      onClick={handleClick}
    >
      <h1 className="card-title">{name}</h1>
      <Donut score={score} />
      <section className="card-middle">
        <p>{ score }%</p>
        <small>{ smallText }</small>
      </section>
      <p className="card-text">Sample: <span>{sample}</span></p>
    </div>
  );
};

export default Card
