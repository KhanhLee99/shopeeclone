import { useEffect, useContext, useState, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rule'
import userApi from 'src/apis/user.api'
import InputNumber from 'src/components/InputNumber'
import DateSelect from './DateSelect'
import { AppContext } from 'src/contexts/app.context'
import { saveProfileToLS } from 'src/utils/auth'
import { getAvatarUrl, renderErrorMessage } from 'src/utils/utils'
import InputFile from 'src/components/InputFile'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
export const DATE_DEFAULT = new Date(1990, 0, 1)

export default function Profile() {
  const { t } = useTranslation()
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const { setProfile } = useContext(AppContext)
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: DATE_DEFAULT
    },
    resolver: yupResolver(profileSchema),
    mode: 'onBlur'
  })

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      toast.success(data.data.message, { position: 'top-center', autoClose: 1000 })
    }
  })

  const updateAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  const { data, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = data?.data.data

  const avatar = watch('avatar')

  const isNotChangeForm = () => {
    const { name, phone, address, date_of_birth } = watch()
    return (
      profile &&
      name === profile.name &&
      phone === profile.phone &&
      address === profile.address &&
      avatar === profile.avatar &&
      date_of_birth?.toISOString() === profile.date_of_birth
    )
  }

  const isLoadingButtonSubmit = updateProfileMutation.isPending || updateAvatarMutation.isPending
  const isDisableButtonSubmit = isLoadingButtonSubmit || !isValid || isNotChangeForm()

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : DATE_DEFAULT)
    }
  }, [profile])

  const handleChangeFile = (image?: File) => {
    setFile(image)
    setValue('avatar', URL.createObjectURL(image as File))
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        const uploadRed = await updateAvatarMutation.mutateAsync(formData)
        avatarName = uploadRed.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        avatar: avatarName,
        date_of_birth: data.date_of_birth?.toISOString()
      })
      setProfile(res.data.data)
      saveProfileToLS(res.data.data)
      refetch()
    } catch (error) {
      console.log(error)
    }
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
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('my profile')}</h1>
        <div className='mt-1 text-sm text-gray-700'>{t('protect account')}</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('email')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('name')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='name'
                placeholder={t('name') as string}
                errorMessage={_renderErrorMessage('name')}
                setValue={setValue}
                register={register}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('phone')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      placeholder={t('phone') as string}
                      classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                      errorMessage={_renderErrorMessage('phone')}
                      {...field}
                      onChange={field.onChange}
                    />
                  )
                }}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('address')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                placeholder={t('address') as string}
                errorMessage={_renderErrorMessage('address')}
                setValue={setValue}
                register={register}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect
                errorMessage={_renderErrorMessage('date_of_birth')}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='h-9 rounded-sm px-5'
                type='submit'
                loading={isLoadingButtonSubmit}
                disabled={isDisableButtonSubmit}
              >
                {t('save')}
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage || getAvatarUrl(profile?.avatar)}
                alt=''
                className='h-full w-full rounded-full border border-black/10 object-cover'
              />
            </div>
            <InputFile onChange={handleChangeFile} />
            <div className='mt-3 text-gray-400'>
              <div>{t('file size max')}</div>
              <div>{t('file extension format')}</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
