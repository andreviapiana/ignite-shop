import { CartContainer, HeaderContainer } from './styles'
import Image from 'next/image'
import logoImg from '../../assets/logo.svg'
import { Handbag } from 'phosphor-react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import ShoppingCart from '../ShoppingCart'
import { useShoppingCart } from 'use-shopping-cart'

export default function Header() {
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImg} alt="" />
      </Link>

      <Dialog.Root>
        <CartContainer>
          <Handbag size={24} weight="bold" />
          {cartCount > 0 && <span>{cartCount}</span>}
        </CartContainer>
        <ShoppingCart />
      </Dialog.Root>
    </HeaderContainer>
  )
}
