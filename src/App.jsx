import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {
  const [actresses, setActresses] = useState([]);

  function getData() {
    const apiUrlActresses = 'https://lanciweb.github.io/demo/api/actresses/'

    axios.get(apiUrlActresses).then(response => {
      console.log('Questi sono i dati delle attrici:', response.data);
      setActresses(response.data);
    }).catch(error => {
      console.log('Si è rotto...', error);
    })
  }

  useEffect(getData, [])

  return (
    <>

      <div className='container my-4'>
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
        </div >
      </div >
    </>
  )
}

export default App
