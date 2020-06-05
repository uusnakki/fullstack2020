import React, { useState, useEffect } from 'react'
import './index.css'
import PersonLista from './components/PersonLista'
import PForm from './components/PForm'
import FForm from './components/FForm'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  console.log('render', persons.length, 'persons')



  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deleteNumber = (id) => {
    const result = window.confirm("Do you want to delete this number?")
    if (result) {
      personService
        .destroy(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
        .then(setMessage('Number deleted succesfully'))
        setTimeout(()=>{
          setMessage(null)
        }, 5000)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Error message={error}/>
      <FForm handleFilterChange={handleFilterChange} />
      <h2>add new number</h2>
      <PForm persons={persons} setPersons={setPersons} newName={newName}
        setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} setMessage={setMessage} setError={setError} />
      <PersonLista persons={persons} newFilter={newFilter} deleteNumber={deleteNumber} />
    </div>
  )

}

export default App