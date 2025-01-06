import clsx from 'clsx'

const Container = ({
  'border-t': borderT,
  'border-r': borderR,
  'border-b': borderB,
  'border-l': borderL,
  children
}: {
  'border-t'?: boolean
  'border-r'?: boolean
  'border-b'?: boolean
  'border-l'?: boolean
  children: React.ReactNode
}) => (
  <div
    className={clsx(
      'border-ds-border',
      borderT && 'border-t',
      borderB && 'border-b'
    )}
  >
    <div
      className={clsx(
        'border-ds-border mx-auto h-full w-full max-w-screen-xl',
        borderR && 'md:border-r',
        borderL && 'md:border-l'
      )}
    >
      {children}
    </div>
  </div>
)

export default Container
