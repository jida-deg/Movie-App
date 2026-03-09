import React, { useState, useContext, useEffect } from 'react'
import './homepage.css'
import photo2 from './images/photo2.jpg'
import photo3 from './images/photo3.jpg'
import photo4 from './images/photo4.jpg'
import photo5 from './images/photo5.jpg'
import photo6 from './images/photo6.jpg'
import photo7 from './images/photo7.jpg'
import photo9 from './images/photo9.jpg'
import photoA from './images/photoA.jpg'
import photoC from './images/photoC.jpg'
import photo8 from './images/photo8.jpg'
import photo10 from './images/photo10.jpg'
import photo11 from './images/photo11.jpg'
import photo12 from './images/photo12.jpg' 
import photo13 from './images/photo13.jpg'
import photo1A from './images/photo1A.jpg'
import photo1B from './images/photo1B.jpg'
import photo1C from './images/photo1C.jpg'
import photo1D from './images/photo1D.jpg'
import photo1E from './images/photo1E.jpg' 
import photo1F from './images/photo1F.jpg'
import photo2A from './images/photo2A.jpg'
import photo2B from './images/photo2B.jpg'
import photo2C from './images/photo2C.jpg'
import photo3A from './images/photo3A.jpg'
import photo3B from './images/photo3B.jpg'
import photo3C from './images/photo3C.jpg'
import photo15 from './images/photo15.jpg'
import photoz from './images/photoz.jpg'







import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../components/AuthProvider'

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/moviespage');
    }
  }, [isAuthenticated, navigate]);

  const faqs = [
  {
    question: "Where can I watch this movie?",
    answer:
      "You can watch this movie on supported streaming platforms listed on the movie page. Availability may vary by country."
  },
  {
    question: "Is this movie available in HD or 4K?",
    answer:
      "Yes. Most movies are available in HD, and selected titles support Full HD and 4K depending on the platform."
  },
  {
    question: "Is this movie suitable for kids?",
    answer:
      "Please check the age rating and genre section. Some movies may contain violence, language, or adult themes."
  },
  {
    question: "Can I download the movie to watch offline?",
    answer:
      "Offline downloads depend on the streaming service. If supported, you’ll see a Download option."
  },
  {
    question: "Are subtitles available?",
    answer:
      "Yes. Subtitles are available in multiple languages, depending on the movie and platform."
  },
 
  {
    question: "How can I report a problem with a movie?",
    answer:
      "You can report issues like broken links or wrong information through the Contact Us page."
  }
];


  const [openIndex,setOpenIndex]=useState(null);
  const ontoggle =(index)=>{
  setOpenIndex(openIndex===index ?null :index )

}





  return (
    <div>
   
         {/* this navigaton section */}
      <nav className='navbar'>
        <div className='navbarIn'>
     <p
  style={{
    color: '#ece1a1',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, color 0.3s ease'
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'scale(1.1)';
    e.currentTarget.style.color = '#fff';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.color = '#ece1a1';
  }}
>
  CineStream
</p>
          
         {/* <p><img src={photoz} alt="Decorative" width={85} height={65} style={{borderRadius:"18px", backgroundColor:" #042049;  "}}/></p> */}
        <div className='navbar2'>
            <ul className='navbarList'>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                {/* <li><Link to="/notification">Notification</Link></li> */}
                <li>
                   {isAuthenticated ? (
              <Link to="/moviespage">
                <button>Go to Movies</button>
              </Link>
            ) : (
              <>
                <Link to="/signin">
                  <button className='button1'>Login</button>
                </Link>
                </>)}

                </li>
            </ul>
        </div>
        </div>
      </nav>
      {/* hero section */}
      <section className='section1'>
        <div className='pageDiscription'>
           <div className='page'>
            <div>
             {/* <h1>Welcome to Movie Site</h1> */}
             <h3> This site has an extensive library of feature films, <br />
             Action, Romance, anime, and more. <br /> Watch as much as you want, anytime you want.</h3>

            </div>
           <div className='phase1'> 
           <h2>There’s even more to watch.</h2>
           {isAuthenticated ? (
              <Link to="/moviespage">
                <button className='button2'>Go to Movies</button>
              </Link>
            ) : (
              <>
                <Link to="/signin">
                  <button className='button2'>Get Started</button>
                
                </Link>
                </>)}
        </div>         
      </div>
  </div>
      
       
      </section>
      <section className='section2'>
        <div className='inSection2A'>
          <div className='section2Descibe'>
             <h2>More Access in More Places</h2>
              <p>No matter where you are or where you go, you can watching your favorite movies</p>
          </div>
          {/* call to action buttons */}
          <div className='section2ImagesA'>
               <img src={photo2} alt="Decorative" width={200} height={150} style={{borderTopLeftRadius:"8px"}}/>
               <img src={photo3} alt="Decorative" width={200} height={150} style={{borderTopRightRadius:"0px"}}/>
              <img src={photo15} alt="Decorative" width={200} height={150} style={{borderTopRightRadius:"8px"}}/>
              <img src={photo4} alt="Decorative" width={200} height={150} style={{borderTopRightRadius:"8px"}}/>
              <img src={photo11} alt="Decorative" width={200} height={150} style={{borderBottomLeftRadius:"8px"}}/>
              <img src={photo3B} alt="Decorative" width={200} height={150} style={{borderBottomRightRadius:"8px"}}/>
              <img src={photo3C} alt="Decorative" width={200} height={150} style={{borderBottomRightRadius:"8px"}}/>
              <img src={photo12} alt="Decorative" width={200} height={150} style={{borderBottomRightRadius:"8px"}}/>


            </div>    
        </div>

      </section>

      <section className='section2'>
        <div className='inSection2B'>
          <div>
            <h2>Movies Made Magical</h2>
          </div>
           <div className='section2Images'>
               <img src={photo6} alt="Decorative" width={220} height={185} style={{borderTopLeftRadius:"8px"}}/>
               <img src={photo7} alt="Decorative" width={220} height={185} style={{borderTopRightRadius:"8px"}}/>
               <img src={photoA} alt="Decorative" width={220} height={185} style={{borderTopRightRadius:"8px"}}/>
               <img src={photo8} alt="Decorative" width={220} height={185} style={{borderBottomLeftRadius:"8px"}}/>
               <img src={photo9} alt="Decorative" width={220} height={185} style={{borderBottomRightRadius:"8px"}}/>
                <img src={photo3A} alt="Decorative" width={220} height={185} style={{borderTopRightRadius:"8px"}}/>

               <img src={photo10} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
               <img src={photoC} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
               <img src={photo13} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
               <img src={photo1A} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
                <img src={photo1B} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
                <img src={photo1C} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
                <img src={photo1D} alt="Decorative" width={210} height={150} style={{borderBottomLeftRadius:"8px"}}/>
                <img src={photo1E} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
                <img src={photo1F} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
                 <img src={photo2B} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
                <img src={photo2C} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>
                <img src={photo2A} alt="Decorative" width={210} height={150} style={{borderBottomRightRadius:"8px"}}/>


            </div>  

        </div>
      </section>

      <section className='section4'>
        <div className=''>
          <div className='section4-header'>
             <h2>Frequently Asked Questions</h2>
          </div>
        <div className='insection4'>
  {faqs.map((faq, index) => (
    <div
      key={index}
      className={`sectio4-para ${openIndex === index ? "open" : ""}`}
      onClick={() => ontoggle(index)} // click anywhere on the FAQ item
    >
      <p>
        {faq.question}
        <button
          className='button4'
          onClick={(e) => {
            e.stopPropagation(); // prevent double toggle
            ontoggle(index);
          }}
        >
          ▼
        </button>
      </p>

      {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
    </div>
  ))}
</div>
           
       </div>
      </section>
      
 {/* footer sectio */}
     <footer className='footer'>
        <div className='footerIn'>
            <div>
                 <h3>About</h3>
                 <p>Discover trending and top-rated movies.</p>
            </div>
            <div>
                 <h3>Quick Links</h3>
                  <ul>
                     <li><a href="home">Home</a></li>
                     <li> <a href="signin">Movie</a></li>
                     <li> <a href="about">About Us</a></li>
                   </ul>
    
            </div>
            <div>
                 <h3>Contact</h3>
                  <p> <a href="google.com">Email: support@moviehub.com</a></p>
                  <p> <a href="https://t.me/@jida_de">Telegram: @jida_de</a></p>
                  <p>Phone: +251 985762491</p>
            </div>
            <div>
                 <h2>Follow Us</h2>
                 <p> <a  href="https://www.facebook.com">Facebook |</a>  <a href="https://www.twitter.com">Twitter</a> | <a href="https://www.instagram.com">Instagram</a></p>
            </div>
        </div>
     </footer>
       
    </div>
  )
}

export default HomePage
