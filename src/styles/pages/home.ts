import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.4rem',
    left: '0.4rem',
    right: '0.4rem',
    padding: '3.2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const ArrowButton = styled('button', {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '13.6rem',
  height: '100%',
  background:
    'linear-gradient(270deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  color: '$white',
  fill: '$white',
  padding: '0 1.6rem',

  variants: {
    direction: {
      left: {
        left: 0,
        textAlign: 'left',
      },
      right: {
        right: 0,
        textAlign: 'right',
        background:
          'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
})
