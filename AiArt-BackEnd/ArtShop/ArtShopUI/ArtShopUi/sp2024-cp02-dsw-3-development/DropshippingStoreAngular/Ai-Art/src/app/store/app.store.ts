import { computed } from "@angular/core";
import { Artist } from "../types/artist.interface";
import { Image } from "../types/image.interface";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals'
import { SearchImagesQuery } from "../types/searchImagesQuery.interface";

export interface AppStates{
    products: Image[],
    searchTerm: string,
    pageNumber: number,
    totalPages: number,
    pageSize: number,
    totalCount: number,
    isLoading: boolean,
    sortByPriceAsc: boolean ,
    artistNames: string[],
    favorites: Image[],
    cart: Image[]
    stringifyCreationImage: string,
    selectedCategory: string | undefined;
    selectedArtist: string | undefined;
    isAuth: boolean,
    prompt: string,
    user: Artist | undefined,
    inStock: boolean | undefined,
    recentOpen: Image[] 
}


const defaultState: AppStates = {
    products: [],
    searchTerm: '',
    pageNumber: 1,
    totalPages: 0,
    pageSize: 15,
    totalCount: 0,
    isLoading: false,
    sortByPriceAsc: true,
    artistNames: [],
    favorites: [],
    cart: [],
    selectedArtist:undefined,
    selectedCategory:undefined,
    prompt: '',
    user: undefined,
    inStock: undefined,
    isAuth: false,
    stringifyCreationImage: '',
    recentOpen: []
}

export const AppStore = signalStore(
    {providedIn: 'root'},
    withState(defaultState),
    withMethods((state)=>({
        setProducts: (products: Image[])=>{patchState(state, {products})},
        setSearch: (searchTerm: string)=>{patchState(state, {searchTerm, pageNumber:1})},
        setPage: (pageNumber: number)=>{patchState(state,{pageNumber})},
        setTotalPages:(totalPages:number)=>{patchState(state, {totalPages})},
        setPageSize: (pageSize: number)=>{patchState(state, {pageSize})},
        setTotal: (totalCount:number)=>{patchState(state, {totalCount})},
        setIsLoading: (isLoading:boolean)=>{patchState(state, {isLoading})},
        setSortByPriceAsc: (sortByPriceAsc: boolean)=>{patchState(state, {sortByPriceAsc,  pageNumber:1})},
        setArtists: (artistNames: string[])=>{patchState(state,{artistNames})},
        setUser:(user: Artist | undefined)=>{patchState(state, {user})},
        setRecentOpen: (recentOpen: Image)=>{
            let items = state.recentOpen()
            
                patchState(state, {recentOpen: [...items, recentOpen]})
            
        },
        resetRecentOpen: ()=>{patchState(state, {recentOpen: []})},
        setFavorites: (image: Image)=>{ 
                patchState(state,{favorites: [...state.favorites(), image]})            
        },
        removeFromFavorites:(images:Image[])=>{
            patchState(state, {favorites:images})
        },
        resetFavorites: ()=>{
            let fave:Image[] = []
            patchState(state, {favorites:fave})
        },
        setCart: (image: Image)=>{ 
                patchState(state,{cart: [...state.cart(), image]})
        },
        removeFromCart:(image:Image[])=>{
            patchState(state, {cart:image})
        },
        resetCart: ()=>{
            let fave:Image[] = []
            patchState(state, {cart:fave})
        },
        setInStock:(inStock: boolean | undefined)=>{patchState(state, {inStock,  pageNumber:1})},
        setIsAuth: (isAuth: boolean)=>{patchState(state, {isAuth})},
        setSelectedCategory: (selectedCategory: string | undefined)=>{patchState(state, {selectedCategory,  pageNumber:1})},
        setSelectedArtist: (selectedArtist: string | undefined)=>{patchState(state, {selectedArtist,  pageNumber:1})},
        setStringifyCreationImage: (stringifyCreationImage: string )=>{patchState(state, {stringifyCreationImage})},
        setPrompt: (prompt:string)=>{patchState(state, {prompt})},
        resetQueryParams: ()=>{
            patchState(state,{
                pageNumber: 1,
                searchTerm: '',
                // sortByPriceAsc: true,

            })
        }
    })),
    withComputed((state)=>({
        searchParams: computed(()=>{
            const searchParams: SearchImagesQuery = {
                pageNumber: state.pageNumber(),
                sortByPriceAsc: state.sortByPriceAsc(),
                // username: state.selectedArtist()
            }
            if(state.searchTerm()){
                console.log(state.searchTerm())
                searchParams.searchTerm = state.searchTerm()
            }
            if(state.inStock()){
                searchParams.inStock = state.inStock()
            }else if(state.inStock()===false){
                searchParams.inStock=state.inStock()
            }
            if(state.selectedCategory()){
                searchParams.category = Number(state.selectedCategory())
            }
            if(state.selectedArtist() !== undefined){
                searchParams.username = state.selectedArtist()
            }

            return searchParams
        })
    })),
    withHooks({
        onInit:(state)=> {
            state.resetQueryParams()
        },
    })
)
