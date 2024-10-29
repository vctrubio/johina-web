export type MuralQuery = {
    muralCollection: {
        items: {
            title: string
            description: string
            location: string
            category: string
            slug: string
            photos: {
                items: {
                    url: string
                }[]
            }
        }[]
    }
}