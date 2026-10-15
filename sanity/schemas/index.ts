import artist from './documents/artist'
import event from './documents/event'
import festival from './documents/festival'
import gallery from './documents/gallery'
import news from './documents/news'
import page from './documents/page'
import siteSettings from './documents/siteSettings'
import stage from './documents/stage'
import link from './objects/link'
import {blockContent, richText} from './objects/richText'
import seo from './objects/seo'
import {sectionTypes} from './sections'

const schemas = [
  siteSettings,
  festival,
  artist,
  event,
  stage,
  news,
  page,
  gallery,
  link,
  seo,
  richText,
  blockContent,
  ...sectionTypes,
]

export default schemas
