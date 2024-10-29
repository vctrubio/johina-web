import { MuralQuery } from "@/types";

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

        const url = `https://cdn.contentful.com/spaces/${space}/entries?content_type=mural&access_token=${accessToken}`;

        // First make a test request to verify credentials
        const testResponse = await fetch(`https://cdn.contentful.com/spaces/${space}?access_token=${accessToken}`);

        if (!testResponse.ok) {
            const error = await testResponse.json();
            throw new Error(`Invalid Contentful credentials: ${error.message}`);
        }

        // If credentials are valid, proceed with the actual request
        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to fetch murals: ${error.message}`);
        }

        const data = await response.json();

        const transformedData = {
            muralCollection: {
                items: data.items.map(item => {
                    const photoAssets = item.fields.photos?.map(photoLink => {
                        const asset = data.includes.Asset.find(
                            (asset: any) => asset.sys.id === photoLink.sys.id
                        );
                        return "https:" + asset?.fields?.file?.url;
                    }).filter(Boolean) || [];

                    return {
                        title: item.fields.title,
                        description: item.fields.description,
                        location: item.fields.location,
                        category: item.fields.category,
                        url: item.fields.url,
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

// Let's update fetchMuralById to use REST API as well
export const fetchMuralById = async (titleId: string) => {
    try {
        const { space, accessToken } = validateCredentials();

        const url = `https://cdn.contentful.com/spaces/${space}/entries?content_type=mural&fields.title=${encodeURIComponent(titleId)}&access_token=${accessToken}`;

        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to fetch mural: ${error.message}`);
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