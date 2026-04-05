import React from 'react'

export default function ApiUrl({ path }) {
  const [origin, setOrigin] = React.useState('http://localhost:3000')

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location?.origin) {
      setOrigin(window.location.origin)
    }
  }, [])

  return (
    <pre>
      <code className="language-bash">{`${origin}${path}`}</code>
    </pre>
  )
}
