export const contentGqlFetcher = async <T> (
    {query, variables = {}, preview = false} : {query: string, variables?: any, preview?: boolean} 
    ): Promise<T | undefined> => {
    const res = await fetch
        (`https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: preview ? `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN}` : `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,

                },
                body: JSON.stringify({ query, variables }),
            }
        );

    const { data, error } = await res.json();
    if (error) {
        console.error(error);
        throw new Error('Failed to fetch API');
    }
    return data as T
}