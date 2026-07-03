import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'ticketsLink',
      title: 'Tickets Link',
      type: 'string',
      description: 'URL for the "Kjøp billetter" button across the site.',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'string',
    }),
    defineField({
      name: 'eventYear',
      title: 'Festival year',
      type: 'number',
      description: 'e.g. 2026',
    }),
    defineField({
      name: 'eventLocation',
      title: 'Festival location',
      type: 'string',
      description: 'City name shown on the home page, e.g. "Fredrikstad".',
    }),
    defineField({
      name: 'eventDates',
      title: 'Festival dates (display text)',
      type: 'string',
      description: 'Date range shown on the home page, e.g. "8. - 9. mai".',
    }),
    defineField({
      name: 'festivalDays',
      title: 'Festival days',
      type: 'array',
      description: 'One entry per day. Used to build the Program page.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'dayName',     title: 'Day name',         type: 'string', description: 'e.g. Fredag' }),
            defineField({ name: 'displayDate', title: 'Display date',     type: 'string', description: 'e.g. 8. mai' }),
            defineField({ name: 'dayOfMonth',  title: 'Day of month',     type: 'number', description: 'e.g. 8' }),
          ],
          preview: {
            select: { title: 'dayName', subtitle: 'displayDate' },
          },
        },
      ],
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary colour (grlPink)',
      type: 'string',
      description: 'Hex value, e.g. #e82265. Overrides the default brand pink across the entire site.',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary colour (grlGreen)',
      type: 'string',
      description: 'Hex value, e.g. #039645.',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent colour (lightPink)',
      type: 'string',
      description: 'Hex value, e.g. #f8b9ce. Used as footer background and accents.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
