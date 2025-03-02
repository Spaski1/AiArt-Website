import { Image } from "./image.interface"

export interface Artist{
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    cardNo: string,
    expireDate: string,
    boughtImages: Image[]
    soldImages: Image[]
}
