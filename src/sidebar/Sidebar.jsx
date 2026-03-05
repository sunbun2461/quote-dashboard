import React, { useState } from 'react'
import Welcome from './welcome/Welcome.jsx'
import styles from './Sidebar.module.css'

function Sidebar() {

	return (
		<div className={styles.sidebar}>
			Sidebar
			<Welcome />
			{/* this will have several components, probably each button */}
		</div>
	)
}

export default Sidebar