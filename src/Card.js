import React from 'react';

function Card({ card, onClick }) {
  return (
    <div
      className={`w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 cursor-pointer border-2 border-gray-300 flex items-center justify-center rounded-lg shadow-lg transition-transform transform ${
        card.flipped ? 'bg-white scale-105' : 'bg-gray-300'
      }`}
      onClick={onClick}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={`w-full h-full transition-transform duration-500 ${
          card.flipped ? 'transform rotateY-0' : 'transform rotateY-180'
        }`}
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        <img
          src={card.flipped ? card.image : require('./images/back.png')}
          alt="Card"
          className="w-full h-full object-cover rounded-lg"
          style={{
            backfaceVisibility: 'hidden',
          }}
        />
      </div>
    </div>
  );
}

export default Card;
