import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'

import useQueryConfig from './useQueryConfig'
import { searchSchema, SearchSchemaType } from 'src/utils/rule'
import URLs from 'src/constants/url'

type FormData = SearchSchemaType

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      search: queryConfig.name || ''
    },
    resolver: yupResolver(searchSchema)
  })
  const navigate = useNavigate()

  const onSubmitSearch = handleSubmit((data) => {
    const config = data.search
      ? {
          ...queryConfig,
          name: data.search
        }
      : omit(
          {
            ...queryConfig
          },
          ['name']
        )
    navigate({
      pathname: URLs.productList,
      search: createSearchParams(omit(config, ['category', 'price_min', 'price_max', 'rating_filter'])).toString() // remove filter
    })
  })

  useEffect(() => {
    if (!queryConfig.name) {
      reset({
        search: ''
      })
    }
  }, [queryConfig.name])

  return { onSubmitSearch, register }
}
