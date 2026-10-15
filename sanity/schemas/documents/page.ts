import {DocumentIcon} from '@sanity/icons/Document'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, slugField} from '../objects/helpers'
import {sectionTypes} from '../sections'

export default defineType({
  name: 'page',
  title: 'Side',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'content', title: 'Innhold', default: true},
    {name: 'seo', title: 'Deling og søk'},
  ],
  fields: [
    defineField({name: 'title', title: 'Tittel', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    {...slugField('title'), group: 'content'},
    imageField({title: 'Toppbilde (liggende)', group: 'content'}),
    defineField({
      name: 'sections',
      title: 'Innhold',
      type: 'array',
      group: 'content',
      description: 'Bygg siden av blokker. Dra for å endre rekkefølge.',
      of: sectionTypes.map((section) => defineArrayMember({type: section.name})),
      options: {
        insertMenu: {
          views: [{name: 'list'}],
        },
      },
    }),
    defineField({name: 'seo', title: 'Deling og søk', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', media: 'image'},
    prepare: ({title, slug, media}) => ({title, subtitle: slug ? `/${slug}` : undefined, media}),
  },
})
