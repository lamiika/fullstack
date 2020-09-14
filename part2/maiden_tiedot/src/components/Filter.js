import React from 'react'

const Filter = ({ searchInput, setSearchInput, setCountryDetails }) => (
  <form>
    <div>
      find countries <input
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value)
          setCountryDetails({})
        }}
      />
    </div>
  </form>
)

export default Filter