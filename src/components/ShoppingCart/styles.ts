import { keyframes, styled } from '../../styles'
import * as Dialog from '@radix-ui/react-dialog'

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translateX(110%)' },
  '100%': { opacity: 1, transform: 'translateX(0%)' },
})

const contentHide = keyframes({
  '0%': { opacity: 1, transform: 'translateX(0%)' },
  '100%': { opacity: 0, transform: 'translateX(110%)' },
})

export const Content = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',

  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,

  width: '100%',
  maxWidth: 480,
  padding: '7.2rem 4.8rem 4.8rem',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  background: '$gray800',

  '&[data-state="open"]': {
    animation: `${contentShow} 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${contentHide} 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

export const Title = styled(Dialog.Title, {
  fontSize: '$lg',
  lineHeight: 1.6,
  marginBottom: '3.2rem',
})

export const Close = styled(Dialog.Close, {
  position: 'absolute',
  top: 24,
  right: 24,

  lineHeight: 0,
  color: '$gray400',

  background: 'transparent',

  border: 'none',
  borderRadius: 4,

  cursor: 'pointer',

  transition: 'all 0.2s',

  '&:hover': {
    transform: 'scale(1.2)',
  },
})

export const ItemsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  gap: '1.5rem',
})

export const Item = styled('div', {
  display: 'flex',
  alignItems: 'center',

  gap: '2.4rem',

  h4: {
    color: '$gray300',
    fontSize: '$md',
    lineHeight: 1.6,
    marginBottom: 2,
  },

  strong: {
    display: 'block',
    fontSize: '$md',
    fontWeight: 'bold',
    marginBottom: '0.8rem',
  },

  button: {
    color: '$green500',
    fontSize: '$sm',
    fontWeight: 'bold',

    background: 'transparent',
    border: 'none',

    cursor: 'pointer',
    transition: 'color 0.2s',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const FinishContainer = styled('div', {
  marginTop: 'auto',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: 1.6,

    '&:first-child': {
      marginBottom: '0.8rem',

      span: {
        fontSize: '$sm',
      },
    },

    '&:nth-child(2)': {
      marginBottom: '5.6rem',

      span: {
        fontWeight: 'bold',
        fontSize: '$md',
      },

      strong: {
        fontSize: '$xl',
      },
    },
  },

  button: {
    width: '100%',
    height: 69,

    border: 'none',
    borderRadius: 8,

    background: '$green500',

    color: '$white',
    fontSize: '$md',
    fontWeight: 'bold',

    cursor: 'pointer',

    transition: 'background-color 0.2s',

    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})

export const ImageContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '10.2rem',
  height: '9.5',
  borderRadius: 8,

  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',

  img: {
    objectFit: 'cover',
  },
})
