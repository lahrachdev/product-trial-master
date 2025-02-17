import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'app/core/models/product.model';
import { QuickAddButtonComponent } from 'app/shared/ui';
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';


@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        QuickAddButtonComponent,
        BadgeModule
    ],
})
export class ProductCardComponent {
    @Input() product: Product | undefined;
    @Input() quantityAdded: number = 0;
    @Input() disabled: boolean = false;
    @Output() onQuantityChange = new EventEmitter<number>();


    updateQuantity(newQuantity: number) {
        this.onQuantityChange.emit(newQuantity)
    }
}
