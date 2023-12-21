// Game.js
import React, { useState } from 'react';
import flags from '../flags';
import Flag from './flag';

const Game = () => {
  const [score, setScore] = useState(0);
  const [currentFlag, setCurrentFlag] = useState(getRandomFlag());
  const [selectedContinent, setSelectedContinent] = useState(null);

  function getRandomFlag() {
    const filteredFlags = selectedContinent
      ? flags.filter((flag) => flag.continent === selectedContinent)
      : flags;
    const randomFlag = filteredFlags[Math.floor(Math.random() * filteredFlags.length)];
    return {
      ...randomFlag,
      allOptions: randomFlag.allOptions.sort(() => Math.random() - 0.5),
    };
  }

  function handleOptionSelect(selectedOption) {
    if (selectedOption === currentFlag.correctOption) {
      setScore(score + 1);
    }

    setCurrentFlag(getRandomFlag());
  }

  function handleContinentSelect(continent) {
    setSelectedContinent(continent);
    setCurrentFlag(getRandomFlag());
  }

  return (
    <div>
      <h1>Flag Game</h1>
      <p>Score: {score}</p>
      <div>
        <label>Select Continent:</label>
        <select onChange={(e) => handleContinentSelect(e.target.value)}>
          <option value="">All</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          {/* Add more continent options */}
        </select>
      </div>
      <Flag flag={currentFlag} onSelect={handleOptionSelect} />
    </div>
  );
};

export default Game;
