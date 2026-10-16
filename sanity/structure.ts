import {CalendarIcon} from '@sanity/icons/Calendar'
import {CogIcon} from '@sanity/icons/Cog'
import {ImagesIcon} from '@sanity/icons/Images'
import {StarIcon} from '@sanity/icons/Star'
import {UsersIcon} from '@sanity/icons/Users'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

export const SINGLETONS = ['siteSettings']

/** "Artister" → "Per festival" → 2027 → artists of that festival. */
function perFestival(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title('Per festival')
    .icon(CalendarIcon)
    .child(
      S.documentTypeList('festival')
        .title(`${title} per festival`)
        .defaultOrdering([{field: 'year', direction: 'desc'}])
        .child((festivalId) =>
          S.documentList()
            .title(title)
            .schemaType(type)
            .filter('_type == $type && festival._ref == $festivalId')
            .params({type, festivalId})
            .defaultOrdering([{field: 'time', direction: 'asc'}])
            .initialValueTemplates([S.initialValueTemplateItem(`${type}-by-festival`, {festivalId})]),
        ),
    )
}

function groupedByFestival(S: StructureBuilder, type: string, title: string, icon: typeof StarIcon) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items([
          perFestival(S, type, title),
          S.listItem()
            .title(`Alle ${title.toLowerCase()}`)
            .icon(icon)
            .child(S.documentTypeList(type).title(title).defaultOrdering([{field: 'time', direction: 'desc'}])),
          S.listItem()
            .title('Mangler festival')
            .child(
              S.documentList()
                .title('Mangler festival')
                .schemaType(type)
                .filter('_type == $type && !defined(festival)')
                .params({type}),
            ),
        ]),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Innstillinger')
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Innstillinger')),
      S.documentTypeListItem('festival').title('Festivaler'),
      S.divider(),
      groupedByFestival(S, 'artist', 'Artister', UsersIcon),
      groupedByFestival(S, 'event', 'Events', StarIcon),
      S.documentTypeListItem('stage').title('Scener'),
      S.divider(),
      S.documentTypeListItem('news').title('Nyheter'),
      S.documentTypeListItem('page').title('Sider'),
      S.documentTypeListItem('gallery').title('Gallerier').icon(ImagesIcon),
    ])
