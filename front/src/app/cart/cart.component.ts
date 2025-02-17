import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CartStore } from 'app/core/stores/cart.store';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        SidebarModule
    ],

})
export class CartComponent {
    @Input() visible: boolean = false;
    @Output() close = new EventEmitter<any>();
    private readonly cartStore = inject(CartStore);
    public cartItems = this.cartStore.items;  // Signal
    public cartTotal = this.cartStore.total;

    onQuantityChange(event: { id: number, quantity: number }) {
        const { id, quantity } = event;
        this.cartStore.updateQuantity(id, quantity);

    }

    onRemoveItem(itemId: number) {
        this.cartStore.removeFromCart(itemId);
    }

    onClearCart() {
        this.cartStore.clearCart();
    }

}
