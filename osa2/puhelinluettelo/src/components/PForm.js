import React from 'react'
import personService from '../services/persons'


const PForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameChange, handleNumberChange, setMessage, setError }) => {

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(persoona => persoona.name.toLowerCase()).indexOf(newName.toLowerCase()) !== -1) {
      window.alert(`${personObject.name} is already added to phonebook`)
    }
    else
      personService
        .create(personObject)
        .then(returned => {
          setPersons(persons.concat(returned))
          setNewName('')
          setNewNumber('')
          setMessage('Number was succesfully added!')
        })
      .catch(error => {
        console.log(error.response.data)
        console.log('toimiiko?')
        setError(`${error.response.data.error}`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button
          type="submit">add</button>
      </div>
    </form>
  )
}

export default PForm