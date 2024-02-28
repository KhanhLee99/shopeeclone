import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'

import Button from 'src/components/Button'
import URLs from 'src/constants/url'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
import { Category } from 'src/types/category.tye'
import FormPriceFilter from './FormPriceFilter'
import RatingStars from './RatingStar/RatingStar'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const handleRemoveFilter = () => {
    navigate({
      pathname: URLs.productList,
      search: createSearchParams(omit(queryConfig, ['category', 'price_min', 'price_max', 'rating_filter'])).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link
        to={{
          pathname: URLs.productList,
          search: createSearchParams(omit(queryConfig, ['category'])).toString()
        }}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: URLs.productList,
                  search: createSearchParams({ ...queryConfig, category: categoryItem._id }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                  <polygon points='4 3.5 0 0 0 7' />
                </svg>
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <FormPriceFilter queryConfig={queryConfig} />
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
        onClick={handleRemoveFilter}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
