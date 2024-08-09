export const titleSlug = (title: string) => {
    return title.toLowerCase().replace(/ /g, "-")
}

export const slugTitle = (slug: string) => {
    return slug.replace(/-/g, " ")
}
