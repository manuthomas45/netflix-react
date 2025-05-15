import React, { useState, useEffect, useRef } from 'react';
import "./TitleCards.css";
import {Link} from 'react-router-dom'
const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWJhYjlhZTM1ZmJlZGE3NTA5YWEwNDYxOGRjNzQyZCIsIm5iZiI6MTczODMzMTUyOC4yMTIsInN1YiI6IjY3OWNkNTg4NzM3MTIxNjk4MTRkMWNlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n2NwtsK9mrm_o6X07krQyaBFoTG1L7SnUhCKmQojViQ' // Replace this with your actual token
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    console.log(`${category}`);
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
  

      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error("API Fetch Error:", err));

    const cardList = cardsRef.current;
    if (cardList) {
      cardList.addEventListener('wheel', handleWheel);
      return () => {
        cardList.removeEventListener('wheel', handleWheel);
      };
    }
  }, [category]); // Added category to dependency array

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
        <Link to={`/player/${card.id}`}className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;