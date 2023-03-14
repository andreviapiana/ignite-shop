import { styled } from '../../styles'
import * as Dialog from '@radix-ui/react-dialog'

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
  maxWidth: 1180,
  padding: '3.2rem 0',
  margin: '0 auto',

  '@media (max-width: 768px)': {
    display: 'flex',
    padding: '2rem',
  },
})

export const CartContainer = styled(Dialog.Trigger, {
  position: 'relative',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: 48,
  height: 48,
  padding: 12,
  borderRadius: 6,
  border: 'none',

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
    color: '$white',

    backgroundColor: '$green500',

    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
})
