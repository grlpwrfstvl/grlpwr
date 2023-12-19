import { PortableTextBlock } from "sanity";

export type Home = {
    _id: string;
    _createdAt: Date;
    title: string;
    image: string;
    description: PortableTextBlock[];

};