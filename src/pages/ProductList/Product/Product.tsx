import { ForwardedRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, pathToProductDetail } from 'src/utils/utils'
import ProductRating from 'src/components/ProductRating'

interface Props {
  product: ProductType
}

function Product({ product }: Props, ref: ForwardedRef<HTMLAnchorElement>) {
  const { t } = useTranslation()
  return (
    <Link to={pathToProductDetail({ name: product.name, id: product._id })} ref={ref}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt='' className='absolute left-0 top-0 h-full w-full bg-gray-300 object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-xs'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>{t('sold')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default forwardRef(Product)
