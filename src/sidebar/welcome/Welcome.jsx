import styles from './Welcome.module.css'

function Welcome() {
	return (
		<>
			<div className={styles.welcome_wrapper}>
				<img src="/src/assets/profile-pic-1.jpg" alt="Profile picture" />

			</div>
		</>
	)
}

export default Welcome