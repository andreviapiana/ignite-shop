import { CartContainer, HeaderContainer } from './styles'
import Image from 'next/image'
import logoImg from '../../assets/logo.svg'
import { Handbag } from 'phosphor-react'
import Link from 'next/link'

export default function Header() {
  const cartItems = ['1']

  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImg} alt="" />
      </Link>

      <CartContainer>
        <Handbag size={24} weight="bold" />
        {cartItems.length > 0 && <span>{cartItems.length}</span>}
      </CartContainer>
    </HeaderContainer>
  )
}
