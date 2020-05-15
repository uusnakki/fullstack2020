import React from 'react'

const MaaKOKO = ({ maa }) => {
      
    const kielet = () => {
        return (maa.languages.map(function(kieli,i){
            console.log(i)
        return <li key={i}>{kieli.name}</li>
        }))
     }

    return (
        <div>
            <h2>{maa.name}</h2>
            <p>{maa.capital}</p>
            <p>population {maa.population}</p>
            <h3>languages</h3>
            <ul>
                {kielet()}
            </ul>
            <br></br>
           <img 
           src={maa.flag}
           width={150}
           height={100}
           alt="flag"
           />
        </div>
    )
}

export default MaaKOKO