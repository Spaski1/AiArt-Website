import { Image } from "./image.interface"

export interface ResponseImagesApi{
    data: Image[],
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    totalPages: number

}

export interface ResponseApiCategories{
    paginatedImages: ResponseImagesApi
}
