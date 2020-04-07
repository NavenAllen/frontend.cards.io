import * as PIXI from 'pixi.js'

export let rendererLoader

export class GameRenderer {
	constructor() {
		this.cardsScale = null
		this.totalPlayers = null
		this.otherContainer = null
		this.playerContainer = null

		this.app = new PIXI.Application({
			autoDensity: true,
			autoResize: true,
			resolution: window.devicePixelRatio,
			resizeTo: window,
			transparent: true,
			antialias: true
		})
	}

	loadRendererAssets = (callback) => {
		const loader = new PIXI.Loader()
		loader.add('cardData', '/cards/cards.json').load()

		loader.onComplete.add((loader) => {
			rendererLoader = loader
			console.log('Renderer assets loaded')

			callback()
		})
	}

	// Camera Related Methods
	autoResize = () => {
		/*
        let containerWidth = this.container.offsetWidth,
            containerHeight = this.container.offsetHeight

        if (this.app.renderer.width !== containerWidth || this.app.renderer.height !== containerHeight) {
            this.app.renderer.resize(containerWidth, containerHeight)
        }

        return this
        */

		this.setScale()
	}

	setScale = () => {
		let sx = (0.6 * window.screen.width) / 1920,
			sy = (0.6 * window.screen.height) / 1080
		this.cardsScale = sx < sy ? sx : sy
	}

	initBaseContainers = () => {
		let rootContainer = this.app.stage

		this.otherContainer = new PIXI.Container({
			interactive: false
		})
		this.playerContainer = new PIXI.Container({
			interactive: true
		})

		rootContainer.addChild(this.otherContainer)
		rootContainer.addChild(this.playerContainer)
	}

	initRenderer = () => {
		this.initBaseContainers()

		this.setScale()

		const animate = (delta) => {
			this.autoResize()
		}

		this.app.ticker.add(animate)
	}
}
