import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: '#f5f5f5',
        secondary: '#6f6f70',
        accent: {
          1: '#6abd7d',
          2: '#5b96f4',
          3: '#f0d347',
          4: '#e42138'
        },
      },
      fontFamily: {
        sans: ['Chivo', 'sans-serif']
      }
    },
    plugins: []
  }
}
