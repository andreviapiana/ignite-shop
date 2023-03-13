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
import camiseta from '../../assets/camisetas/camiseta.png'

export default function ShoppingCart() {
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
          <Item>
            <ImageContainer>
              <Image src={camiseta} alt="" width={95} height={95} />
            </ImageContainer>
            <div>
              <h4>Camiseta Igniter Aboard</h4>
              <strong>R$ 89,90</strong>
              <button>Remover</button>
            </div>
          </Item>

          <Item>
            <ImageContainer>
              <Image src={camiseta} alt="" width={95} height={95} />
            </ImageContainer>
            <div>
              <h4>Camiseta Igniter Aboard</h4>
              <strong>R$ 89,90</strong>
              <button>Remover</button>
            </div>
          </Item>

          <Item>
            <ImageContainer>
              <Image src={camiseta} alt="" width={95} height={95} />
            </ImageContainer>
            <div>
              <h4>Camiseta Igniter Aboard</h4>
              <strong>R$ 89,90</strong>
              <button>Remover</button>
            </div>
          </Item>
        </ItemsContainer>

        <FinishContainer>
          <div>
            <span>Quantidade</span>
            <span>3 itens</span>
          </div>

          <div>
            <span>Valor total</span>
            <strong>R$ 269,70</strong>
          </div>

          <button>Finalizar compra</button>
        </FinishContainer>
      </Content>
    </Dialog.Portal>
  )
}
