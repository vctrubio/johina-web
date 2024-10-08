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
    // const AnotherData = await contentGqlFetcher<AnotherMuralQuery>({ query });
    if (!data)
        throw new Error('Check......')
    return data
}

export const fetchMuralById = async (titleId: string) => {
    // console.log('check id ,', titleId)
    const query = `#graphql
        query MuralCollection($where: MuralFilter) {
            muralCollection(where: $where) {
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

    const data = await contentGqlFetcher<MuralQuery>({ query, variables: {where: {title: titleId}} });
    if (!data)
        throw new Error('Check......')
    return data
}