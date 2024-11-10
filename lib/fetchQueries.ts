import { MuralQuery } from "@/types";
import { createClient } from 'contentful';

const validateCredentials = () => {
    const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

    if (!space || !accessToken) {
        throw new Error('Contentful credentials are missing. Please check your environment variables.');
    }

    return { space, accessToken };
}

export const fetchAllContenful = async () => {
    try {
        const { space, accessToken } = validateCredentials();

        const client = createClient({
            space: space,
            accessToken: accessToken,
        });

        const response = await client.getEntries({
            content_type: 'mural',
        });

        // console.log("Raw response:", response);

        const transformedData = {
            muralCollection: {
                items: response.items.map(item => {
                    const fields = item.fields as any;
                    const photoAssets = fields.photos?.map((photo: any) => {
                        return "https:" + photo.fields.file.url;
                    }).filter(Boolean) || [];

                    return {
                        title: fields.title,
                        description: fields.description,
                        location: fields.location,
                        category: fields.category,
                        slug: fields.url,
                        photos: {
                            items: photoAssets.map(url => ({ url }))
                        }
                    };
                })
            }
        };

        return transformedData as MuralQuery;

    } catch (error) {
        console.error('Error in fetchAllContenful:', error);
        throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
}

export const debugContentful = async () => {
    try {
        const { space, accessToken } = validateCredentials();

        const url = `https://cdn.contentful.com/spaces/${space}/entries?content_type=Mural&access_token=${accessToken}`;

        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to fetch Murals: ${error.message}`);
        }

        const data = await response.json();

        // Pretty print the content and fields
        console.log("Contentful Data:");
        console.log(JSON.stringify(data, null, 2));

        data.items.forEach((item: any, index: number) => {
            console.log(`\nItem ${index + 1}:`);
            console.log(`Title: ${item.fields.title}`);
            console.log(`Description: ${item.fields.description}`);
            console.log(`Location: ${item.fields.location}`);
            console.log(`Category: ${item.fields.category}`);
            console.log(`Slug: ${item.fields.url}`);
            console.log("Photos:");
            item.fields.photos?.forEach((photoLink: any, photoIndex: number) => {
                const asset = data.includes.Asset.find(
                    (asset: any) => asset.sys.id === photoLink.sys.id
                );
                console.log(`  Photo ${photoIndex + 1}: https:${asset?.fields?.file?.url}`);
            });
        });

        // await listContentTypes();

    } catch (error) {
        console.error('Error in debugContentful:', error);
        throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
}

export const listContentTypes = async () => {
    try {
        const { space, accessToken } = validateCredentials();

        const url = `https://cdn.contentful.com/spaces/${space}/content_types?access_token=${accessToken}`;

        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to fetch content types: ${error.message}`);
        }

        const data = await response.json();

        // More detailed logging
        console.log("\nDetailed Content Types Information:");
        data.items.forEach((item: any) => {
            console.log(`\nContent Type ID: ${item.sys.id}`);
            console.log(`Display Name: ${item.name}`);
            console.log(`Description: ${item.description || 'No description'}`);
            console.log('Fields:');
            item.fields.forEach((field: any) => {
                console.log(`  - ${field.id} (${field.type})`);
            });
        });

        return data;

    } catch (error) {
        console.error("Error in listContentTypes:", error);
        throw error instanceof Error ? error : new Error("Unknown error occurred");
    }
};

// Let's update fetchMuralById to use REST API as well
export const fetchMuralById = async (titleId: string) => {
    try {
        const { space, accessToken } = validateCredentials();

        const url = `https://cdn.contentful.com/spaces/${space}/entries?content_type=Mural&fields.title=${encodeURIComponent(titleId)}&access_token=${accessToken}`;

        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to fetch Mural: ${error.message}`);
        }

        const data = await response.json();

        // Transform the response to match your existing structure
        const transformedData = {
            muralCollection: {
                items: data.items.map(item => ({
                    title: item.fields.title,
                    description: item.fields.description,
                    location: item.fields.location,
                    closeUp: item.fields.closeUp,
                    photosCollection: {
                        items: item.fields.photos?.map((photoId: string) => {
                            const asset = data.includes.Asset.find((asset: any) => asset.sys.id === photoId);
                            return {
                                url: asset?.fields.file.url
                            };
                        }) || []
                    }
                }))
            }
        };

        return transformedData as MuralQuery;

    } catch (error) {
        console.error('Error in fetchMuralById:', error);
        throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
}