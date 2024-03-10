import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { RegisterSchemaType, schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import authApi from 'src/apis/auth.api'
import { isErrorUnprocessableEntity, renderErrorMessage } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import URLs from 'src/constants/url'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

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
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                name='password'
                autoComplete='on'
                errorMessage={_renderErrorMessage('password')}
                register={register}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                name='confirm_password'
                autoComplete='on'
                errorMessage={_renderErrorMessage('confirm_password')}
                register={register}
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isPending}
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
