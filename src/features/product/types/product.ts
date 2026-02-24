import type {Entity} from "@shared/types";

export type Product = Entity<{
    name: string
    price: number
}>