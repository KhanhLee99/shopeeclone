import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { omit } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Button from 'src/components/Button'
import InputPassword from 'src/components/InputPassword'
import { UserSchema, userSchema } from 'src/utils/rule'
import userApi from 'src/apis/user.api'
import { isErrorUnprocessableEntity, renderErrorMessage } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema),
    shouldFocusError: false
  })

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      toast.success(data.data.message, { position: 'top-center', autoClose: 1000 })
      reset()
    }
  })

  const onSubmit = handleSubmit((data) => {
    // updateProfileMutation.mutate(omit(data, ['confirm_password']), {
    //   onError: (error) => {
    //     if (isErrorUnprocessableEntity<ErrorResponse<FormData>>(error)) {
    //       const formError = error.response?.data.data
    //       if (formError) {
    //         Object.keys(formError).forEach((key) => {
    //           setError(key as keyof FormData, {
    //             message: formError[key as keyof FormData],
    //             type: 'Server'
    //           })
    //         })
    //       }
    //     }
    //   }
    // })
    toast.error(t('cannot_change_password'))
  })

  const _renderErrorMessage = (field: keyof FormData) => {
    return renderErrorMessage<FormData>(errors, field)
  }

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <Helmet>
        <title>{t('my profile')} | Shopee Clone</title>
        <meta name='description' content='Trang thông tin cá nhân' />
      </Helmet>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('change password')}</h1>
        <div className='mt-1 text-sm text-gray-700'>{t('protect account')}</div>
      </div>
      <form className='mt-8 mr-auto max-w-3xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='relative mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[30%] sm:text-right'>{t('current password')}</div>
            <div className='sm:w-[70%] sm:pl-5'>
              <InputPassword
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='password'
                placeholder={t('current password') as string}
                errorMessage={_renderErrorMessage('password')}
                register={register}
              />
            </div>
          </div>
          <div className='relative mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[30%] sm:text-right'>{t('new password')}</div>
            <div className='sm:w-[70%] sm:pl-5'>
              <InputPassword
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='new_password'
                placeholder={t('new password') as string}
                errorMessage={_renderErrorMessage('new_password')}
                register={register}
              />
            </div>
          </div>
          <div className='relative mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[30%] sm:text-right'>{t('confirm password')}</div>
            <div className='sm:w-[70%] sm:pl-5'>
              <InputPassword
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='confirm_password'
                placeholder={t('confirm password') as string}
                errorMessage={_renderErrorMessage('confirm_password')}
                register={register}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[30%] sm:text-right' />
            <div className='sm:w-[70%] sm:pl-5'>
              <Button
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
                isLoading={updateProfileMutation.isPending}
                disabled={updateProfileMutation.isPending}
              >
                {t('save')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
