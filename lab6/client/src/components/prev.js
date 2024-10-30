import React from 'react';
import Card from './card';

const Prev = () => {
  const cardsData = [
    {
      imgSrc: "https://media.timeout.com/images/105972578/750/562/image.jpg",
      title: "Bouquet 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgSrc: "https://media.timeout.com/images/105972578/750/562/image.jpg",
      title: "Bouquet 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgSrc: "https://media.timeout.com/images/105972578/750/562/image.jpg",
      title: "Bouquet 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <div className="prev">
      <div className="prev_cards">
        {cardsData.map((card, index) => (
          <Card key={index} imgSrc={card.imgSrc} title={card.title} description={card.description} />
        ))}
      </div>
      <button className="prev_btn" id="prev_btn"><a href="">View more</a></button>
    </div>
  );
};

export default Prev;
