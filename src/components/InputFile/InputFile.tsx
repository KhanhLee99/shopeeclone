import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const MAX_SIZE_IMAGE_UPLOAD = 1048576 //bytes

export default function InputFile({ onChange }: { onChange?: (file?: File) => void }) {
  const { t } = useTranslation()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const handleUpload = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    inputFileRef.current?.click()
  }

  const onChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0]
    if (image && (image.size >= MAX_SIZE_IMAGE_UPLOAD || !image.type.includes('image'))) {
      toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
        position: 'top-center'
      })
    } else {
      onChange && onChange(image)
    }
  }
  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={inputFileRef}
        onChange={onChooseImage}
        onClick={(event) => ((event.target as any).value = null)}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        onClick={handleUpload}
      >
        {t('select image')}
      </button>
    </Fragment>
  )
}
