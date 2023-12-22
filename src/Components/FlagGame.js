import React, { useState, useEffect } from 'react';
import './flagGame.css';

const FlagGame = () => {
  const [randomCountry, setRandomCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [clickedOptions, setClickedOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const fetchRandomCountry = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();

      const randomIndex = Math.floor(Math.random() * countries.length);
      const randomCountryData = countries[randomIndex];

      const name = randomCountryData.name.common;
      const flag = randomCountryData.flags.png;

      const randomNames = generateRandomNames(countries, randomIndex);

      setRandomCountry({
        name,
        flag,
      });

      setOptions(shuffleArray([...randomNames, name]));
      setFeedback(null);
    } catch (error) {
      console.error('Error fetching random country:', error);
    }
  };

  useEffect(() => {
    fetchRandomCountry();
  }, []);

  const generateRandomNames = (countries, correctIndex) => {
    const randomNames = [];
  
    for (let i = 0; i < 3; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * countries.length);
      } while (
        randomIndex === correctIndex ||
        randomNames.includes(countries[randomIndex].name.common)
      );
  
      randomNames.push(countries[randomIndex].name.common);
    }
  
    return randomNames;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOptionClick = (selectedName) => {
    const isCorrect = selectedName === randomCountry.name;

    setFeedback(isCorrect ? 'Correct!' : 'Incorrect!');

    setCorrectOptions((prevCorrectOptions) => {
      const newCorrectOptions = [...prevCorrectOptions];
      if (isCorrect) {
        newCorrectOptions.push(selectedName);
        setCorrect((prevCorrect) => prevCorrect + 0.5);
      }
      else {
        setIncorrect((prevIncorrect) => prevIncorrect + 0.5);
      }
      return newCorrectOptions;
    });

    setClickedOptions((prevClickedOptions) => [...prevClickedOptions, selectedName]);

    setTimeout(() => {
      fetchRandomCountry();
    }, 1000);
  };
  
  if (!randomCountry) {
    return <div>Loading...</div>;
  }

  return (
    <div className='game'>
      <h1 className='title'>GUESS THE COUNTRY!</h1>
      <div className="rectangle">
        <p>Correct gueses: {correct}</p>
        <p>Incorrect gueses: {incorrect}</p>
        <img src={randomCountry.flag} alt={`Flag of ${randomCountry.name}`} />
        <div>
          {options.map((option, index) => (
            <button
              key={index}
              className={`button-style ${
                correctOptions.includes(option) ? 'correct-button' : ''
              } ${clickedOptions.includes(option) && !correctOptions.includes(option) ? 'incorrect-button' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  );
};

export default FlagGame;
