import {createClient, groq} from "next-sanity";
import clientConfig from "./config/client-config";
import { Artist } from "../types/Artist";
import { Home } from "../types/Home";
import { Page } from "../types/Page";
import { News } from "../types/News";
import { Workshop } from "../types/Workshop";
import { Eventer } from "../types/Eventer";

export async function getHome(): Promise<Home[]> {
  return createClient(clientConfig).fetch(

      groq`*[_type == "home"]{
          _id,
          _createdAt,
          name,
          "image": image.asset->url,
          description,
      }`
  )
}

async function createClientAndFetch(query: string): Promise<Page[]> {
  try {
    const client = createClient(clientConfig);
    const pages = await client.fetch(groq`${query}`);
    return pages;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getPages(): Promise<Page[]> {
  const query = `*[_type == "page"]{
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    description,
  }`;

  try {
    const pages = await createClientAndFetch(query);
    console.log('Pages:', pages);
    return pages;
  } catch (error) {
    throw error;
  }
}



export async function getArtists(): Promise<Artist[]> {
  try {
    const sanityClient = createClient(clientConfig);

    const query = groq`*[_type == "artist"]{
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

    const artists = await sanityClient.fetch(query);

    if (!artists || !Array.isArray(artists)) {
      throw new Error('Invalid or empty response from Sanity.io');
    }

    return artists;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
}

export async function getArtist(slug: string): Promise<Artist> {
  return createClient(clientConfig).fetch(
      groq`*[_type == "artist" && slug.current == $slug][0]{
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
      }`,
      { slug }
  )
}

export async function getWorkshops(): Promise<Workshop[]> {
  try {
    const sanityClient = createClient(clientConfig);

    const query = groq`*[_type == "workshop"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      location,
      time,
      description
    }`;

    const workshops = await sanityClient.fetch(query);

    if (!workshops || !Array.isArray(workshops)) {
      throw new Error('Invalid or empty response from Sanity.io');
    }

    return workshops;
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }
}

export async function getWorkshop(slug: string): Promise<Workshop> {
  return createClient(clientConfig).fetch(
      groq`*[_type == "workshop" && slug.current == $slug][0]{
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          "image": image.asset->url,
          location,
          time,
          description
      }`,
      { slug }
  )
}

export async function getAllEventer(): Promise<Eventer[]> {
  try {
    const sanityClient = createClient(clientConfig);

    const query = groq`*[_type == "eventer"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      location,
      time,
      description
    }`;

    const allEventer = await sanityClient.fetch(query);

    if (!allEventer || !Array.isArray(allEventer)) {
      throw new Error('Invalid or empty response from Sanity.io');
    }

    return allEventer;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getEvent(slug: string): Promise<Eventer> {
  return createClient(clientConfig).fetch(
      groq`*[_type == "eventer" && slug.current == $slug][0]{
          _id,
          _createdAt,
          name,
          "slug": slug.current,
          "image": image.asset->url,
          location,
          time,
          description
      }`,
      { slug }
  )
}

export async function getNews(): Promise<News[]> {
  try {
    const sanityClient = createClient(clientConfig);

    const query = groq`*[_type == "news"]{
      _id,
      _createdAt,
      title,
      date,
      description,
      "image": image.asset->url,
    }`;

    const news = await sanityClient.fetch(query);

    if (!news || !Array.isArray(news)) {
      throw new Error('Invalid or empty response from Sanity.io');
    }

    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}


