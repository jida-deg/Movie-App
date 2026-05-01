import StarRating from "./StarRating"
function MovieCard ({movie,onRatingChange}){


    return (
  <div className="movie-card">
      <div className="movie-poster">
        <a 
  href={`https://www.moviebox.com/${encodeURIComponent(movie.title)}`} 
  target="_blank" 
  rel="noopener noreferrer"
>
  <img 
    src={`https://image.tmdb.org/t/p/w500${movie?.image}`} 
    alt={movie.name} 
    className="poster-image"
  />
</a>
       <div className="movie-overlay">
              <div className="movie-info">
                    <h3 className="movie-title">
                       {movie.title}
                    </h3>
                  <div className="movie-details">
                      <span className="movie-year">{movie?.year}</span>
                      <span className="movie-genre">{movie?.genre}</span>
                   </div>
               </div> 
             
                 {/* movie rating */}
                <div className="movie-rating">
                    <StarRating movie={movie} onRatingChange={onRatingChange}/>
                    {/* a number showing the rating */}
               </div>
          </div>
       </div>
    </div>
    )
}

export default MovieCard