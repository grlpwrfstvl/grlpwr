import { defineQuery } from "next-sanity";

// Images keep hotspot/crop for the URL builder, plus alt text and a blur placeholder
const IMAGE = /* groq */ `{
  asset,
  hotspot,
  crop,
  "alt": coalesce(alt, ""),
  "lqip": asset->metadata.lqip,
  "aspectRatio": asset->metadata.dimensions.aspectRatio
}`;

const HREF = /* groq */ `select(
  type == "route" => route,
  type == "external" => url,
  internal->_type == "artist" => "/artists/" + internal->slug.current,
  internal->_type == "event" => "/events/" + internal->slug.current,
  internal->_type == "page" => "/" + internal->slug.current
)`;

const FESTIVAL = /* groq */ `{
  _id,
  title,
  year,
  startDate,
  endDate,
  dateLabel,
  location,
  ticketStatus,
  ticketsLink
}`;

const CURRENT_FESTIVAL_ID = /* groq */ `*[_type == "siteSettings" && _id == "siteSettings"][0].currentFestival._ref`;

const ARTIST_CARD = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  image${IMAGE},
  headliner,
  time
}`;

const EVENT_CARD = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  image${IMAGE},
  hideTitle,
  category,
  time,
  location,
  "year": festival->year
}`;

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  title,
  description,
  image${IMAGE},
  "festival": currentFestival->${FESTIVAL},
  announcement{text, "href": link{"href": ${HREF}}.href},
  navigation[]{_key, label, "href": link{"href": ${HREF}}.href},
  socialLinks,
  credits[]{_key, role, name, url},
  sponsors[]{_key, name, url, logo${IMAGE}},
  contactIntro,
  contactEmail,
  seo{title, description, image${IMAGE}},
  primaryColor,
  secondaryColor,
  accentColor
}`);

export const HOME_QUERY = defineQuery(`{
  "lineup": *[_type == "artist" && festival._ref == ${CURRENT_FESTIVAL_ID}] | order(headliner desc, time asc)[0...6]${ARTIST_CARD},
  "news": *[_type == "news"] | order(coalesce(date, _createdAt) desc)[0...8]{
    _id,
    title,
    date,
    description,
    image${IMAGE},
    "href": link{"href": ${HREF}}.href
  }
}`);

export const ARTISTS_QUERY = defineQuery(`*[_type == "festival"] | order(year desc){
  _id,
  year,
  title,
  "artists": *[_type == "artist" && festival._ref == ^._id] | order(headliner desc, time asc)${ARTIST_CARD}
}[count(artists) > 0]`);

export const ARTIST_QUERY = defineQuery(`*[_type == "artist" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  image${IMAGE},
  description,
  headliner,
  time,
  endTime,
  instagram,
  spotify,
  video,
  "stage": stage->name,
  "festival": festival->${FESTIVAL},
  "more": *[_type == "artist" && festival._ref == ^.festival._ref && _id != ^._id] | order(time asc)[0...4]${ARTIST_CARD}
}`);

export const ARTIST_SLUGS_QUERY = defineQuery(`*[_type == "artist" && defined(slug.current)]{"slug": slug.current}`);

export const EVENTS_QUERY = defineQuery(`{
  "current": *[_type == "event" && festival._ref == ${CURRENT_FESTIVAL_ID}] | order(time asc)${EVENT_CARD},
  "past": *[_type == "event" && festival._ref != ${CURRENT_FESTIVAL_ID}] | order(time desc)${EVENT_CARD}
}`);

export const EVENT_QUERY = defineQuery(`*[_type == "event" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  image${IMAGE},
  category,
  description,
  link,
  linkLabel,
  location,
  time,
  endTime,
  gallery[]${IMAGE},
  "festival": festival->${FESTIVAL}
}`);

export const EVENT_SLUGS_QUERY = defineQuery(`*[_type == "event" && defined(slug.current)]{"slug": slug.current}`);

export const PROGRAM_QUERY = defineQuery(`*[
  _type in ["artist", "event"]
  && festival._ref == ${CURRENT_FESTIVAL_ID}
  && defined(time)
  && (_type == "artist" || showInProgram != false)
] | order(time asc){
  _id,
  _type,
  name,
  "slug": slug.current,
  time,
  endTime,
  headliner,
  category,
  "place": coalesce(stage->name, location)
}`);

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  image${IMAGE},
  seo{title, description, image${IMAGE}},
  sections[]{
    _key,
    _type,
    _type == "textSection" => {body},
    _type == "imageSection" => {image${IMAGE}, caption, shape},
    _type == "ctaSection" => {heading, text, buttonLabel, "href": link{"href": ${HREF}}.href},
    _type == "faqSection" => {heading, items[]{_key, question, answer}},
    _type == "lineupSection" => {
      heading,
      "artists": *[_type == "artist" && festival._ref == ${CURRENT_FESTIVAL_ID} && (!^.onlyHeadliners || headliner)] | order(headliner desc, time asc)${ARTIST_CARD}
    },
    _type == "gallerySection" => {"gallery": gallery->{name, images[]${IMAGE}}},
    _type == "videoSection" => {url, title}
  }
}`);

export const PAGE_SLUGS_QUERY = defineQuery(`*[_type == "page" && defined(slug.current)]{"slug": slug.current}`);

export const GALLERIES_QUERY = defineQuery(`*[_type == "gallery" && count(images) > 0] | order(coalesce(festival->year, 0) desc, name desc){
  _id,
  name,
  images[]${IMAGE}
}`);

export const SITEMAP_QUERY = defineQuery(`{
  "artists": *[_type == "artist" && defined(slug.current)]{"slug": slug.current, _updatedAt},
  "events": *[_type == "event" && defined(slug.current)]{"slug": slug.current, _updatedAt},
  "pages": *[_type == "page" && defined(slug.current)]{"slug": slug.current, _updatedAt}
}`);
