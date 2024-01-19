import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'image',
      title: 'Image (Kvadrat)',
      type: 'image',
      options: { hotspot: true},
      fields:[
        {
          name: 'alt',
          title: 'Alt',
          type: 'string'
        }
      ]
      }),  
      defineField({
        name: 'location',
        title: 'Location',
        type: 'string',
      }),    
    defineField({
        name: 'time',
        title: 'Time',
        type: 'datetime',
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
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
