import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    }),
    defineField({
      name: 'spotify',
      title: 'Spotify',
      type: 'url',
    }),

    defineField({
      name: 'image',
      title: 'Image',
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
        name: 'stage',
        title: 'Stage',
        type: 'string',
        options: {
          list: [
            {title: 'Tæps Scene', value: 'taeps'},
            {title: 'St. Croix Scene', value: 'stCroix'},
            {title: 'Klubbscenen', value: 'klubb'},
            {title: 'Kafescenen', value: 'kafe'}

          ], 
          layout: 'radio'
        }
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
