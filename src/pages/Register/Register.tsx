import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { RegisterSchemaType, schema } from 'src/utils/rule'
import Input from 'src/components/Input'
import authApi from 'src/apis/auth.api'
import { isErrorUnprocessableEntity, renderErrorMessage } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import URLs from 'src/constants/url'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import InputPassword from 'src/components/InputPassword'

type FormData = Omit<RegisterSchemaType, 'confirm_password'>

export default function Register() {
  const { t } = useTranslation()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(
      {
        email: data.email,
        password: data.password
      },
      {
        onSuccess: (data) => {
          setIsAuthenticated(true)
          setProfile(data.data.data.user)
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
      }
    )
  })

  const _renderErrorMessage = (field: keyof RegisterSchemaType) => {
    return renderErrorMessage<RegisterSchemaType>(errors, field)
  }

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>{t('sign up')} | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>{t('sign up')}</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                errorMessage={_renderErrorMessage('email')}
                register={register}
              />
              <InputPassword
                className='mt-2'
                classNameEye='top-[13px]'
                name='password'
                placeholder={t('password') as string}
                errorMessage={_renderErrorMessage('password')}
                register={register}
              />
              <InputPassword
                className='mt-2'
                classNameEye='top-[13px]'
                name='confirm_password'
                placeholder={t('confirm password') as string}
                errorMessage={_renderErrorMessage('confirm_password')}
                register={register}
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  block
                  className='px-2 py-4 uppercase'
                  loading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  {t('sign up')}
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>{t('have account')}</span>
                <Link className='ml-1 text-red-400' to={URLs.login}>
                  {t('login')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
