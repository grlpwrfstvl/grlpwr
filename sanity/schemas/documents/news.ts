import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {defineField, defineType} from 'sanity'
import {imageField} from '../objects/helpers'

export default defineType({
  name: 'news',
  title: 'Nyhet',
  type: 'document',
  icon: BulbOutlineIcon,
  description: 'Korte saker som vises på forsiden, f.eks. artistslipp.',
  fields: [
    defineField({name: 'title', title: 'Tittel', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'date',
      title: 'Publiseringsdato',
      type: 'date',
      description: 'Nyeste vises først på forsiden.',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    imageField({title: 'Bilde (kvadratisk)', required: true}),
    defineField({name: 'description', title: 'Tekst', type: 'richText'}),
    defineField({
      name: 'link',
      title: 'Lenke',
      type: 'link',
      description: 'Hvor kommer man når man trykker på saken? F.eks. artisten den handler om.',
    }),
  ],
  orderings: [{title: 'Nyeste først', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'date', media: 'image'}},
})
