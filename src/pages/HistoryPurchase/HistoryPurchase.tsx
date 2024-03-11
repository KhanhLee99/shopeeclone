import { createSearchParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import URLs from 'src/constants/url'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, pathToProductDetail } from 'src/utils/utils'
import noproduct from 'src/assets/no-product.png'
import { PurchaseSkeleton } from 'src/components/Skeleton'

const purchaseTabs = [
  { status: purchasesStatus.all, nameKey: 'all' },
  { status: purchasesStatus.waitForConfirmation, nameKey: 'to confirm' },
  { status: purchasesStatus.waitForGetting, nameKey: 'to ship' },
  { status: purchasesStatus.inProgress, nameKey: 'to receive' },
  { status: purchasesStatus.delivered, nameKey: 'completed' },
  { status: purchasesStatus.cancelled, nameKey: 'cancelled' }
]

export default function HistoryPurchase() {
  const { t } = useTranslation()
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchasesInCartData, isPending } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: URLs.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {t(`${tab.nameKey}`)}
    </Link>
  ))

  const isHasData = purchasesInCart && purchasesInCart.length > 0
  const isNoData = purchasesInCart && purchasesInCart.length == 0 && !isPending

  return (
    <div>
      <div className='overflow-x-auto'>
        <Helmet>
          <title>{t('my profile')} | Shopee Clone</title>
          <meta name='description' content='Trang thông tin cá nhân' />
        </Helmet>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {isPending &&
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <PurchaseSkeleton
                    key={index}
                    classNameWrap='mt-4 rounded-sm border-black/10 bg-white p-6 shadow-sm'
                  />
                ))}
            {isHasData &&
              purchasesInCart.map((purchase) => (
                <div
                  key={purchase._id}
                  className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'
                >
                  <Link
                    to={pathToProductDetail({ name: purchase.product.name, id: purchase.product._id })}
                    className='flex'
                  >
                    <div className='flex-shrink-0'>
                      <img
                        className='h-20 w-20 object-cover'
                        src={purchase.product.image}
                        alt={purchase.product.name}
                      />
                    </div>
                    <div className='ml-3 flex-grow overflow-hidden'>
                      <div className='truncate'>{purchase.product.name}</div>
                      <div className='mt-3'>x{purchase.buy_count}</div>
                    </div>
                    <div className='ml-3 flex-shrink-0'>
                      <span className='truncate text-gray-500 line-through'>
                        ₫{formatCurrency(purchase.product.price_before_discount)}
                      </span>
                      <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                    </div>
                  </Link>
                  <div className='flex justify-end'>
                    <div>
                      <span>{t('total price')}</span>
                      <span className='ml-4 text-xl text-orange'>
                        ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            {isNoData && (
              <div className='mt-[15px] flex h-[300px] flex-col items-center justify-center bg-white p-2'>
                <img src={noproduct} alt='no purchase' className='h-[160px] w-[160px]' />
                <div className='mt-3 capitalize'>{t('no order')}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
