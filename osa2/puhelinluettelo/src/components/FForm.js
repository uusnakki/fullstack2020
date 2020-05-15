import React from 'react'

const FForm = (props) => {
    return(
        <div>
        filter: <input
          value={props.newFilter}
          onChange={props.handleFilterChange}
        />
      </div>
      
    )
}

export default FForm