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
  'data-language': language,
  style,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const codeContainerRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const [debounced, setDebounced] = useState<NodeJS.Timeout>()
  const langTag = language === 'sh' ? 'shell session' : language

  const copyToTheClipboard = () => {
    if (codeContainerRef.current?.textContent) {
      navigator.clipboard.writeText(codeContainerRef.current.textContent)
    }
    setCopied(true)
    clearTimeout(debounced)
    setDebounced(setTimeout(() => setCopied(false), 600))
  }

  return (
    <div
      className={clsx(
        'group prose-pre:my-0 prose-pre:rounded-none my-8 overflow-hidden rounded-md',
        className
      )}
      style={style}
    >
      <div className="relative flex justify-between">
        <div className="bg-dn-surface-200 text-dn-color-200 rounded-br-md px-4 py-3 text-sm">
          {langTag}
        </div>
        <button
          className={clsx(
            'text-dn-color-200/90 invisible absolute top-0 right-0 m-2',
            'rounded border border-current p-2 opacity-0 duration-200',
            'group-hover:visible group-hover:opacity-100'
          )}
          onClick={copyToTheClipboard}
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
              width="14"
              height="14"
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
      <pre
        className={clsx(styles['code-container'], className)}
        ref={codeContainerRef}
        style={style}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
