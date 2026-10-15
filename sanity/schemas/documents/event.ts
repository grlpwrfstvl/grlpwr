import {StarIcon} from '@sanity/icons/Star'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {currentFestivalInitialValue, festivalReferenceField, formatOsloDateTime, imageField, slugField} from '../objects/helpers'

export const EVENT_CATEGORIES = [
  {title: 'Arrangement', value: 'event'},
  {title: 'Workshop', value: 'workshop'},
  {title: 'Fest', value: 'party'},
  {title: 'Samtale / bransje', value: 'talk'},
  {title: 'Visning', value: 'screening'},
]

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: StarIcon,
  initialValue: currentFestivalInitialValue,
  groups: [
    {name: 'content', title: 'Innhold', default: true},
    {name: 'program', title: 'Program'},
  ],
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    {...slugField('name'), group: 'content'},
    defineField({
      name: 'category',
      title: 'Type',
      type: 'string',
      group: 'content',
      initialValue: 'event',
      options: {list: EVENT_CATEGORIES, layout: 'radio', direction: 'horizontal'},
    }),
    imageField({title: 'Bilde (kvadratisk)', required: true, group: 'content'}),
    defineField({
      name: 'hideTitle',
      title: 'Skjul navnet på kortet',
      type: 'boolean',
      group: 'content',
      description: 'Slå på hvis bildet allerede har navnet i seg (f.eks. en plakat).',
    }),
    defineField({name: 'description', title: 'Beskrivelse', type: 'richText', group: 'content'}),
    defineField({
      name: 'link',
      title: 'Lenke til mer info',
      type: 'url',
      group: 'content',
      description: 'F.eks. Facebook-event eller billettside.',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Lenketekst',
      type: 'string',
      group: 'content',
      placeholder: 'Mer info',
      hidden: ({document}) => !document?.link,
    }),
    defineField({
      name: 'gallery',
      title: 'Bilder fra eventet',
      type: 'array',
      group: 'content',
      options: {layout: 'grid'},
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alternativ tekst', type: 'string'})],
        }),
      ],
    }),
    {...festivalReferenceField, group: 'program'},
    defineField({name: 'location', title: 'Sted', type: 'string', group: 'program', description: 'F.eks. «St. Croix-huset».'}),
    defineField({name: 'time', title: 'Starter', type: 'datetime', group: 'program', options: {timeStep: 15}}),
    defineField({
      name: 'endTime',
      title: 'Slutter',
      type: 'datetime',
      group: 'program',
      options: {timeStep: 15},
      validation: (rule) => rule.min(rule.valueOfField('time')).error('Kan ikke slutte før den starter'),
    }),
    defineField({
      name: 'showInProgram',
      title: 'Vis i programmet',
      type: 'boolean',
      group: 'program',
      initialValue: true,
    }),
  ],
  orderings: [{title: 'Tidspunkt', name: 'timeAsc', by: [{field: 'time', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', media: 'image', time: 'time', location: 'location', year: 'festival.year'},
    prepare: ({title, media, time, location, year}) => ({
      title,
      media,
      subtitle: [year, formatOsloDateTime(time), location].filter(Boolean).join(' · '),
    }),
  },
})
