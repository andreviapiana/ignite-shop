import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import { Container } from '../styles/pages/app'

import Header from '@/components/Header'

import { CartProvider } from 'use-shopping-cart'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_SECRET_KEY}
      currency="BRL"
      language="pt-BR"
      loading={<p>Loading</p>}
      shouldPersist={true}
    >
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
      <ToastContainer />
    </CartProvider>
  )
}
