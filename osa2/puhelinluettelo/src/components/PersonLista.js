import React from 'react'
const Person = (props) =>{
    
    return(
        <li key={props.name}>{props.person.name} {props.person.number} 
        <button onClick={(event) => props.deleteNumber(props.person.id)}>delete</button>
        </li>
    )
}

const PersonLista = (props) => {

    const personsToShow = props.persons.filter(p => p.name.toLowerCase().includes(props.newFilter.toLowerCase()))

    const numerot = () => personsToShow.map(
        person => <Person key={person.id} person={person} deleteNumber={props.deleteNumber} />
    )

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {numerot()}
            </ul>

        </div>
    )
}

export default PersonLista