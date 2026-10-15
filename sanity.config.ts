import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import schemas from './sanity/schemas'
import {apiVersion, dataset, projectId, studioUrl} from './sanity/env'

export default defineConfig({
  projectId,
  dataset,
  title: 'GRL PWR',
  basePath: studioUrl,
  plugins: [structureTool()],
  schema: {types: schemas},
})

export {apiVersion}
