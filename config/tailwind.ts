import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  theme: {
    container: {
      center: true,
      screens: {
        xl: '768px'
      }
    },
    extend: {
      colors: {
        primary: '#f2f7f5',
        secondary: '#f5f5f5',
        accent: {
          1: '#8bd3dd',
          2: '#8dbbff',
          3: '#d3b0ff',
          4: '#d3b0ff',
          5: '#fa636e',
          6: '#ffeaa0',
          7: '#ffd182',
          8: '#faae2b',
          9: '#87e1a0',
        },
      },
      borderRadius: {
        lgm: '10px'
      },
      dropShadow: {
        br: '.23rem .23rem 0 rgb(0, 0, 0)',
        rd: '0 .12rem 0 rgb(0, 0, 0)'
      },
      fontFamily: {
        sans: ['Comfortaa', 'cursive']
      }
    },
    plugins: []
  }
}
