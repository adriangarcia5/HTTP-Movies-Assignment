import React, {useState, useEffect} from 'react';
import Movie from './Movie';
import axios from 'axios'


const UpdateForm = (props) => {

    const[movies,setMovies] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
});
  

const handleChange = e => setMovies({ ...Movie, [e.target.name]: e.target.value })


return(
    <form>
        <input
        type="text"
        name="title"
        placeholder="title"
        value={movies.title}
        onChange={handleChange}
        />
        <input 
            type="text"
            name="director"
            placeholder="director"
            value={movies.director}
            onChange={handleChange}
        />

        <input 
            type="text"
            name="metascore"
            placeholder="metascore"
            value={movies.title}
            onChange={handleChange}
            />
        {/* <input 
            type="text"
            name="title"
            placeholder="title"
            value={movie.title}
            onChange={handleChange}/> */}

            {/* {Movie.stars.map((starName, index)=> {
                return <input type="text"
                            placeholder="star"
                            key={index}
                            value={starName}
                            onChange={handleStar(index)}
                            />
            })} */}
    </form>
    )
}

export default UpdateForm;