import type {Entity} from "@shared/types";

export type Cart = Entity<{
    name: string
    price: number
    quantity: number
}>