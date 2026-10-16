import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId} from './sanity/env'

export default defineCliConfig({
  api: {projectId, dataset},
  typegen: {
    path: './src/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
