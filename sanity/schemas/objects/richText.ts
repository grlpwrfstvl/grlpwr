import {defineArrayMember, defineField, defineType} from 'sanity'

const linkAnnotation = defineArrayMember({
  name: 'link',
  title: 'Lenke',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      title: 'Nettadresse',
      type: 'url',
      validation: (rule) => rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
    }),
  ],
})

/** Short formatted text: paragraphs, bold/italic, links and bullet lists. */
export const richText = defineType({
  name: 'richText',
  title: 'Tekst',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [{title: 'Punktliste', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Fet', value: 'strong'},
          {title: 'Kursiv', value: 'em'},
        ],
        annotations: [linkAnnotation],
      },
    }),
  ],
})

/** Long-form text for pages: headings, quotes and inline images. */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Innhold',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Overskrift', value: 'h2'},
        {title: 'Mellomtittel', value: 'h3'},
        {title: 'Sitat', value: 'blockquote'},
      ],
      lists: [
        {title: 'Punktliste', value: 'bullet'},
        {title: 'Nummerert liste', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Fet', value: 'strong'},
          {title: 'Kursiv', value: 'em'},
        ],
        annotations: [linkAnnotation],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alternativ tekst', type: 'string', validation: (rule) => rule.warning().required()}),
        defineField({name: 'caption', title: 'Bildetekst', type: 'string'}),
      ],
    }),
  ],
})
