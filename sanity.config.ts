import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {resolve} from './sanity/presentation'
import {apiVersion, dataset, projectId, studioUrl} from './sanity/env'
import schemas from './sanity/schemas'
import {SINGLETONS, structure} from './sanity/structure'

export default defineConfig({
  projectId,
  dataset,
  title: 'GRL PWR',
  basePath: studioUrl,
  plugins: [
    structureTool({structure}),
    presentationTool({
      title: 'Forhåndsvisning',
      resolve,
      previewUrl: {previewMode: {enable: '/api/draft-mode/enable'}},
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  schema: {
    types: schemas,
    // Singletons can't be created from the "+" menu
    templates: (templates) => [
      ...templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
      // Used by "Per festival" lists so new documents land in the festival you're browsing
      ...['artist', 'event'].map((schemaType) => ({
        id: `${schemaType}-by-festival`,
        title: 'I denne festivalen',
        schemaType,
        parameters: [{name: 'festivalId', type: 'string'}],
        value: ({festivalId}: {festivalId: string}) => ({festival: {_type: 'reference', _ref: festivalId}}),
      })),
    ],
  },
  document: {
    // ...nor duplicated or deleted
    actions: (actions, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
