import { Image } from "sanity";

export type Gallery = {
    _id: string;
    _createdAt: Date;
    name: string;
    images: Image[];
}