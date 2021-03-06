import React from 'react'

const Filter = ({ searchInput, setSearchInput }) => (
	<form>
		<div>
			filter shown with <input
				value={searchInput}
				onChange={(event) => setSearchInput(event.target.value)}
			/>
		</div>
	</form>
)

export default Filter