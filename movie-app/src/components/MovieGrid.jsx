import MovieCard from "./MovieCard";


export default function MovieGrid({movies,onRatingChange}){
    
     return (
    <div className="movies-grid">
        {
            movies?.map((movie)=>{
                return <MovieCard movie={movie} key={movie.id} onRatingChange={onRatingChange}/>
            })
        }     
    </div>
    )
}



