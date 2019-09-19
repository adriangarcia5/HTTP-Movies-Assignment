import React, {useState, useEffect} from 'react';
import Movie from './Movie';
import axios from 'axios'


const UpdateForm = (props) => {

    const[movies,setMovies] = useState(null); 
//     const[movies,setMovies] = useState({
//         title: '',
//         director: '',
//         metascore: '',
//         stars: []
// });

const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovies(res.data))
      .then(res => console.log(res, 'res'))
    //   .then(console.log(setMovies, 'set movies'))
      .catch(err => console.log(err.response));
  };

//run this componentDidMount, componentDidUpdate with useEffect
  useEffect(()=>{
    fetchMovie(props.match.params.id); //supposed to run our movie with fetchMovie callback
}, [props.match.params.id])

  

const handleChange = e => setMovies({ ...movies, [e.target.name]: e.target.value })

//a function that accepts a value of another function
const handleStar = index => e => {
    setMovies({...movies, stars: movies.stars.map((star, starIndex)=> {
        if (starIndex === index) {
            return e.target.value
        } else {
            return star;
        }
    })})
}

const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movies)
    .then(res => {console.log(res) 
    props.history.push('/') //push new data in 
})
}

const addStar = e => {
    e.preventDefault();
    setMovies({...movies, stars: [...movies.stars, '']});
}

const deleteStar = e => {
    e.preventDefault();
    setMovies(movies.filter(movie => movie.id != props.match.params.id))
}

if (!movies) {
    return <div>Movie Loading....</div>
}

return(
    <form onSubmit={handleSubmit}>
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
            value={movies.metascore}
            onChange={handleChange}
            />
        
            {movies.stars.map((starName, index)=> {
                return <input type="text"
                            placeholder="star"
                            key={index}
                            value={starName}
                            onChange={handleStar(index)}
                            />
            })}
            <button type="submit"> Update movie</button>
            <button onClick={addStar}> Add star</button>
            <button onClick={deleteStar}> Delete star</button>
    </form>
    )
}

export default UpdateForm;