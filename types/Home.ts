import { PortableTextBlock } from "sanity";

export type Home = {
    _id: string;
    _createdAt: Date;
    title: string;
    logo: string;
    image: string;
    description: PortableTextBlock[];

};