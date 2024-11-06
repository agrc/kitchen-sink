/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7fc',
          100: '#f6edfa',
          200: '#ebdbf3',
          300: '#ddbee9',
          400: '#ca97db',
          500: '#b16ec7',
          600: '#964faa',
          700: '#7c3f8c',
          800: '#673573',
          // generated from
          900: '#4d2a54',
          950: '#36163c',
        },
        secondary: {
          50: '#f2f9f9',
          100: '#ddeef0',
          200: '#bedce3',
          300: '#91c3cf',
          400: '#5da1b3',
          500: '#428698',
          600: '#396e81',
          700: '#345b6a',
          // generated from
          800: '#33505d',
          900: '#2c424d',
          950: '#192933',
        },
        accent: {
          50: '#fdfae6',
          100: '#fbf4cc',
          200: '#f7ea99',
          300: '#f2df66',
          400: '#eed533',
          // generated from
          500: '#eaca00',
          600: '#bba200',
          700: '#8c7900',
          800: '#5e5100',
          900: '#2f2800',
        },
      },
      fontFamily: {
        utah: [
          '"Source Sans 3"',
          '"Source Sans Pro"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'gradient-x': 'gradient-x 4s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-react-aria-components')],
};
