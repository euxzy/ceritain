import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  theme: {
    extend: {
      colors: {
        primary: '#f5f5f5',
        accent: {
          1: '#6abd7d',
          2: '#5b96f4',
          3: '#f0d347',
          4: '#e42138'
        },
      }
    },
    plugins: []
  }
}
