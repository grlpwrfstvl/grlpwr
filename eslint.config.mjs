import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  ...nextVitals,
  ...nextTs,
  {ignores: ['.next/**', 'node_modules/**', 'sanity.types.ts', 'schema.json']},
]

export default config
