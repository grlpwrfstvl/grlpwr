import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'Deling og søk',
  type: 'object',
  description: 'Hva som vises i Google og når lenken deles på sosiale medier. Tomt = bruker standardverdier.',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({name: 'title', title: 'Tittel', type: 'string', validation: (rule) => rule.max(60).warning('Hold tittelen under 60 tegn')}),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Hold beskrivelsen under 160 tegn'),
    }),
    defineField({name: 'image', title: 'Delingsbilde', type: 'image', description: 'Anbefalt 1200 × 630 px.'}),
  ],
})
