import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { RegisterSchema, schema } from 'src/utils/Rules'
import Input from 'src/components/Input'

type FormData = RegisterSchema

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('data', data)
    console.log('password', getValues('password'))
  })

  console.log('errors', errors)

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                name='password'
                autoComplete='on'
                errorMessage={errors.password?.message}
                register={register}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                name='confirm_password'
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                register={register}
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
