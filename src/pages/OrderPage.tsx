import { useParams } from 'react-router-dom'
import Layout from '@/components/Layout'
import { useState, useEffect } from 'react'
import CardData from '@/data/CardData'
import { mockProductList } from '@/data/products'
import {
  Container,
  Section,
  CardScroll,
  CardThumb,
  CardPreview,
  MessageInput,
  Label,
  InfoText,
  Input,
  ProductInfo,
  ProductDetails,
  Brand,
  Price,
  OrderBar,
  OrderPrice,
  ErrorText,
  FormRow,
} from '@/styles/OrderPage.styled'

export const OrderPage = () => {
  const { productId } = useParams()
  const product =
    mockProductList.find((item) => item.id === Number(productId)) ||
    mockProductList[0]
  const [selectedCardId, setSelectedCardId] = useState(CardData[0]?.id || null)
  const selectedCard = CardData.find((card) => card.id === selectedCardId)

  const [message, setMessage] = useState(selectedCard?.defaultTextMessage || '')
  const [senderName, setSenderName] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [quantity, setQuantity] = useState(1)

  const [formErrors, setFormErrors] = useState({
    message: '',
    senderName: '',
    recipientName: '',
    recipientPhone: '',
    quantity: '',
  })

  const phoneRegex = /^010\d{8}$/

  const handleOrder = () => {
    const errors = {
      message: '',
      senderName: '',
      recipientName: '',
      recipientPhone: '',
      quantity: '',
    }

    if (!message.trim()) {
      errors.message = '메시지를 입력해주세요.'
    }
    if (!senderName.trim()) {
      errors.senderName = '이름을 입력해주세요.'
    }
    if (!recipientName.trim()) {
      errors.recipientName = '이름을 입력해주세요.'
    }
    if (!recipientPhone.trim()) {
      errors.recipientPhone = '전화번호를 입력해주세요.'
    } else if (!phoneRegex.test(recipientPhone.trim())) {
      errors.recipientPhone = '올바른 전화번호 형식이 아닙니다.'
    }
    if (quantity < 1) {
      errors.quantity = '수량은 1개 이상이어야 합니다.'
    }

    setFormErrors(errors)

    const hasErrors = Object.values(errors).some((e) => e)
    if (hasErrors) return
  }

  const totalPrice =
    product?.price?.sellingPrice && quantity
      ? product.price.sellingPrice * quantity
      : 0

  return (
    <Layout>
      <Container>
        <CardScroll>
          {CardData.map((card) => (
            <CardThumb
              key={card.id}
              selected={card.id === selectedCardId}
              onClick={() => {
                setSelectedCardId(card.id)
                setMessage(card.defaultTextMessage || '')
              }}
            >
              <img src={card.thumbUrl} alt={card.title} />
            </CardThumb>
          ))}
        </CardScroll>

        <CardPreview>
          <img src={selectedCard?.imageUrl} alt={selectedCard?.title} />
        </CardPreview>

        <Section>
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {formErrors.message && <ErrorText>{formErrors.message}</ErrorText>}
        </Section>

        <Section>
          <Label>보내는 사람</Label>
          <Input
            placeholder="이름을 입력하세요."
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
          {formErrors.senderName && (
            <ErrorText>{formErrors.senderName}</ErrorText>
          )}
          <InfoText>* 실제 선물 발송 시 발신자 이름으로 반영됩니다.</InfoText>
        </Section>

        <Section>
          <Label>받는 사람</Label>

          <FormRow>
            <label>이름</label>
            <Input
              placeholder="이름을 입력하세요."
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </FormRow>
          {formErrors.recipientName && (
            <ErrorText>{formErrors.recipientName}</ErrorText>
          )}

          <FormRow>
            <label>전화번호</label>
            <Input
              placeholder="전화번호를 입력하세요."
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
            />
          </FormRow>
          {formErrors.recipientPhone && (
            <ErrorText>{formErrors.recipientPhone}</ErrorText>
          )}

          <FormRow>
            <label>수량</label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </FormRow>
          {formErrors.quantity && <ErrorText>{formErrors.quantity}</ErrorText>}
        </Section>

        <Section>
          <Label>상품 정보</Label>
          <ProductInfo>
            {product?.imageURL ? (
              <img
                src={product.imageURL}
                alt={product.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: '#eee',
                }}
              />
            )}

            <ProductDetails>
              <div style={{ fontWeight: 600 }}>{product?.name || ''}</div>
              <Brand>{product?.brandInfo?.name || ''}</Brand>
              <Price>
                <span
                  style={{
                    fontSize: '0.9rem',
                    color: '#888',
                    fontWeight: 'normal',
                  }}
                >
                  상품가{' '}
                </span>
                {product?.price?.sellingPrice?.toLocaleString() || 0}원
              </Price>
            </ProductDetails>
          </ProductInfo>
        </Section>
      </Container>

      <OrderBar onClick={handleOrder}>
        <OrderPrice>{totalPrice.toLocaleString()}원 주문하기</OrderPrice>
      </OrderBar>
    </Layout>
  )
}

export default OrderPage
