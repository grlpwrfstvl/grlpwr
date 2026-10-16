import {defineDocuments, defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

// Tells the Presentation tool which page shows which document, and the reverse
export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {route: '/artists/:slug', filter: `_type == "artist" && slug.current == $slug`},
    {route: '/events/:slug', filter: `_type == "event" && slug.current == $slug`},
    {route: '/:slug', filter: `_type == "page" && slug.current == $slug`},
    {route: '/', filter: `_id == "siteSettings"`},
    {route: '/contact', filter: `_id == "siteSettings"`},
  ]),
  locations: {
    artist: defineLocations({
      select: {title: 'name', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {title: doc?.title || 'Artist', href: `/artists/${doc?.slug}`},
          {title: 'Artister', href: '/artists'},
          {title: 'Program', href: '/program'},
        ],
      }),
    }),
    event: defineLocations({
      select: {title: 'name', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {title: doc?.title || 'Event', href: `/events/${doc?.slug}`},
          {title: 'Events', href: '/events'},
          {title: 'Program', href: '/program'},
        ],
      }),
    }),
    page: defineLocations({
      select: {title: 'title', slug: 'slug.current'},
      resolve: (doc) => ({locations: [{title: doc?.title || 'Side', href: `/${doc?.slug}`}]}),
    }),
    news: defineLocations({locations: [{title: 'Forside', href: '/'}]}),
    gallery: defineLocations({locations: [{title: 'Galleri', href: '/gallery'}]}),
    festival: defineLocations({
      locations: [
        {title: 'Forside', href: '/'},
        {title: 'Program', href: '/program'},
      ],
    }),
    siteSettings: defineLocations({message: 'Brukes på alle sider', tone: 'positive', locations: [{title: 'Forside', href: '/'}]}),
  },
}
