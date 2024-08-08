import { MuralQuery } from "@/types";
import { contentGqlFetcher } from "./fetch";

export const fetchAllContenful = async () => {
    const query = `#graphql
        query main {
            muralCollection {
                items {
                title
                description
                location
                closeUp
                photosCollection {
                    items {
                    url
                    }
                }
                }
            }
        }
    `;

    const data = await contentGqlFetcher<MuralQuery>({ query });
    if (!data)
        throw Error('Check......')
    return data
}