import insta from '../images/mdi_instagram.png'
import fb from '../images/uil_facebook.png'
import tw from '../images/mdi_twitch.png'
import '../css/Footer.css'
export default function Footer(){
    return(
        <footer>
            <div className='footer-icons'>
                <a href="https://www.instagram.com/lsacbucuresti/">
                    <img src={insta}></img>
                </a>
                <a href="https://www.facebook.com/LsacBucuresti">
                    <img src={fb}></img>
                </a>
                <a href="https://www.twitch.tv/lsac_bucuresti">
                    <img src={tw}></img>
                </a>
            </div>
        </footer>
    );
}