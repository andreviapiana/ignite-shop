import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  ':root': {
    fontSize: '10px',
  },

  '.Toastify__toast-body': {
    fontSize: '1.6rem',
    fontWeight: 'bolder',
  },

  '.Toastify__toast-container': {
    minWidth: '52rem',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
})
