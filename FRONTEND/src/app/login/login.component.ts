import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulaire soumis avec succès', this.loginForm.value);
      const data = this.loginForm.value;
      this.apiService.loginClient(data.login, data.password).subscribe((c) => {
        console.log('Client récupéré : ', c);
      });
      this.loginForm.reset();
      this.router.navigate(['/home']);
    } else {
      console.log('Le formulaire est invalide');
    }
  }
}
