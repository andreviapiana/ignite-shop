import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import { Container } from '../styles/pages/app'

import Header from '@/components/Header'

import { CartProvider } from 'use-shopping-cart'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_SECRET_KEY}
      currency="BRL"
      language="pt-BR"
      loading={<p>Loading</p>}
    >
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
