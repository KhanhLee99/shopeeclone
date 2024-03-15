import classNames from 'classnames'
import { useNavigate, createSearchParams } from 'react-router-dom'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'

import { sortBy, order as orderConstant } from 'src/constants/product'
import URLs from 'src/constants/url'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

interface Props {
  queryConfig: QueryConfig
}

export default function SortProductList({ queryConfig }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const isActiveSortBy = (sortBy: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortBy
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: URLs.productList,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleChangeOrderPrice = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: URLs.productList,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>{t('sort by')}</div>
          <button
            onClick={() => handleSort(sortBy.view)}
            className={classNames('h-8 px-4 text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
          >
            {t('popular')}
          </button>
          <button
            onClick={() => handleSort(sortBy.createdAt)}
            className={classNames('h-8 px-4 text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
          >
            {t('latest')}
          </button>
          <button
            onClick={() => handleSort(sortBy.sold)}
            className={classNames('h-8 px-4 text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
          >
            {t('top sales')}
          </button>
          <select
            className={classNames('h-8  px-4 text-left text-sm capitalize  outline-none ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) =>
              handleChangeOrderPrice(event.target.value as Exclude<ProductListConfig['order'], undefined>)
            }
          >
            <option value='' disabled className='bg-white text-black'>
              {t('price')}
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              {t('price low to high')}
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              {t('price high to low')}
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}
