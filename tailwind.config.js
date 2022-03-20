module.exports = {
  darkMode: 'class',
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'very-light-green' : '#dbfeb8',
        'light-green' : '#B2FFD6',
        'light-dark-green' : '#B4D6D3',
        'black20' : 'hsl(0, 0%, 20%)',
        'dark-blueish' : '#07393C',
        'dark-lighter-blueish' : '#2c666e'
      },
      zIndex: {
        '1' : '1',
        '2' : '2'
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
