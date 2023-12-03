import '../css/HomePage.css'
import testtoasa from '../images/testoasa 1.png'
import PollCard from './PollCard'
import axios from 'axios'
import {useState, useEffect} from 'react'
export default function HomePage(){
    const [pollObj, setPollObj] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
          try {
            const response = await axios.get('http://localhost:3001/poll/allPolls');
            setPollObj(response.data);
          } catch (error) {
            console.error('Error fetching poll data:', error);
          }
        };
    
        fetchPolls();
      }, []);

      const handleVote = (pollId, optionIndex) => {
        console.log(`Voted for option ${optionIndex} in poll ${pollId}`);
      };
    
      const handleDelete = (pollId) => {
        console.log(`Deleted poll ${pollId}`);
      };
    return (
        <div className="home-page">
            <div className="container">
                <div className="text">
                    <p>
                    Opiniile sunt mai importante ca niciodată. Platformele de sondaje permit organizatorilor să culeagă feedback direct de la audiența lor și să înțeleagă mai bine nevoile și dorințele acesteia.
                    </p>
                </div>
                <div className="logo_testoasa">
                    <img src={testtoasa}></img>
                </div>
            </div>
            <div className="container-polls">
                {pollObj.map((poll)=>(
                     <PollCard
                     key={poll.id}
                     {...poll}
                     onVote={(optionIndex) => handleVote(poll.id, optionIndex)}
                     onDelete={() => handleDelete(poll.id)}
                   />
                ))}
            </div>
        </div>
    )
}