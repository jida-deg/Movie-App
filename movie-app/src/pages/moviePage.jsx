import '../moviepage.css'
import MovieGrid from '../components/MovieGrid'
import { useState, useEffect, useContext } from 'react'
import SearchBar from '../components/SearchBar'
import AuthContext from '../components/AuthProvider'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import Notifications from '../components/Notifications';


function MoviePage() {
  // hooks must be declared before they are used
  const navigate = useNavigate();
  const { id } = useParams();                   
  const { notifications } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  // grab auth helpers including signOut for logout button
  const { isAuthenticated, signOut } = useContext(AuthContext);

  // if auth is lost, send back to the public homepage
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };


const toggleNotifications = () => {
  setOpen(!open);
};

  

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState([])  

  const API_KEY = "e526ff6db1a01088e492769f2711eeac"

  // Fetch popular movies
  const fetchLatestMovie = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

    const data = await response.json()
      const mapped = data?.results.slice(0,100).map((movie)=>{
        return{
          id:movie.id.toString(),
          title:movie.title,
          year:movie.release_date ? new Date(movie.release_date).getFullYear():"",
          genre: movie.genre_ids ? movie.genre_ids.join(', ') : '',
          image: movie.poster_path,
          rating:0,
          description:movie.overview, 
          tmdbRating:movie.vote_average,
          release_date:movie.release_date,
        }
      })
      console.log(mapped)
      setMovies(mapped)
      // setMovies(data?.results)
      console.log(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
 
  }

  // Search movies
  const searchMovie = async (query) => {
    if (!query) {
      setSearchResult([]) 
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&include_adult=false&language=en-US&query=${query}&page=1`
      )
      if (!response.ok) {
        throw new Error("Searching failed, try again")
      }

     
      const data = await response.json()

       
      const mapped = data?.results.slice(0,1000 ).map((movie)=>{
        return{
          id:movie.id.toString(),
          title:movie.title,
          year:movie.release_date ? new Date(movie.release_date).getFullYear():"",
          genre: movie.genre_ids ? movie.genre_ids.join(', ') : '',
          image: movie.poster_path,
          rating:0,
          description:movie.overview, 
          tmdbRating:movie.vote_average,
          release_date:movie.release_date
        }
      })
      setSearchResult(mapped )
      console.log(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSearching(false)
    }
  }

  // Load popular movies on mount
  useEffect(() => {
    fetchLatestMovie()
  }, [])

  // Search movies when query changes
  useEffect(() => {
    if (searchQuery) {
      searchMovie(searchQuery)
    } else {
      setSearchResult([])
    }
  }, [searchQuery])
  const handleRatingChange=(movieId,rating)=>{
    setMovies(prev => prev.map(movie => movie.id === movieId ? {...movie, rating} : movie))
    setSearchResult(prev => prev.map(movie => movie.id === movieId ? {...movie, rating} : movie))
  }
  
  
  // const displayMovies;
  
let displayMovies
if (searchQuery) {
  displayMovies = searchResult
} else {
  displayMovies = movies
}
 
  return (
    <div className="app">
      <div className='insideApp'> 
        
      <header className="app-header">
        <h2 className="app-subtitle">Latest movies right now</h2>
        <div>
          {/* <button onClick={handleBack}>Back to home</button> */}
          {/* alternatively: <Link to="/">Back to home</Link> */}
        </div>
      </header>
      <ul className='navbarListA'>
       
   <li className="notification-icon" onClick={() => setOpen(!open)}>
  <FaBell size={25} />
  {notifications?.length > 0 && (
    <span className="notification-count">{notifications.length}</span>
  )}
  {open && (
    <div className="notification-dropdown">
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div key={n._id} className="notification-item">{n.message}</div>
        ))
      )}
    </div>
  )}
</li>

<li>
  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
</li>
      </ul>
        
      </div>
    

      <main className="main-content">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={searchMovie}
          onRatingChange={handleRatingChange}
          movies={displayMovies}
        />

        {isLoading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        <MovieGrid movies={displayMovies} onRatingChange={handleRatingChange} />
      </main>
    </div>
  )
}

export default MoviePage
