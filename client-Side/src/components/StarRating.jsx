import { useState } from "react"

function StarRating ({movie,onRatingChange}){
  const [hovering,setHovering] =useState(0)

    return <div className="star-rating">
      {[2,4,6,8,10].map((star)=>{
          return <button key={star}
           onClick={()=>onRatingChange(movie.id,star)} 
           onMouseEnter={()=>setHovering(star)} 
           onMouseLeave={()=>setHovering(0)}
           className={`star ${star<=(hovering||movie?.rating)? "active":""}` }>⭐</button>
      })}
       { movie?.rating ===0 ? hovering===0?"":hovering:`${movie?.rating}/10`}
  
    </div>
}


export default StarRating