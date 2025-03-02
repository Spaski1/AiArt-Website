export interface SearchImagesQuery{
    searchTerm?: string,
    pageNumber?: number,
    category?:number | undefined ,
    sortByPriceAsc?: boolean,
    inStock?:boolean,
    username?:string
}
