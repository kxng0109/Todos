module.exports = {
	darkMode: 'class',
	content: ["./public/**/*.{html,js}"],
	theme: {
		extend: {
			screens:{
				'xsm' : '480px',
				'3xl' : '1824px',
				'4xl' : '2400px',
			},
			colors:{
				'very-light-green' : '#E9EB9E',
				'light-green' : '#B9FFB7',
				'light-dark-green' : '#ABEDC6',
				'black20' : 'hsl(0, 0%, 20%)',
				'dark-blueish' : '#07393C',
				'dark-lighter-blueish' : '#2c666e'
			},
			zIndex: {
				'1' : '1',
				'2' : '2',
				'3' : '3'
			},
			spacing : {
				'59%' : '59%'
			},
			fontFamily: {
				'fredoka' : ['Fredoka']
			}
		},
	},
	plugins: [],
}