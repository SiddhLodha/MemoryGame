import React, { useState, useEffect } from 'react';
import Card from './Card';
import cardImages from './cardData';

const generateCards = (images) => {
  const cards = [...images, ...images].map((image, index) => ({
    id: index,
    image,
    flipped: false,
    matched: false,
  }));
  return cards.sort(() => Math.random() - 0.5);
};

function App() {
  const [cards, setCards] = useState(generateCards(cardImages));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.image === secondCard.image) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.image === firstCard.image
              ? { ...card, matched: true }
              : card
          )
        );
        setMatchedPairs(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      setGameOver(true);
    }
  }, [matchedPairs, cards.length]);

  const handleCardClick = id => {
    if (flippedCards.length === 2) return;
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id && !card.flipped
          ? { ...card, flipped: true }
          : card
      )
    );
    setFlippedCards(prev => [...prev, cards.find(card => card.id === id)]);
  };

  const resetGame = () => {
    setCards(generateCards(cardImages));
    setFlippedCards([]);
    setMatchedPairs(0);
    setTimer(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Memory Game</h1>
      <div className="mb-6">
        <div className="text-lg">Time: {timer}s</div>
        <div className="text-lg">Score: {matchedPairs}</div>
      </div>
      <button
        onClick={resetGame}
        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded mb-6 transition duration-300"
      >
        Reset
      </button>
      <div className="grid grid-cols-4 gap-4 justify-center">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {gameOver && <div className="text-2xl mt-6 animate-bounce">🎉 Game Over! 🎉</div>}
    </div>
  );
}

export default App;
