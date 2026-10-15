import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'festival',
  title: 'Festival',
  type: 'document',
  icon: CalendarIcon,
  description: 'Ett dokument per festivalår. Velg hvilket som er «årets festival» under Innstillinger.',
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      type: 'string',
      description: 'F.eks. «GRL PWR FSTVL 2027».',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'År',
      type: 'number',
      validation: (rule) => rule.required().integer().min(2020).max(2100),
    }),
    defineField({
      name: 'startDate',
      title: 'Første festivaldag',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Siste festivaldag',
      type: 'date',
      validation: (rule) =>
        rule.required().custom((endDate, {document}) => {
          const start = document?.startDate as string | undefined
          return !start || !endDate || endDate >= start ? true : 'Siste dag kan ikke være før første dag'
        }),
    }),
    defineField({
      name: 'dateLabel',
      title: 'Datotekst (valgfritt)',
      type: 'string',
      description: 'Overstyr hvordan datoene vises, f.eks. «8.–9. mai». Tomt = lages automatisk fra datoene.',
    }),
    defineField({
      name: 'location',
      title: 'Sted',
      type: 'string',
      initialValue: 'Fredrikstad',
    }),
    defineField({
      name: 'ticketStatus',
      title: 'Billettstatus',
      type: 'string',
      initialValue: 'soon',
      options: {
        layout: 'radio',
        list: [
          {title: 'Kommer snart', value: 'soon'},
          {title: 'I salg', value: 'onSale'},
          {title: 'Utsolgt', value: 'soldOut'},
        ],
      },
    }),
    defineField({
      name: 'ticketsLink',
      title: 'Billettlenke',
      type: 'url',
      description: 'Brukes på «Kjøp billetter»-knappene på hele siden.',
      hidden: ({document}) => document?.ticketStatus === 'soon',
      validation: (rule) =>
        rule.custom((value, {document}) =>
          document?.ticketStatus === 'onSale' && !value ? 'Legg inn billettlenke når billettene er i salg' : true,
        ),
    }),
  ],
  orderings: [{title: 'Nyeste først', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', year: 'year', start: 'startDate', end: 'endDate', status: 'ticketStatus'},
    prepare: ({title, year, start, end, status}) => ({
      title: title || String(year ?? 'Ny festival'),
      subtitle: [start && end ? `${start} → ${end}` : null, status === 'onSale' ? 'Billetter i salg' : null]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
