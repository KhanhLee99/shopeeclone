import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'email_invalid'
    },
    minLength: {
      value: 5,
      message: 'email_length'
    },
    maxLength: {
      value: 160,
      message: 'email_length'
    }
  },
  password: {
    required: {
      value: true,
      message: 'required'
    },
    minLength: {
      value: 6,
      message: 'password_length'
    },
    maxLength: {
      value: 160,
      message: 'password_length'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'required'
    },
    maxLength: {
      value: 160,
      message: 'password_length'
    },
    minLength: {
      value: 6,
      message: 'password_length'
    },
    validate:
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'password_not_match' : undefined
  }
})

function confirmPasswordSchema(fieldRef: string) {
  return yup
    .string()
    .required('required')
    .min(6, 'password_length')
    .max(160, 'password_length')
    .oneOf([yup.ref(fieldRef)], 'password_not_match')
}

export const schema = yup.object({
  email: yup.string().required('required').email('email_invalid').min(5, 'email_length').max(160, 'email_length'),
  password: yup.string().required('required').min(6, 'password_length').max(160, 'password_length'),
  confirm_password: confirmPasswordSchema('password')
})

export const loginSchema = schema.omit(['confirm_password'])

export type RegisterSchemaType = yup.InferType<typeof schema>
export type LoginSchmaType = yup.InferType<typeof loginSchema>

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min && price_max) {
    return Number(price_min) <= Number(price_max)
  }
  return true
}

export const priceSchema = yup.object({
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'price_invalid',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'price_invalid',
    test: testPriceMinMax
  })
})

export const searchSchema = yup.object({
  search: yup.string().trim()
})

export const userSchema = yup.object({
  name: yup.string().trim().max(160, 'max length 160'),
  phone: yup.string().max(20, 'max_length_120'),
  address: yup.string().trim().max(160, 'max length 160'),
  avatar: yup.string().max(1000, 'max_length_1000'),
  date_of_birth: yup.date().max(new Date(), 'choose_past_date'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: confirmPasswordSchema('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type PriceSchemaType = yup.InferType<typeof priceSchema>
export type SearchSchemaType = yup.InferType<typeof searchSchema>
