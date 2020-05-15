import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Maa from'./components/Maa'
import MaaKOKO from'./components/MaaKOKO'

const App = () => {
 const [maat, asetaMaat] = useState([])
 const [etsittyMaa, asetaEtsittyMaa] = useState('')
 const [newFilter, setNewFilter] = useState('')

 useEffect(() => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      asetaMaat(response.data)
    })
}, [])

const maatToShow = etsittyMaa
    ? maat
    : maat.filter(m => m.name.toLowerCase().includes(newFilter.toLowerCase()))

    const countries = () =>{
      if(maatToShow.length > 10) return <div>Too many matches, specify another filter</div>
    if(maatToShow.length === 1) return maatToShow.map(maa => <MaaKOKO key={maa.name} maa={maa} /> )
      else
      return maatToShow.map(maa => <Maa key={maa.name} maa={maa} setNewFilter={setNewFilter} newFilter={newFilter} asetaEtsittyMaa={asetaEtsittyMaa}/>)
    }

  const handleMaaChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <form>
      find countries
      <input
        value={newFilter}
        onChange={handleMaaChange}
      />
      <h2>Maat</h2>
      <ul>
        {countries()}
      </ul>
    </form>
  );
}

export default App;
