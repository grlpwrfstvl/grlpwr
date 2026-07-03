import { groq } from "next-sanity";
import { sanityClient } from "./client";
import type { Artist } from "../../../types/Artist";
import type { Home } from "../../../types/Home";
import type { Page } from "../../../types/Page";
import type { News } from "../../../types/News";
import type { Workshop } from "../../../types/Workshop";
import type { Eventer } from "../../../types/Eventer";
import type { Gallery } from "../../../types/Gallery";

const HOME_QUERY = groq`*[_type == "home"]{
  _id,
  _createdAt,
  name,
  "image": image.asset->url,
  "logo": image.asset->url,
  description,
  ticketsLink,
  video,
  eventYear,
  eventLocation,
  eventDates,
  festivalDays[]{_key, dayName, displayDate, dayOfMonth},
  primaryColor,
  secondaryColor,
  accentColor,
}`;

const PAGES_QUERY = groq`*[_type == "page"]{
  _id,
  _createdAt,
  title,
  link,
  "slug": slug.current,
  "image": image.asset->url,
  content,
}`;

const PAGE_BY_SLUG_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  link,
  "image": image.asset->url,
  "slug": slug.current,
  content,
}`;

const ARTISTS_QUERY = groq`*[_type == "artist"]{
  _id,
  _createdAt,
  name,
  "slug": slug.current,
  instagram,
  spotify,
  "image": image.asset->url,
  stage,
  time,
  description
}`;

const ARTIST_BY_SLUG_QUERY = groq`*[_type == "artist" && slug.current == $slug][0]{
  _id,
  _createdAt,
  name,
  "slug": slug.current,
  instagram,
  spotify,
  "image": image.asset->url,
  stage,
  time,
  description
}`;

const WORKSHOPS_QUERY = groq`*[_type == "workshop"]{
  _id,
  _createdAt,
  name,
  link,
  "slug": slug.current,
  "image": image.asset->url,
  location,
  time,
  description
}`;

const WORKSHOP_BY_SLUG_QUERY = groq`*[_type == "workshop" && slug.current == $slug][0]{
  _id,
  _createdAt,
  name,
  hideTitle,
  link,
  "slug": slug.current,
  "image": image.asset->url,
  location,
  time,
  description
}`;

const EVENTS_QUERY = groq`*[_type == "event"]{
  _id,
  _createdAt,
  name,
  hideTitle,
  link,
  "slug": slug.current,
  "image": image.asset->url,
  location,
  time,
  description,
}`;

const EVENT_BY_SLUG_QUERY = groq`*[_type == "event" && slug.current == $slug][0]{
  _id,
  _createdAt,
  name,
  link,
  "slug": slug.current,
  "image": image.asset->url,
  gallery[],
  location,
  time,
  description
}`;

const NEWS_QUERY = groq`*[_type == "news"]{
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  date,
  description,
  "image": image.asset->url,
}`;

const GALLERIES_QUERY = groq`*[_type == "gallery"]{
  _id,
  _createdAt,
  name,
  images[],
}`;

export async function getHome(): Promise<Home[]> {
  return sanityClient.fetch(HOME_QUERY);
}

export async function getPages(): Promise<Page[]> {
  return sanityClient.fetch(PAGES_QUERY);
}

export async function getPage(slug: string): Promise<Page | null> {
  return sanityClient.fetch(PAGE_BY_SLUG_QUERY, { slug });
}

export async function getArtists(): Promise<Artist[]> {
  return sanityClient.fetch(ARTISTS_QUERY);
}

export async function getArtist(slug: string): Promise<Artist | null> {
  return sanityClient.fetch(ARTIST_BY_SLUG_QUERY, { slug });
}

export async function getWorkshops(): Promise<Workshop[]> {
  return sanityClient.fetch(WORKSHOPS_QUERY);
}

export async function getWorkshop(slug: string): Promise<Workshop | null> {
  return sanityClient.fetch(WORKSHOP_BY_SLUG_QUERY, { slug });
}

export async function getEvents(): Promise<Eventer[]> {
  return sanityClient.fetch(EVENTS_QUERY);
}

export async function getEvent(slug: string): Promise<Eventer | null> {
  return sanityClient.fetch(EVENT_BY_SLUG_QUERY, { slug });
}

export async function getNews(): Promise<News[]> {
  return sanityClient.fetch(NEWS_QUERY);
}

export async function getGalleries(): Promise<Gallery[]> {
  return sanityClient.fetch(GALLERIES_QUERY);
}
