import clsx from 'clsx'

const ThemeSwitch: React.FC = () => (
  <figure
    className={clsx(
      'inline-block h-5 w-5 bg-current [mask-size:100%_100%]',
      `[mask:url(/light_mode.svg)] dark:[mask:url(/dark_mode.svg)]`
    )}
  />
)
export default ThemeSwitch
