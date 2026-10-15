import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const ROUTES = [
  {title: 'Forside', value: '/'},
  {title: 'Artister', value: '/artists'},
  {title: 'Program', value: '/program'},
  {title: 'Events', value: '/events'},
  {title: 'Galleri', value: '/gallery'},
  {title: 'Kontakt', value: '/contact'},
]

export default defineType({
  name: 'link',
  title: 'Lenke',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Lenker til',
      type: 'string',
      initialValue: 'internal',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'Innhold på siden', value: 'internal'},
          {title: 'Fast side', value: 'route'},
          {title: 'Ekstern nettside', value: 'external'},
        ],
      },
    }),
    defineField({
      name: 'internal',
      title: 'Innhold',
      type: 'reference',
      to: [{type: 'artist'}, {type: 'event'}, {type: 'page'}],
      hidden: ({parent}) => parent?.type !== 'internal',
    }),
    defineField({
      name: 'route',
      title: 'Side',
      type: 'string',
      options: {list: ROUTES},
      hidden: ({parent}) => parent?.type !== 'route',
    }),
    defineField({
      name: 'url',
      title: 'Nettadresse',
      type: 'url',
      validation: (rule) => rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
      hidden: ({parent}) => parent?.type !== 'external',
    }),
  ],
})
