import axios from "axios";
import { useState } from "react";
import "../css/CreatePoll.css"

function CreatePoll(){

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);

    const handlePollInputChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
      };

      const handleCreatePollSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:3001/poll/create', {
            question,
            options,
          });
          console.log('Poll created successfully', response.data);
        } catch (error) {
          console.error('Error creating poll:', error);
        }
      };
    return (

        <form>
            
          <div className="mb-3">
            <label htmlFor="title" className="label_style">Title:</label>
            <input type="text" placeholder="Type your question here" id="title" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </div>
           <label className="label_style">Answer Options:</label>
          {options.map((option, index) => (
            <div className="mb-3" key={index}>
              <input type="text" placeholder={`Option ${index + 1}`}  className="" id={`option${index + 1}`} value={option} onChange={(e) => handlePollInputChange(index, e.target.value)} />
            </div>
          ))}
          <div className="div-btn">
            <button className='button_style' type="button"  onClick={handleCreatePollSubmit}>
              Create Poll
            </button>
          </div>
        </form>
    )
}

export default CreatePoll;