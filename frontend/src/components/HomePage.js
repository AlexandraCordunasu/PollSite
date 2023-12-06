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
    
      const handleDelete = async (pollId) => {
        try {
          const response = await axios.post(`http://localhost:3001/poll/deletePoll/${pollId}`);
          console.log('Poll deleted successfully:', response.data);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
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
                     key={poll._id}
                     {...poll}
                     onVote={(optionIndex) => handleVote(poll._id, optionIndex)}
                     onDelete={() => handleDelete(poll._id)}
                   />
                ))}
            </div>
        </div>
    )
}