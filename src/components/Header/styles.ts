import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
  maxWidth: 1180,
  padding: '3.2rem 0',
  margin: '0 auto',
})

export const CartContainer = styled('div', {
  position: 'relative',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: 48,
  height: 48,
  padding: 12,
  borderRadius: 6,

  backgroundColor: '$gray800',

  cursor: 'pointer',

  svg: {
    color: '$gray500',
  },

  span: {
    position: 'absolute',
    top: -7,
    right: -7,
    width: 24,
    height: 24,
    borderRadius: 9999,
    outline: '3px solid $gray900',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '$green500',

    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
})
