'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <button
        onClick={() => reset()}
        className="bg-primary text-primary-foreground px-4 py-2 rounded mb-4 hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
      <Link href="/" className="text-primary hover:underline">
        Go back home
      </Link>
    </div>
  )
}

