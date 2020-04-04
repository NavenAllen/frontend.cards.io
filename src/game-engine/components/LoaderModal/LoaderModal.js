import React from 'react'
import Lottie from 'react-lottie'
import animationData from './loaderData.json'
import './LoaderModal.css'
const LoaderModal = (props) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}
	const showHideClassName = props.show
		? 'modal-container display-block'
		: 'modal-container display-none'
	return (
		<div className={showHideClassName}>
			<div className="loader-modal-main">
				<Lottie options={defaultOptions} height={150} width={250} />
			</div>
		</div>
	)
}
export default LoaderModal
