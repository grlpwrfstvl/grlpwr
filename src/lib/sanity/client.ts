import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../../../sanity/env";

export const clientConfig = { projectId, dataset, apiVersion, useCdn: true };

export const sanityClient = createClient(clientConfig);
