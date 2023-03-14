import * as Dialog from '@radix-ui/react-dialog'
import { X, XCircle } from 'phosphor-react'
import {
  Close,
  Content,
  ErrorContainer,
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
import { toast } from 'react-toastify'

export default function ShoppingCart() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { cartDetails, removeItem, cartCount, formattedTotalPrice } =
    useShoppingCart()

  const cart = Object.values(cartDetails ?? {}).map(
    (cartItem: IProduct) => cartItem,
  )

  const isCartEmpty = cartCount === 0

  function handleRemoveItem(id: string, name: string) {
    toast.warning(`${name} removida do carrinho!`, {
      theme: 'dark',
    })
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

        {cartCount > 0 ? (
          <ItemsContainer>
            {cart.map((cartItem) => (
              <Item key={cartItem.id}>
                <ImageContainer>
                  <Image
                    src={cartItem.imageUrl}
                    alt=""
                    width={95}
                    height={95}
                  />
                </ImageContainer>
                <div>
                  <h4>{cartItem.name}</h4>
                  <div className="quantity">
                    <strong>
                      {formatCurrencyString({
                        value: cartItem.price,
                        currency: cartItem.currency,
                      })}

                      <p>x {cartItem.quantity}</p>
                    </strong>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(cartItem.id, cartItem.name)}
                  >
                    Remover
                  </button>
                </div>
              </Item>
            ))}
          </ItemsContainer>
        ) : (
          <ErrorContainer>
            <strong>Oooooops! Seu carrinho está vazio!</strong>
            <XCircle size={132} />
          </ErrorContainer>
        )}

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
