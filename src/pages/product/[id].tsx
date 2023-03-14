import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { Product as IProduct } from 'use-shopping-cart/core'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

export default function Product({ product }: IProduct) {
  const [isAddedItemToCart, setIsisAddedItemToCart] = useState(false)
  const { addItem } = useShoppingCart()

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  async function handleAddProductToCart() {
    setIsisAddedItemToCart(true)

    toast.success(`${product.name} adicionada ao carrinho!`, {
      theme: 'dark',
    })

    addItem(product)
    setIsisAddedItemToCart(false)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </span>

          <p>{product.description}</p>

          <button disabled={isAddedItemToCart} onClick={handleAddProductToCart}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'prod_NOi2DaGiMJaHFk' },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        currency: price.currency,
        description: product.description,
        price_id: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  }
}
