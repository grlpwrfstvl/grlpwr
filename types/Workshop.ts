import { PortableTextBlock } from "sanity";

export type Workshop = {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: string;
    link?: string;
    image: string;
    location: string;
    time: Date
    description: PortableTextBlock[];

};