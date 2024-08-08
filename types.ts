export type MuralQuery = {
    muralCollection: {
        items: {
            title: string
            description: string
            location: string
            closeUp: boolean
            photosCollection: {
                items: {
                    url: string
                }[]
            }
        }[]
    }
}