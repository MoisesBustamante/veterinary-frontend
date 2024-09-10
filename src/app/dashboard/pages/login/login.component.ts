
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validación para email
      password: ['', [Validators.required, Validators.minLength(6)]] // Validación para password
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email === 'admin@gmail.com' && password === 'admin1234') {
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido al dashboard',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Email o contraseña incorrectos',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa el formulario correctamente',
      });
    }
  }

  }



