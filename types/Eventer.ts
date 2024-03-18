import { PortableTextBlock } from "sanity";
import { Image } from "sanity";

export type Eventer = {
    _id: string;
    _createdAt: Date;
    name: string;
    link?: string;
    slug: string;
    image: string;
    gallery: Image[];
    location: string;
    time: Date
    description: PortableTextBlock[];

};