import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {ImageIcon} from '@sanity/icons/Image'
import {ImagesIcon} from '@sanity/icons/Images'
import {LaunchIcon} from '@sanity/icons/Launch'
import {PlayIcon} from '@sanity/icons/Play'
import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField} from '../objects/helpers'

const toPlainText = (blocks?: {children?: {text?: string}[]}[]) =>
  blocks?.map((block) => block.children?.map((child) => child.text).join('')).join(' ')

export const textSection = defineType({
  name: 'textSection',
  title: 'Tekst',
  type: 'object',
  icon: BlockContentIcon,
  fields: [defineField({name: 'body', title: 'Tekst', type: 'blockContent'})],
  preview: {
    select: {body: 'body'},
    prepare: ({body}) => ({title: toPlainText(body) || 'Tekst', subtitle: 'Tekst'}),
  },
})

export const imageSection = defineType({
  name: 'imageSection',
  title: 'Bilde',
  type: 'object',
  icon: ImageIcon,
  fields: [
    imageField({required: true}),
    defineField({name: 'caption', title: 'Bildetekst', type: 'string'}),
    defineField({
      name: 'shape',
      title: 'Form',
      type: 'string',
      initialValue: 'blob',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'Boble (GRL PWR-stil)', value: 'blob'},
          {title: 'Vanlig', value: 'plain'},
        ],
      },
    }),
  ],
  preview: {select: {title: 'caption', media: 'image'}, prepare: ({title, media}) => ({title: title || 'Bilde', media})},
})

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Knapp / oppfordring',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({name: 'heading', title: 'Overskrift', type: 'string'}),
    defineField({name: 'text', title: 'Tekst', type: 'richText'}),
    defineField({name: 'buttonLabel', title: 'Knappetekst', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'link', title: 'Lenke', type: 'link', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'heading', subtitle: 'buttonLabel'}, prepare: ({title, subtitle}) => ({title: title || subtitle, subtitle: 'Knapp'})},
})

export const faqSection = defineType({
  name: 'faqSection',
  title: 'Spørsmål og svar',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'heading', title: 'Overskrift', type: 'string', initialValue: 'Ofte stilte spørsmål'}),
    defineField({
      name: 'items',
      title: 'Spørsmål',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', title: 'Spørsmål', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'answer', title: 'Svar', type: 'richText'}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'heading', items: 'items'}, prepare: ({title, items}) => ({title, subtitle: `${items?.length ?? 0} spørsmål`})},
})

export const lineupSection = defineType({
  name: 'lineupSection',
  title: 'Artistliste',
  type: 'object',
  icon: UsersIcon,
  description: 'Viser artistene for årets festival.',
  fields: [
    defineField({name: 'heading', title: 'Overskrift', type: 'string', initialValue: 'Årets artister'}),
    defineField({name: 'onlyHeadliners', title: 'Bare hovedartister', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title, subtitle: 'Artistliste'})},
})

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Bildegalleri',
  type: 'object',
  icon: ImagesIcon,
  fields: [defineField({name: 'gallery', title: 'Galleri', type: 'reference', to: [{type: 'gallery'}], validation: (rule) => rule.required()})],
  preview: {select: {title: 'gallery.name', media: 'gallery.images.0'}},
})

export const videoSection = defineType({
  name: 'videoSection',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({name: 'url', title: 'YouTube-lenke', type: 'url', validation: (rule) => rule.required()}),
    defineField({name: 'title', title: 'Tittel', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'url'}},
})

export const sectionTypes = [textSection, imageSection, ctaSection, faqSection, lineupSection, gallerySection, videoSection]
