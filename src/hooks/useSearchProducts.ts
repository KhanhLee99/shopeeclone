import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'

import useQueryConfig from './useQueryConfig'
import { searchSchema, SearchSchemaType } from 'src/utils/rules'
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
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.search
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.search
        }
    navigate({
      pathname: URLs.productList,
      search: createSearchParams(config).toString()
    })
  })

  useEffect(() => {
    if (!queryConfig.name) {
      reset()
    }
  }, [queryConfig.name])

  return { onSubmitSearch, register }
}
