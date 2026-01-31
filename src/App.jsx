import { useEffect, useState } from 'react'
import axios from 'axios'
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
      {actresses.map((person) => (
        <div key={person.id}>
          <img src={person.image} alt={person.name} />
          <h3>{person.name}</h3>
          <p>{person.birth_year}</p>
          <p>{person.nationality}</p>
          <p>{person.biography}</p>
          <p>{person.awards}</p>
        </div>

      ))}
    </>
  )
}

export default App
