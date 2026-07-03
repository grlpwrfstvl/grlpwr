import { createClient } from "next-sanity";

export const clientConfig = {
  projectId: "59jzk62a",
  dataset: "production",
  apiVersion: "2024-02-20",
  useCdn: true,
};

export const sanityClient = createClient(clientConfig);
