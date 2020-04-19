import * as PIXI from 'pixi.js'

export let rendererLoader

export class GameRenderer {
	constructor() {
		this.cardsScale = null
		this.rootContainer = null
		this.otherContainer = null
		this.playerContainer = null
		this.loader = null

		this.app = new PIXI.Application({
			antialias: true,
			autoDensity: true,
			autoResize: true,
			clearBeforeRender: false,
			resolution: window.devicePixelRatio,
			resizeTo: window,
			transparent: true
		})
	}

	loadRendererAssets = (callback) => {
		const loader = new PIXI.Loader()
		loader.add('cardData', '/cards/cards.json').load()

		loader.onComplete.add((loader) => {
			rendererLoader = loader
			console.log('Renderer assets loaded')

			this.autoResize()
			callback()
		})
	}

	resetRenderer = () => {
		this.app.stage.removeChildren()
	}

	autoResize = () => {
		console.log('Auto resizing elements')

		this.setScale()
	}

	setScale = () => {
		let sx = (0.6 * window.screen.width) / 1920,
			sy = (0.6 * window.screen.height) / 1080,
			scale = sx < sy ? sx : sy
		if (window.screen.orientation.type.includes('portrait'))
			scale = Math.max(scale, 0.3)
		else scale = Math.max(scale, 0.25)
		this.cardsScale = scale
	}

	initBaseContainers = () => {
		this.rootContainer = this.app.stage
		this.otherContainer = new PIXI.Container({
			interactive: false
		})
		this.rootContainer.addChild(this.otherContainer)
		this.playerContainer = new PIXI.Container({
			interactive: true
		})
		this.rootContainer.addChild(this.playerContainer)
	}

	initRenderer = () => {
		this.initBaseContainers()

		window.onresize = this.autoResize
		window.onorientationchange = this.autoResize

		const animate = (delta) => {}

		this.app.ticker.add(animate)
		this.app.ticker.start()
	}
}

export default GameRenderer
