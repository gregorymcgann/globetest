const config = {
	urls: {
		globeTexture: '../assets/textures/earth_dark.jpg',
		pointTexture: '../assets/imgs/disc.png'
	},
	sizes: {
		globe: 200,
		globeDotSize: 2
	},
	scale: {
		points: 0.025,
		markers: 0.025,
		globeScale: 1
	},
	rotation: {
		globe: 0.001
	},
	colors: {
		globeDotColor: '#990147',
		globeMarkerColor: 'rgb(143, 216, 216)',
		globeMarkerGlow: 'rgb(255, 255, 255)',
		globeLines: 'rgb(255, 255, 255)',
		globeLinesDots: 'rgb(255, 255, 255)'
	},
	display: {
		points: true,
		map: true,
		lines: true,
		markers: true,
		markerLabel: false,
		markerPoint: true
	},
	dots: {
		total: 30
	},
	countryDots: {
		size: 2,
		color: 'rgb(255, 255, 255)',
		opacity: 0.8,
		total: 1 // dots per country
	}
}

const elements = {
	globe: null,
	atmosphere: null,
	globePoints: null,
	lineDots: [],
	markers: [],
	markerLabel: [],
	markerPoint: [],
	lines: [],
	countryDots: []
}

const textures = {
	markerLabels: []
}

const groups = {
	map: null,
	main: null,
	globe: null,
	lines: null,
	points: null,
	markers: null,
	atmosphere: null,
	lineDots: null,
	countryDots: null
}

const countries = {
	interval: 20000,
	selected: null,
	index: 0
}

const animations = {
  rotateGlobe: true
}