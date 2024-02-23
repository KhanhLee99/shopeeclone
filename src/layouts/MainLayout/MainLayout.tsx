interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      MainLayout
      {children}
    </div>
  )
}
