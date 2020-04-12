const binom = (n, k) => {
	var coeff = 1
	var i
	if (k < 0 || k > n) return 0
	for (i = 0; i < k; i++) coeff = (coeff * (n - i)) / (i + 1)
	return coeff
}

const bezierEqn = (points, t) => {
	let result = { x: 0, y: 0 }
	let n = points.length - 1
	for (let i = 0; i < points.length; i++) {
		result.x +=
			binom(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i) * points[i].x
		result.y +=
			binom(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i) * points[i].y
	}
	return result
}

const findOtherHandCoordinates = (width, height, px, py, count) => {
	let points = [],
		results = []
	width = width - 2 * px
	height = height - 2 * py
	points.push({ x: 0, y: 0 })
	points.push({ x: 0, y: (2 * height) / 3 })
	points.push({ x: width / 3, y: height })
	points.push({ x: width / 2, y: height })
	points.push({ x: (2 * width) / 3, y: height })
	points.push({ x: width, y: (2 * height) / 3 })
	points.push({ x: width, y: 0 })

	let base = 1 / (count + 1)
	for (let i = 1; i < count + 1; i++) {
		let r = bezierEqn(points, i * base)
		r.y = height - r.y
		r.x += px
		r.y += py
		results.push(r)
	}

	return results
}

const findPlayerHandCoordinates = (width, height, cardScale) => {
	let _w = window.screen.availWidth,
		_h = window.screen.availHeight
	let cardHeight = 249

	let hFactor = 0.1
	if (window.screen.orientation.type.includes('portrait')) {
		if (_w <= 1024) hFactor = -0.1
		if (_w <= 768) hFactor = 0.01
		if (_w <= 500) hFactor = -0.1
	} else {
		if (_w <= 900 && _h <= 450) hFactor = 0
	}

	let x = width / 2,
		y = height - cardHeight * cardScale + height * hFactor

	return { x, y }
}

const findHandCoordinates = (width, height, cardScale, px, py, count) => {
	return {
		player: findPlayerHandCoordinates(width, height, cardScale),
		others: findOtherHandCoordinates(width, height, px, py, count)
	}
}

export { findHandCoordinates }