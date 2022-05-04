module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#F1D765',
				black: '#1e1e1e'
			},
			fontFamily: {
				montserrat: "'Montserrat', sans-serif",
				marker: "'Permanent Marker', cursive"
			},
			borderWidth: {
				1: '1px'
			},
			boxShadow: {
				sharp: '2px 2px 0 0 black',
				'sharp-dropped': '3px 3px 0 0 black'
			}
		}
	},
	plugins: []
};
