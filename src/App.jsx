import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [mergedList, setMergedList] = useState([]);

  function getData() {
    const apiUrl = 'https://lanciweb.github.io/demo/api/'
    const apiUrlActresses = 'actresses/'
    const apiUrlActors = 'actors/'

    axios.get(`${apiUrl}${apiUrlActresses}`).then(response => {
      console.log('Questi sono i dati delle attrici:', response.data);
      setActresses(response.data);
    }).catch(error => {
      console.log('Si è rotto...', error);
    })
    axios.get(`${apiUrl}${apiUrlActors}`).then(response => {
      console.log('Questi sono i dati degli attori:', response.data);
      setActors(response.data);
    }).catch(error => {
      console.log('Si è rotto...', error);
    })
  };

  function mergeList() {
    setMergedList([...actresses, ...actors])
  };

  function getMovies(obj) {
    if (obj.most_famous_movies) {
      return obj.most_famous_movies.map((movie, i) => <li key={i}>{movie}</li>)
    } else if (obj.known_for) {
      return obj.known_for.map((movie, i) => <li key={i}>{movie}</li>)

    }
  };

  function getAwards(awards) {
    if (Array.isArray(awards)) {
      return awards.join(', ')
    } else {
      return awards
    }
  };

  useEffect(getData, []);

  useEffect(mergeList, [actresses, actors]);


  return (
    <>
      <div className='container my-4'>
        <div className='row g-4 container justify-content-center'>
          {mergedList.map((person, i) => (

            <div key={i} className="card bg-dark text-white col-12 col-md-3" >
              <img src={person.image} className="card-img-top card-img-fixed" alt={person.name} />
              <div className="card-body">
                <h3 className="card-title">{person.name}</h3>
                <p className="card-text fst-italic">{person.birth_year} - {person.nationality}</p>
                <p className="card-text">{person.biography}</p>
                <ul className="card-text list-unstyled"><span className='fw-medium'>Movies:</span>{(person.most_famous_movies || person.known_for).map((movie, i) => <li key={i}>{movie}</li>)}</ul>
                {/* <ul className="card-text list-unstyled"><span className='fw-medium'>Movies:</span>{getMovies(person)}</ul> */}
                <p className="card-text"><span className='fw-medium'>Awards:</span> {person.awards ? Array.isArray(person.awards) ? person.awards.join(', ') : person.awards : 'NONE'}</p>
                {/* <p className="card-text"><span className='fw-medium'>Awards:</span> {getAwards(person.awards)}</p> */}
              </div>
            </div>
          ))}

        </div >
      </div >
    </>
  )
}

export default App
