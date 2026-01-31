import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [generalList, setGeneralList] = useState([])

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
  }

  useEffect(getData, [])

  return (
    <>
      <div className='container my-4'>
        {/* <div className='d-flex justify-content-end my-4'>
          <button type="button" class="btn btn-outline-light">Actresses</button>
          <button type="button" class="btn btn-outline-light">Actor</button>
        </div> */}
        <div className='row g-4 container justify-content-center'>
          {actresses.map((person) => (

            <div key={person.id} className="card bg-dark text-white col-12 col-md-3" >
              <img src={person.image} className="card-img-top card-img-fixed" alt={person.name} />
              <div className="card-body">
                <h3 className="card-title">{person.name}</h3>
                <p className="card-text fst-italic">{person.birth_year} - {person.nationality}</p>
                <p className="card-text">{person.biography}</p>
                <p className="card-text"><span className='fw-medium'>Awards:</span> {person.awards}</p>
              </div>
            </div>
          ))}
          {actors.map((person) => (

            <div key={person.id} className="card bg-dark text-white col-12 col-md-3" >
              <img src={person.image} className="card-img-top card-img-fixed" alt={person.name} />
              <div className="card-body">
                <h3 className="card-title">{person.name}</h3>
                <p className="card-text fst-italic">{person.birth_year} - {person.nationality}</p>
                <p className="card-text">{person.biography}</p>
                <p className="card-text"><span className='fw-medium'>Awards:</span> {person.awards.join(', ')}</p>
              </div>
            </div>
          ))}
        </div >
      </div >
    </>
  )
}

export default App
