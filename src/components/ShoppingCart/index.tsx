import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import {
  Close,
  Content,
  FinishContainer,
  ImageContainer,
  Item,
  ItemsContainer,
  Title,
} from './styles'
import Image from 'next/image'

import axios from 'axios'

import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { Product as IProduct } from 'use-shopping-cart/core'
import { useState } from 'react'

export default function ShoppingCart() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { cartDetails, removeItem, cartCount, formattedTotalPrice } =
    useShoppingCart()

  const cart = Object.values(cartDetails ?? {}).map(
    (cartItem: IProduct) => cartItem,
  )

  const isCartEmpty = cartCount === 0

  function handleRemoveItem(id: string) {
    removeItem(id)
  }

  async function handleBuyProducts() {
    const productsToCheckout = cart.map((cartItem) => {
      return {
        price: cartItem.price_id,
        quantity: cartItem.quantity,
      }
    })

    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: productsToCheckout,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Content>
        <Close>
          {' '}
          <X size={24} weight="bold" />{' '}
        </Close>

        <Title>Sacola de compras</Title>

        <ItemsContainer>
          {cart.map((cartItem) => (
            <Item key={cartItem.id}>
              <ImageContainer>
                <Image src={cartItem.imageUrl} alt="" width={95} height={95} />
              </ImageContainer>
              <div>
                <h4>{cartItem.name}</h4>
                <strong>
                  {formatCurrencyString({
                    value: cartItem.price,
                    currency: cartItem.currency,
                  })}
                </strong>
                <button onClick={() => handleRemoveItem(cartItem.id)}>
                  Remover
                </button>
              </div>
            </Item>
          ))}
        </ItemsContainer>

        <FinishContainer>
          <div>
            <span>Quantidade</span>
            <span>
              {cartCount} {cartCount > 1 ? 'itens' : 'item'}
            </span>
          </div>

          <div>
            <span>Valor total</span>
            <strong>{formattedTotalPrice}</strong>
          </div>

          <button
            disabled={isCreatingCheckoutSession || isCartEmpty}
            onClick={handleBuyProducts}
          >
            Finalizar compra
          </button>
        </FinishContainer>
      </Content>
    </Dialog.Portal>
  )
}
