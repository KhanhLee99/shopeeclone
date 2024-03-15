import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate, createSearchParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'

import './animation.css'
import productApi from 'src/apis/product.api'
import { formatCurrency, formatNumberToSocialStyle, generateNameId, getIdFromNameId, rateSale } from 'src/utils/utils'
import QuantityController from 'src/components/QuantityController'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/Product'
import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import URLs from 'src/constants/url'
import NotFound from '../NotFound'

export default function ProductDetail() {
  const spanFlyRef = useRef<HTMLSpanElement>(null)
  const { t } = useTranslation()
  const { isAuthenticated, setCartShake } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [buyCount, setBuyCount] = useState<number | undefined>(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageActive, setImageActive] = useState('')
  const [indexImageSlider, setIndexImagesSlider] = useState([0, 5])
  const { data: productDetail, isPending } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    }
  })
  const product = productDetail?.data.data
  const imagesSlider = useMemo(() => {
    return product ? product.images.slice(...indexImageSlider) : []
  }, [product, indexImageSlider])

  const queryConfig: ProductListConfig = { page: 1, limit: 20, category: product?.category._id, exclude: id }

  const { data: products } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const productsData = products?.data.data

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setImageActive(product.images[0])
    }
  }, [product])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  useEffect(() => {
    setBuyCount(1)
  }, [id])

  const onActiveImage = (img: string) => {
    setImageActive(img)
  }

  const next = () => {
    if (product && indexImageSlider[1] < product?.images.length) {
      setIndexImagesSlider((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (indexImageSlider[0] > 0) {
      setIndexImagesSlider((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number | undefined) => {
    setBuyCount(value)
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) return navigateLoginPage(product as ProductType)
    addToCartMutation.mutate(
      {
        buy_count: Number(buyCount),
        product_id: product?._id as string
      },
      {
        onSuccess: () => {
          productFlyEffect(() => {
            queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
          })
        }
      }
    )
  }

  const productFlyEffect = (callback: () => void) => {
    const cartElement = document.querySelector('#cart')
    if (cartElement && spanFlyRef.current) {
      const spanFlyPosition = spanFlyRef.current.getBoundingClientRect()
      const cartPosition = cartElement.getBoundingClientRect()
      const data = {
        left: cartPosition.left - (cartPosition.width / 2 + spanFlyPosition.left + spanFlyPosition.width / 2),
        top: cartPosition.bottom - spanFlyPosition.bottom + 30
      }
      spanFlyRef.current.style.cssText = `--left : ${data.left.toFixed(2)}px; --top : ${data.top.toFixed(2)}px;`
      spanFlyRef.current.classList.add('send-to-cart')
      setTimeout(() => {
        spanFlyRef.current && spanFlyRef.current.classList.remove('send-to-cart')
        callback()
        setCartShake(true)
        setTimeout(() => {
          setCartShake(false)
        }, 500)
      }, 1000)
    }
  }

  const handleBuyNow = async () => {
    if (!isAuthenticated) return navigateLoginPage(product as ProductType)
    const res = await addToCartMutation.mutateAsync({
      buy_count: Number(buyCount),
      product_id: product?._id as string
    })
    const purchase = res.data.data
    navigate(URLs.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  const navigateLoginPage = (product: ProductType) => {
    navigate({
      pathname: URLs.login,
      search: createSearchParams({
        next: generateNameId({ name: product.name, id: product._id })
      }).toString()
    })

    return navigate
  }

  if (!product) {
    return isPending ? <></> : <NotFound />
  }

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{product.name} | Shopee Clone</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={imageActive}
                  alt={product.name}
                  className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {imagesSlider.map((img, index) => {
                  const isActive = img === imageActive
                  return (
                    <div
                      className='relative w-full pt-[100%]'
                      key={`${img}${index}`}
                      onMouseEnter={() => onActiveImage(img)}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='fill-orange text-orange h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>{t('sold')}</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} {t('off')}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>{t('quantity')}</div>
                <QuantityController
                  value={buyCount}
                  max={product.quantity}
                  onType={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>
                  {product.quantity} {t('pieces available')}
                </div>
              </div>
              <div className='relative mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                  onClick={handleAddToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  {t('add to cart')}
                  <span ref={spanFlyRef} className='flying-item absolute text-orange opacity-0'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
                      />
                    </svg>
                  </span>
                </button>
                <button
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                  onClick={handleBuyNow}
                >
                  {t('buy now')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>{t('product description')}</div>
            <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>{t('you may like')}</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
