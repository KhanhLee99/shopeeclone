import classNames from 'classnames'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const RANGE = 2

export default function Pagination({ page, setPage, pageSize }: Props) {
  let dotBefore = false
  let dotAfter = false

  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true
      return (
        <button key={index} className='shadown-sm mx-2 rounded border bg-white px-3 py-2'>
          ...
        </button>
      )
    }
    return null
  }

  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true
      return (
        <button key={index} className='shadown-sm mx-2 rounded border bg-white px-3 py-2'>
          ...
        </button>
      )
    }
    return null
  }

  const renderPagination = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <button
            key={index}
            className={classNames('shadown-sm mx-2 cursor-pointer rounded border bg-white px-3 py-2', {
              'border-cyan-500': pageNumber == page,
              'border-transparent': pageNumber !== page
            })}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <button className='shadown-sm mx-2 cursor-pointer rounded border bg-white px-3 py-2'>Prev</button>
      {renderPagination()}
      <button className='shadown-sm mx-2 cursor-pointer rounded border bg-white px-3 py-2'>Next</button>
    </div>
  )
}
