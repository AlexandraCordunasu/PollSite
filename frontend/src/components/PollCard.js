import React, { useState } from 'react';
import '../css/PollCard.css'
const PollCard = ({ title, question, options, onDelete, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = () => {
    if (selectedOption !== null) {
      onVote(selectedOption);
    }
  };

  return (
    <div className="poll-card">
      <h3>{question}</h3>
      <p>Make a choice</p>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option-${index}`}
            name="poll-options"
            value={index}
            checked={selectedOption === index}
            onChange={() => setSelectedOption(index)}
          />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
      <div className='poll-card-footer'>
        <button className='button-style' onClick={onDelete}>Delete</button>
        {selectedOption !== null && (
        <button className='button-style' onClick={handleVote}>Vote</button>
        )}
      </div>
    </div>
  );
};

export default PollCard;
