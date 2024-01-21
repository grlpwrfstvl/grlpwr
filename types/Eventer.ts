import { PortableTextBlock } from "sanity";

export type Eventer = {
    _id: string;
    _createdAt: Date;
    name: string;
    link?: string;
    slug: string;
    image: string;
    location: string;
    time: Date
    description: PortableTextBlock[];

};