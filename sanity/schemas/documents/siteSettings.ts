import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField} from '../objects/helpers'

const hexColor = (title: string, description: string) =>
  defineField({
    name: title,
    title: description,
    type: 'string',
    group: 'theme',
    validation: (rule) => rule.regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, {name: 'hex'}).error('Bruk en hex-farge, f.eks. #e82265'),
  })

export default defineType({
  name: 'siteSettings',
  title: 'Innstillinger',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'festival', title: 'Festival', default: true},
    {name: 'home', title: 'Forside'},
    {name: 'menu', title: 'Meny'},
    {name: 'footer', title: 'Bunntekst'},
    {name: 'contact', title: 'Kontakt'},
    {name: 'seo', title: 'Deling og søk'},
    {name: 'theme', title: 'Farger'},
  ],
  fields: [
    defineField({name: 'title', title: 'Nettstedsnavn', type: 'string', group: 'festival', initialValue: 'GRL PWR FSTVL'}),
    defineField({
      name: 'currentFestival',
      title: 'Årets festival',
      type: 'reference',
      to: [{type: 'festival'}],
      group: 'festival',
      description:
        'Styrer forside, program, billettknapper og hvilke artister som er «årets». Bytt denne når neste festival skal annonseres – alt annet blir arkivert automatisk.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'announcement',
      title: 'Kunngjøring',
      type: 'object',
      group: 'festival',
      description: 'Valgfri stripe øverst på alle sider, f.eks. «Early bird-billetter ute nå!».',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'text', title: 'Tekst', type: 'string'}),
        defineField({name: 'link', title: 'Lenke', type: 'link'}),
      ],
    }),
    imageField({name: 'image', title: 'Forsidebilde', group: 'home'}),
    defineField({name: 'description', title: 'Introtekst', type: 'richText', group: 'home'}),
    defineField({
      name: 'navigation',
      title: 'Menypunkter',
      type: 'array',
      group: 'menu',
      description: 'Rekkefølgen her er rekkefølgen i menyen. Tom liste = standardmeny.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({name: 'label', title: 'Tekst', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'link', title: 'Lenke', type: 'link', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'link.route'}},
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosiale medier',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({name: 'instagram', title: 'Instagram', type: 'url'}),
        defineField({name: 'facebook', title: 'Facebook', type: 'url'}),
        defineField({name: 'tiktok', title: 'TikTok', type: 'url'}),
      ],
    }),
    defineField({
      name: 'credits',
      title: 'Folkene bak',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'credit',
          fields: [
            defineField({name: 'role', title: 'Rolle', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'name', title: 'Navn', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'Lenke', type: 'url'}),
          ],
          preview: {select: {title: 'name', subtitle: 'role'}},
        }),
      ],
    }),
    defineField({
      name: 'sponsors',
      title: 'Samarbeidspartnere',
      type: 'array',
      group: 'footer',
      description: 'Bruk hvite logoer med gjennomsiktig bakgrunn (PNG eller SVG).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sponsor',
          fields: [
            defineField({name: 'name', title: 'Navn', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'logo', title: 'Logo', type: 'image', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'Nettside', type: 'url'}),
          ],
          preview: {select: {title: 'name', media: 'logo'}},
        }),
      ],
    }),
    defineField({name: 'contactIntro', title: 'Introtekst på kontaktsiden', type: 'richText', group: 'contact'}),
    defineField({name: 'contactEmail', title: 'E-postadresse', type: 'string', group: 'contact', validation: (rule) => rule.email()}),
    defineField({name: 'seo', title: 'Standard for deling og søk', type: 'seo', group: 'seo'}),
    hexColor('primaryColor', 'Hovedfarge (rosa)'),
    hexColor('secondaryColor', 'Sekundærfarge (grønn)'),
    hexColor('accentColor', 'Aksentfarge (lys rosa)'),
  ],
  preview: {prepare: () => ({title: 'Innstillinger'})},
})
