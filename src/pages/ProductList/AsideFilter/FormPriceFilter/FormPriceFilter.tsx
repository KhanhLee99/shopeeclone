import { useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omitBy } from 'lodash'

import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
import URLs from 'src/constants/url'
import { priceSchema, PriceSchema } from 'src/utils/rules'

type FormData = PriceSchema

export default function FormPriceFilter({ queryConfig }: { queryConfig: QueryConfig }) {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: queryConfig.price_min || '',
      price_max: queryConfig.price_max || ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  useEffect(() => {
    const { price_min, price_max } = queryConfig
    if (!price_min && !price_max) {
      reset()
    }
  }, [queryConfig.price_min, queryConfig.price_max])

  const onSubmit = handleSubmit((data) => {
    const { price_min = '', price_max = '' } = data

    navigate({
      pathname: URLs.productList,
      search: createSearchParams(
        omitBy(
          {
            ...queryConfig,
            price_min,
            price_max
          },
          (value) => value === ''
        )
      ).toString()
    })
  })
  return (
    <form className='mt-2' onSubmit={onSubmit}>
      <div className='flex items-start'>
        <Controller
          control={control}
          name='price_min'
          render={({ field }) => {
            return (
              <InputNumber
                type='text'
                className='grow'
                placeholder='₫ TỪ'
                classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                classNameError='hidden'
                // {...field}
                value={field.value}
                ref={field.ref}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('price_max')
                }}
              />
            )
          }}
        />
        <div className='mx-2 mt-2 shrink-0'>-</div>
        <Controller
          control={control}
          name='price_max'
          render={({ field }) => {
            return (
              <InputNumber
                type='text'
                className='grow'
                placeholder='₫ ĐẾN'
                classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                classNameError='hidden'
                // {...field}
                value={field.value}
                ref={field.ref}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('price_min')
                }}
              />
            )
          }}
        />
      </div>
      <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
      <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
        Áp dụng
      </Button>
    </form>
  )
}
