import { Fragment, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
  InfiniteData,
  InfiniteQueryObserverBaseResult
} from '@tanstack/react-query'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useInView } from 'react-intersection-observer'

import productApi from 'src/apis/product.api'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import Pagination from 'src/components/Pagination'
import { Product as ProductType, ProductList as ProductListType, ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import empty from 'src/assets/empty.png'
import { SuccessResponse } from 'src/types/utils.type'
import { ProductSkeleton } from 'src/components/Skeleton'
import { WatchMode, WatchModeType } from 'src/constants/config'

export default function ProductList() {
  const { ref, inView } = useInView()
  const { t } = useTranslation()
  const queryConfig = useQueryConfig()

  const [watchMode, setWatchMode] = useState<WatchModeType>(WatchMode.pagination)
  const [pageSize, setPageSize] = useState(0)

  const productsQuery =
    watchMode === WatchMode.pagination
      ? useQuery({
          queryKey: ['products', queryConfig],
          queryFn: () => {
            return productApi.getProducts(queryConfig as ProductListConfig)
          },
          placeholderData: keepPreviousData,
          staleTime: 3 * 60 * 1000
        })
      : useInfiniteQuery({
          queryKey: ['products', queryConfig],
          queryFn: async ({ pageParam }) => {
            const res = await productApi.getProducts({ ...queryConfig, page: pageParam } as ProductListConfig)
            if (pageSize == 0) setPageSize(res.data.data.pagination.page_size)
            return res.data.data.products
          },
          initialPageParam: 1,
          getNextPageParam: (_, allPages) => {
            return allPages.length < pageSize ? allPages.length + 1 : undefined
          }
        })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  const helmet = (
    <Helmet>
      <title>{t('home')} | Shopee Clone</title>
      <meta name='description' content='Trang chủ dự án Shopee Clone' />
    </Helmet>
  )

  useEffect(() => {
    if (watchMode === WatchMode.scroll && inView && (productsQuery as InfiniteQueryObserverBaseResult).hasNextPage) {
      ;(productsQuery as InfiniteQueryObserverBaseResult).fetchNextPage()
    }
  }, [inView, watchMode])

  if (!productsQuery.data) return helmet

  const products =
    watchMode === WatchMode.pagination
      ? (productsQuery.data as AxiosResponse<SuccessResponse<ProductListType>, any>).data.data.products
      : (productsQuery.data as InfiniteData<ProductType[], unknown>).pages
  const isShowAsideFilter =
    products.length > 0 ||
    (products.length == 0 &&
      (queryConfig.price_min || queryConfig.price_max || queryConfig.rating_filter || queryConfig.category))

  return (
    <div className='bg-gray-200 py-6'>
      {helmet}
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
              {watchMode === WatchMode.pagination && (
                <Fragment>
                  <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {(products as ProductType[]).map((product) => (
                      <div className='col-span-1' key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                  <Pagination
                    queryConfig={queryConfig}
                    pageSize={
                      (productsQuery.data as AxiosResponse<SuccessResponse<ProductListType>, any>).data.data.pagination
                        .page_size
                    }
                  />
                </Fragment>
              )}
              {watchMode === WatchMode.scroll && (
                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {(products as ProductType[][]).map((page, i) => (
                    <Fragment key={i}>
                      {page.map((product, _i) => (
                        <div className='col-span-1' key={product._id}>
                          {page.length === _i + 1 ? (
                            <Product product={product} ref={ref} />
                          ) : (
                            <Product product={product} />
                          )}
                        </div>
                      ))}
                    </Fragment>
                  ))}
                  {(productsQuery as InfiniteQueryObserverBaseResult).isFetchingNextPage &&
                    Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div className='col-span-1 bg-white' key={index}>
                          <ProductSkeleton />
                        </div>
                      ))}
                </div>
              )}
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
