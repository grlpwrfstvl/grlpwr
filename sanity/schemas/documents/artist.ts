import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'
import {currentFestivalInitialValue, festivalReferenceField, formatOsloDateTime, imageField, slugField} from '../objects/helpers'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  icon: UsersIcon,
  initialValue: currentFestivalInitialValue,
  groups: [
    {name: 'content', title: 'Innhold', default: true},
    {name: 'program', title: 'Program'},
    {name: 'links', title: 'Lenker og musikk'},
  ],
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    {...slugField('name'), group: 'content'},
    imageField({title: 'Bilde (kvadratisk)', required: true, group: 'content'}),
    defineField({name: 'description', title: 'Om artisten', type: 'richText', group: 'content'}),
    defineField({
      name: 'headliner',
      title: 'Hovedartist',
      type: 'boolean',
      group: 'content',
      description: 'Vises først på forsiden og i artistlisten.',
      initialValue: false,
    }),
    {...festivalReferenceField, group: 'program'},
    defineField({name: 'stage', title: 'Scene', type: 'reference', to: [{type: 'stage'}], group: 'program'}),
    defineField({
      name: 'time',
      title: 'Starter',
      type: 'datetime',
      group: 'program',
      description: 'Tomt = vises som «tidspunkt kommer».',
      options: {timeStep: 15},
    }),
    defineField({
      name: 'endTime',
      title: 'Slutter',
      type: 'datetime',
      group: 'program',
      options: {timeStep: 15},
      validation: (rule) => rule.min(rule.valueOfField('time')).error('Kan ikke slutte før den starter'),
    }),
    defineField({name: 'instagram', title: 'Instagram', type: 'url', group: 'links'}),
    defineField({
      name: 'spotify',
      title: 'Spotify',
      type: 'url',
      group: 'links',
      description: 'Lenke til artistsiden på Spotify. Brukes også til å vise en avspiller.',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'url',
      group: 'links',
      description: 'YouTube-lenke, f.eks. en musikkvideo. Vises på artistsiden.',
    }),
  ],
  orderings: [
    {title: 'Spilletid', name: 'timeAsc', by: [{field: 'time', direction: 'asc'}]},
    {title: 'Navn', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', media: 'image', time: 'time', stage: 'stage.name', year: 'festival.year', headliner: 'headliner'},
    prepare: ({title, media, time, stage, year, headliner}) => ({
      title: headliner ? `★ ${title}` : title,
      media,
      subtitle: [year, formatOsloDateTime(time), stage].filter(Boolean).join(' · '),
    }),
  },
})
