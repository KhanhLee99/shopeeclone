import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { loginSchema, LoginSchmaType } from 'src/utils/rule'
import Input from 'src/components/Input'
import authApi from 'src/apis/auth.api'
import { isErrorUnprocessableEntity, renderErrorMessage } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import URLs from 'src/constants/url'
import Button from 'src/components/Button'
import useQueryParams from 'src/hooks/useQueryParams'

type FormData = LoginSchmaType

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const queryParams = useQueryParams()
  const next = queryParams.next || ''
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        if (next) {
          navigate(`${URLs.productList}${next}`)
        }
      },
      onError: (error) => {
        if (isErrorUnprocessableEntity<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) =>
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            )
          }
        }
      }
    })
  })

  const _renderErrorMessage = (field: keyof FormData) => {
    return renderErrorMessage<FormData>(errors, field)
  }

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>{t('login')} | Shopee Clone</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>{t('login')}</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                errorMessage={_renderErrorMessage('email')}
                register={register}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                name='password'
                autoComplete='on'
                errorMessage={_renderErrorMessage('password')}
                register={register}
              />
              <div className='mt-2'>
                <Button
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  {t('login')}
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>{t('dont have account')}</span>
                <Link className='ml-1 text-red-400' to={URLs.register}>
                  {t('sign up')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
