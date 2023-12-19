import { PortableTextBlock } from "sanity";

export type Artist = {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: string;
    category: string;
    image: string;
    stage: string;
    time: Date
    description: PortableTextBlock[];

};