import classNames from 'classnames'
import { useNavigate, createSearchParams } from 'react-router-dom'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'
// import { useMediaQuery } from 'react-responsive'

import { sortBy, order as orderConstant } from 'src/constants/product'
import URLs from 'src/constants/url'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import Button from 'src/components/Button'
import themes from 'src/styles/themes'

interface Props {
  queryConfig: QueryConfig
}

export default function SortProductList({ queryConfig }: Props) {
  const { t } = useTranslation()
  // const tabletWidth = useMediaQuery({ minWidth: themes.breakpoint.md })
  const tabletWidth = true
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
    <div className='sticky top-[116px] z-20 bg-gray-100 px-3 py-4 shadow-sm'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='text-xs md:text-sm'>{t('sort by')}</div>
          <Button
            size={tabletWidth ? 'middle' : 'small'}
            onClick={() => handleSort(sortBy.view)}
            buttonType={isActiveSortBy(sortBy.view) ? 'primary' : 'secondary'}
            className='h-8 px-4 capitalize'
          >
            {t('popular')}
          </Button>
          <Button
            size={tabletWidth ? 'middle' : 'small'}
            onClick={() => handleSort(sortBy.createdAt)}
            buttonType={isActiveSortBy(sortBy.createdAt) ? 'primary' : 'secondary'}
            className='h-8 px-4 capitalize'
          >
            {t('latest')}
          </Button>
          <Button
            size={tabletWidth ? 'middle' : 'small'}
            onClick={() => handleSort(sortBy.sold)}
            buttonType={isActiveSortBy(sortBy.sold) ? 'primary' : 'secondary'}
            className='h-8 px-4 capitalize'
          >
            {t('top sales')}
          </Button>
          <select
            className={classNames('h-8  px-4 text-left text-xs capitalize outline-none md:text-sm', {
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
