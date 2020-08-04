import React, {useState} from 'react'

const Filter = () => {
    const [newFilter, setNewFilter] = useState('')

  const handleChange = (event) => {
      console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={newFilter} onChange={handleChange} />
    </div>
  )
}

export default Filter