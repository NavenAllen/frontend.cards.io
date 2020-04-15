import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
	const isMob1 = useMediaQuery({
		maxDeviceHeight: 619
	})
	let isMob2 = useMediaQuery({ maxDeviceWidth: 767 })
	isMob2 = useMediaQuery({ maxDeviceHeight: 1020 }) && isMob2

	return isMob1 || isMob2 ? null : children
}

const Mobile = ({ children }) => {
	const isMob1 = useMediaQuery({
		maxDeviceHeight: 619
	})
	let isMob2 = useMediaQuery({ maxDeviceWidth: 767 })
	isMob2 = useMediaQuery({ maxDeviceHeight: 1020 }) && isMob2

	return isMob1 || isMob2 ? children : null
}

export { Desktop, Mobile }
