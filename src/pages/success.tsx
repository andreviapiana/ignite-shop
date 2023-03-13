import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  ProductsContainer,
  SuccessContainer,
} from '../styles/pages/success'

import { useShoppingCart } from 'use-shopping-cart'
import { useState } from 'react'

interface SuccessProps {
  costumerName: string
  products: {
    id: string
    name: string
    imageUrl: string
  }[]
}

export default function Success({ costumerName, products }: SuccessProps) {
  const [successfulPurchase, setSuccessfulPurchase] = useState(true)

  const { clearCart } = useShoppingCart()

  if (successfulPurchase) {
    clearCart()
    setSuccessfulPurchase(false)
  }

  const productsAmount = products.length

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ProductsContainer>
          {products.map((product) => {
            return (
              <ImageContainer key={product.id}>
                <Image
                  src={product.imageUrl}
                  alt=""
                  width={115}
                  height={105}
                  placeholder="blur"
                  blurDataURL={product.imageUrl}
                />
              </ImageContainer>
            )
          })}
        </ProductsContainer>

        <p>
          Uhuul!! <strong>{costumerName}</strong>, a sua compra de{' '}
          <strong>{productsAmount}</strong> camiseta(s) foi concluída com
          sucesso! <br />
          Logo elas estarão a caminho da sua casa!
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const costumerName = session.customer_details.name
  const products = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      costumerName,
      products,
    },
  }
}
