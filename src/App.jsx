import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {
  // State che contiene la lista delle attrici
  const [actresses, setActresses] = useState([]);
  // State che contiene la lista degli attori
  const [actors, setActors] = useState([]);
  // State unico per attori e attrici
  const [mergedList, setMergedList] = useState([]);

  function getData() {
    // URL base dell'API
    const apiUrl = 'https://lanciweb.github.io/demo/api/'
    const apiUrlActresses = 'actresses/'
    const apiUrlActors = 'actors/'

    // Chiamata API per le attrici
    axios.get(`${apiUrl}${apiUrlActresses}`).then(response => {
      console.log('Questi sono i dati delle attrici:', response.data);
      setActresses(response.data);
    }).catch(error => {
      console.log('Si è rotto...', error);
    })

    // Chiamata API per gli attori
    axios.get(`${apiUrl}${apiUrlActors}`).then(response => {
      console.log('Questi sono i dati degli attori:', response.data);
      setActors(response.data);
    }).catch(error => {
      console.log('Si è rotto...', error);
    })
  };

  // Unisce attori e attrici in un unico array 
  function mergeList() {
    setMergedList([...actresses, ...actors])
  };

  // Controlla se l'oggetto passato ha uno dei due campi e restituisce i film
  function getMovies(obj) {
    if (obj.most_famous_movies) {
      return obj.most_famous_movies.map((movie, i) => <li key={i}>{movie}</li>)
    } else if (obj.known_for) {
      return obj.known_for.map((movie, i) => <li key={i}>{movie}</li>)

    }
  };


  // Controlla se il campo awards è un array o una stringa 
  // se è un array unisce con ', '
  // se è una stringa lo restituisce così com'è
  function getAwards(awards) {
    if (Array.isArray(awards)) {
      return awards.join(', ')
    } else {
      return awards
    }
  };


  // Cosa fare, [quando farlo]
  // getData viene eseguito all'avvio della pagina
  useEffect(getData, []);

  // mergeList viene eseguito nel momento in cui i parametri in actresses e/o actors cambiano
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
