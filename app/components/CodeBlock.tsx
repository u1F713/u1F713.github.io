'use client'

import clsx from 'clsx'
import { useRef, useState } from 'react'
import styles from './CodeBlock.module.css'

type CodeBlockProps = React.ComponentProps<'pre'> & {
  'data-language': string
  'data-hide-line-numbers': boolean
  children: React.ReactNode
}

export default function CodeBlock({
  // 'data-language': metaLanguage,
  style,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const codeContainerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [debounced, setDebounced] = useState<NodeJS.Timeout>()

  const copyToTheClipboard = () => {
    if (codeContainerRef.current?.textContent) {
      navigator.clipboard.writeText(codeContainerRef.current.textContent)
    }
    setCopied(true)
    clearTimeout(debounced)
    setDebounced(setTimeout(() => setCopied(false), 600))
  }

  return (
    <pre className={clsx(className, 'group')} style={style} {...props}>
      <div className="relative flex justify-between">
        <button
          className={clsx(
            'text-dn-color-200/70 invisible absolute top-0 right-0 lg:-right-2',
            'rounded border border-current p-2 opacity-0 duration-200',
            'group-hover:visible group-hover:opacity-100'
          )}
          onClick={copyToTheClipboard}
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>
      <div className={styles['code-container']} ref={codeContainerRef}>
        {children}
      </div>
    </pre>
  )
}
