import {PinIcon} from '@sanity/icons/Pin'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stage',
  title: 'Scene',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'venue', title: 'Lokale', type: 'string', description: 'F.eks. «St. Croix-huset».'}),
  ],
  preview: {select: {title: 'name', subtitle: 'venue'}},
})
