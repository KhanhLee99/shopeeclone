import { useQuery, keepPreviousData } from '@tanstack/react-query'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import productApi from 'src/apis/product.api'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import empty from 'src/assets/empty.png'

export default function ProductList() {
  const { t } = useTranslation()
  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  if (!productsData) return null
  const products = productsData.data.data.products
  const isShowAsideFilter =
    products.length > 0 ||
    (products.length == 0 &&
      (queryConfig.price_min || queryConfig.price_max || queryConfig.rating_filter || queryConfig.category))
  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{t('home')} | Shopee Clone</title>
        <meta name='description' content='Trang chủ dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          {isShowAsideFilter && (
            <div className='col-span-3'>
              <AsideFilter queryConfig={{ ...queryConfig, page: '1' }} categories={categoriesData?.data.data || []} />
            </div>
          )}
          {products.length > 0 && (
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          )}
          {products.length == 0 && (
            <div
              className={classNames({
                'col-span-9': isShowAsideFilter,
                'col-span-12': !isShowAsideFilter
              })}
            >
              <div className='flex h-[500px] flex-col items-center justify-center  p-2'>
                <img src={empty} alt='no purchase' className='h-[160px] w-[160px]' />
                <div className='mt-3 capitalize'>{t('no_result_found')}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
