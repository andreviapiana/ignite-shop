import { CartContainer, HeaderContainer } from './styles'
import Image from 'next/image'
import logoImg from '../../assets/logo.svg'
import { Handbag } from 'phosphor-react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import ShoppingCart from '../ShoppingCart'

export default function Header() {
  const cartItems = ['1']

  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImg} alt="" />
      </Link>

      <Dialog.Root>
        <CartContainer>
          <Handbag size={24} weight="bold" />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </CartContainer>
        <ShoppingCart />
      </Dialog.Root>
    </HeaderContainer>
  )
}
