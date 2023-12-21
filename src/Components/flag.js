import React from 'react';
import flags from '../flags';

const Flag = ({ flag, onSelect }) => {
  const { image, allOptions } = flag;

  return (
    <div>
      <img src={image} alt={flag.name} />
      <ul>
        {allOptions.map((option, index) => (
          <li key={index} onClick={() => onSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flag;