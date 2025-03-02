import { SafeUrl } from "@angular/platform-browser";
import { Category } from "./category.enum";

export interface Creation{
    category: number,
    description: string,
    price: string,
    imageUrl: SafeUrl 
    stock: true 
}
