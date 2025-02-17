import { Injectable, computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { lastValueFrom } from 'rxjs';

export interface ProductState {
    products: Product[];
    isLoading: boolean;
    selectedProductId: number | null;
}

export const ProductStore = signalStore(
    withState<ProductState>({
        products: [],
        isLoading: false,
        selectedProductId: null,
    }),
    withMethods((store, productsService = inject(ProductsService)) => ({
        async loadAll(): Promise<void> {
            patchState(store, { isLoading: true });
            console.log("loadProducts")
            try {
                // Convert Observable to Promise so that 'await' works
                const products = await lastValueFrom(productsService.loadProducts());
                patchState(store, { products, isLoading: false });
            } catch (error) {
                console.error("Failed to load products", error);
                patchState(store, { products: [], isLoading: false });
            }
        },
    }))
);


