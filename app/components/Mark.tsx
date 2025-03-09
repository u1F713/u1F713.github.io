import clsx from 'clsx'

type MarkProps = React.HTMLAttributes<HTMLDivElement>

const Mark: React.FC<MarkProps> = ({ className, children, ...props }) => {
  return (
    <mark
      {...props}
      className={clsx(
        'relative bg-inherit text-inherit',
        'after:absolute after:bottom-0 after:left-0 after:-z-1 after:block',
        'after:h-2/5 after:w-full after:bg-fuchsia-500 after:duration-50',
        'hover:after:h-full',
        className
      )}
    >
      {children}
    </mark>
  )
}

export default Mark
