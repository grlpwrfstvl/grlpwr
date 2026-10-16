import {ImagesIcon} from '@sanity/icons/Images'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galleri',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'festival', title: 'Festival', type: 'reference', to: [{type: 'festival'}]}),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      description: 'Dra inn mange bilder samtidig. Rekkefølgen her er rekkefølgen på siden.',
      options: {layout: 'grid'},
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alternativ tekst', type: 'string'})],
        }),
      ],
    }),
  ],
  orderings: [{title: 'Nyeste først', name: 'yearDesc', by: [{field: 'festival.year', direction: 'desc'}]}],
  preview: {
    select: {title: 'name', media: 'images.0', images: 'images'},
    prepare: ({title, media, images}) => ({title, media, subtitle: `${images?.length ?? 0} bilder`}),
  },
})
