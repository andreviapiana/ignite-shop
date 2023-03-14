import Image from 'next/image'

import Head from 'next/head'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import {
  ArrowButton,
  CartButton,
  HomeContainer,
  Product,
} from '../styles/pages/home'

import { useState } from 'react'

import { GetStaticProps } from 'next'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'

import Link from 'next/link'
import { Handbag } from 'phosphor-react'

import { useShoppingCart } from 'use-shopping-cart'
import { toast } from 'react-toastify'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    defaultPriceId: string
    priceInCents: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  function Arrow(props: any) {
    // const disabled = props.disabled ? arrowDisabled() : "";
    return (
      <ArrowButton
        direction={props.left ? 'left' : 'right'}
        disabled={props.disabled}
      >
        <svg
          onClick={props.onClick}
          width="48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {props.left && (
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          )}
          {!props.left && (
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
          )}
        </svg>
      </ArrowButton>
    )
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>

              <footer>
                <div className="infos">
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <CartButton
                  onClick={() => {
                    toast.success(`${product.name} adicionada ao carrinho!`, {
                      theme: 'dark',
                    })

                    addItem({
                      id: product.id,
                      name: product.name,
                      imageUrl: product.imageUrl,
                      price: product.priceInCents,
                      price_id: product.defaultPriceId,
                      currency: 'BRL',
                    })
                  }}
                >
                  <Handbag size={32} weight="bold" />
                </CartButton>
              </footer>
            </Product>
          )
        })}

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: { stopPropagation: () => any }) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: { stopPropagation: () => any }) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      priceInCents: price.unit_amount,
      defaultPriceId: price.id,
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  }
}
