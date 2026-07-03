import { PortableTextBlock } from "sanity";

export type FestivalDay = {
  _key: string;
  dayName: string;
  displayDate: string;
  dayOfMonth: number;
};

export type Home = {
  _id: string;
  _createdAt: Date;
  title: string;
  logo: string;
  image: string;
  description: PortableTextBlock[];
  ticketsLink: string;
  video?: string;
  eventYear?: number;
  eventLocation?: string;
  eventDates?: string;
  festivalDays?: FestivalDay[];
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
};
