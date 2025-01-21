import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Client } from '../../shared/models/client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      login: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{3,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {

      const user = new Client();
      user.nom = this.registerForm.value.nom;
      user.prenom = this.registerForm.value.prenom;
      user.login = this.registerForm.value.login;
      user.email = this.registerForm.value.email;
      user.password = this.registerForm.value.password;

      console.log('User Registered:', user);

      this.apiService.registerClient(user).subscribe((c) => {
        console.log('Client récupéré : ', c);
      });
      this.registerForm.reset();
    } else {
      console.log('Formulaire invalide');
    }
  }
}
