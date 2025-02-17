import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { CartItem, CartState } from '../models/cart.model';
import { effect } from '@angular/core';

export const CartStore = signalStore(
    withState<CartState>({
        items: [],
        total: 0,
    }),
    withMethods((store) => ({
        // ✅ Add item to cart
        addToCart(item: CartItem): void {

            const existingItem = store.items().find(i => i.id === item.id);

            if (existingItem) {
                patchState(store, {
                    items: store.items().map(i =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    )
                });
            } else {
                patchState(store, { items: [...store.items(), { ...item, quantity: 1 }] });
            }
            this.updateTotal();
        },

        // Remove item from cart
        removeFromCart(itemId: number): void {
            patchState(store, {
                items: store.items().filter(i => i.id !== itemId)
            });
            this.updateTotal();
        },

        // Update item quantity
        updateQuantity(itemId: number, quantity: number): void {
            patchState(store, {
                items: store.items().map(i =>
                    i.id === itemId ? { ...i, quantity } : i
                )
            });
            this.updateTotal();
        },
        // Clear cart
        clearCart(): void {
            patchState(store, { items: [], total: 0 });
        },

        // Compute total price (automatically updates when items change)
        updateTotal(): void {
            const total = store.items().reduce((sum, item) => sum + (item.price * item.quantity), 0);
            patchState(store, { total });
        },
    })),
);

