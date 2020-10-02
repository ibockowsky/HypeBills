module.exports = {
  purge: false,
  theme: {
    maxHeight: {
      '64': '16rem',
      '256': '64rem'
    },
    height: {
      '1': '0.25rem',
      '2': '0.50rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '12': '3rem',
      '64': '16rem',
      '80': '20rem',
      '96': '24rem',
      '112': '28rem',
      '128': '32rem',
      '160': '40rem',
      '192': '48rem',
      '256': '64rem',
      '1/3': '33.333333%'
    },
    minWidth: {
      '1/4': '25%',
      full: '100%'
    },
    extend: {
      colors: {
        'meetup-blue': '#00455D',
        'meetup-purple': '#1F24CC',
        'gray-750': '#3f495a',
        'gray-850': '#222733',
        'gray-900-spotify': '#121212',
        'gray-800-spotify': '#181818',
        'gray-700-spotify': '#282828'
      }
    },
    linearGradientDirections: {
      // defaults to these values
      t: 'to top',
      tr: 'to top right',
      r: 'to right',
      br: 'to bottom right',
      b: 'to bottom',
      bl: 'to bottom left',
      l: 'to left',
      tl: 'to top left',
      default: '212deg'
    },
    linearGradientColors: {
      // defaults to {}
      red: '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
      'blue-pink': ['#FC466B 0%', '#3F5EFB 100%']
    },
    radialGradientShapes: {
      // defaults to this value
      default: 'ellipse'
    },
    radialGradientSizes: {
      // defaults to this value
      default: 'closest-side'
    },
    radialGradientPositions: {
      // defaults to these values
      default: 'center',
      t: 'top',
      tr: 'top right',
      r: 'right',
      br: 'bottom right',
      b: 'bottom',
      bl: 'bottom left',
      l: 'left',
      tl: 'top left'
    },
    radialGradientColors: {
      // defaults to {}
      red: '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff']
    },
    conicGradientStartingAngles: {
      // defaults to this value
      default: '0'
    },
    conicGradientPositions: {
      // defaults to these values
      default: 'center',
      t: 'top',
      tr: 'top right',
      r: 'right',
      br: 'bottom right',
      b: 'bottom',
      bl: 'bottom left',
      l: 'left',
      tl: 'top left'
    },
    conicGradientColors: {
      // defaults to {}
      red: '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      checkerboard: [
        'white 90deg',
        'black 90deg 180deg',
        'white 180deg 270deg',
        'black 270deg'
      ]
    },
    repeatingLinearGradientDirections: theme =>
      theme('linearGradientDirections'), // defaults to this value
    repeatingLinearGradientColors: theme => theme('linearGradientColors'), // defaults to {}
    repeatingLinearGradientLengths: {
      // defaults to {}
      sm: '25px',
      md: '50px',
      lg: '100px'
    },
    repeatingRadialGradientShapes: theme => theme('radialGradientShapes'), // defaults to this value
    repeatingRadialGradientSizes: {
      // defaults to this value
      default: 'farthest-corner'
    },
    repeatingRadialGradientPositions: theme => theme('radialGradientPositions'), // defaults to this value
    repeatingRadialGradientColors: theme => theme('radialGradientColors'), // defaults to {}
    repeatingRadialGradientLengths: {
      // defaults to {}
      sm: '25px',
      md: '50px',
      lg: '100px'
    },
    repeatingConicGradientStartingAngles: theme =>
      theme('conicGradientStartingAngles'), // defaults to this value
    repeatingConicGradientPositions: theme => theme('conicGradientPositions'), // defaults to this value
    repeatingConicGradientColors: {
      // defaults to {}
      red: '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      starburst: ['white 0 5deg', 'blue 5deg']
    },
    repeatingConicGradientLengths: {
      // defaults to {}
      sm: '10deg',
      md: '20deg',
      lg: '40deg'
    }
  },
  variants: {
    // all the following default to ['responsive']
    backgroundImage: ['responsive'], // this is for the "bg-none" utility
    linearGradients: ['responsive'],
    radialGradients: ['responsive'],
    conicGradients: ['responsive'],
    repeatingLinearGradients: ['responsive'],
    repeatingRadialGradients: ['responsive'],
    repeatingConicGradients: ['responsive']
  },
  plugins: [require('tailwindcss-gradients')]
}
