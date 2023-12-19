import { PortableTextBlock } from "sanity";

export type News = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: string;
    description: PortableTextBlock[];
    image: string;

};