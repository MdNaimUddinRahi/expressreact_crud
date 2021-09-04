import './App.css';
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieReviewList, setMovieList] = useState([])

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName   : movieName, 
      movieReview : review
    }).then(()=> {
      alert('you have successful Insert')
    })
    return getMovieList()
    
  }

  useEffect(() => {
    getMovieList()
  }, [])

  const getMovieList = () => {
    Axios.get('http://localhost:3001/api/get').then((response)=> {
      // console.log(`response`, response)
      setMovieList(response.data)
    })
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label htmlFor="movieName">Movie Name</label>
        <input type="text" name="movieName" id="movieName" onChange={(e)=> { setMovieName(e.target.value)}}/>
        <label htmlFor="review">Review</label>
        <input type="text" name="review" id="review" onChange={(e)=> { setReview(e.target.value)}}/>
        <button onClick= {submitReview}>Submit</button>
      </div>
      {movieReviewList.map((val) => {
        return (<h4>
          Movie Name =  {val.movieName} | Review = {val.movieReview}
        </h4>)
      })}
    </div>
  );
}

export default App;
