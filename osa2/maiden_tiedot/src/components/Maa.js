import React from 'react'

const Maa = ({ maa, setNewFilter }) => {

    const handleClick = () => {
        console.log(maa.name)
        setNewFilter(maa.name)
    }

  return (
    <div>
        {maa.name} <button value={maa} onClick={handleClick}>show</button>
    </div>
  )
}

export default Maa