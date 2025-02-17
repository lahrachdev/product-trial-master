import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-quick-add-button',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './quick-add-button.component.html',
    styleUrls: ['./quick-add-button.component.scss']
})
export class QuickAddButtonComponent {
    @Input() quantity: number = 0;
    @Output() quantityChange = new EventEmitter<number>();

    increment() {
        this.quantity++;
        this.quantityChange.emit(this.quantity);
    }

    decrement() {
        if (this.quantity > 0) {
            this.quantity--;
            this.quantityChange.emit(this.quantity);
        }
    }
}
