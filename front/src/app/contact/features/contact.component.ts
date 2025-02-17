// contact.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule, InputTextModule, CardModule],
    providers: [MessageService]
})
export class ContactComponent {
    contactForm: FormGroup;

    constructor(private fb: FormBuilder, private messageService: MessageService) {
        this.contactForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            message: ['', [Validators.required, Validators.maxLength(300)]]
        });
    }

    onSubmit() {
        if (this.contactForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Demande de contact envoyée avec succès' });
            this.contactForm.reset();
        }
    }
}