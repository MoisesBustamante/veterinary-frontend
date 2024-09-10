import { UserService } from './../../../services/user.service';

import { Component, OnInit } from '@angular/core';
import { Router , RouterModule} from "@angular/router";
import {CommonModule } from"@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-view-transition',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-transition.component.html',
  styleUrl: './view-transition.component.css'
})
export default class ViewTransitionComponent implements OnInit{
  userForm: FormGroup;



  constructor(private UserService: UserService, private fb: FormBuilder, public router: Router ) {
    this.userForm = this.fb.group({
      id_user: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.userForm = this.fb.group({
      id_user: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  Cancelar(){
    this.router.navigate(['dashboard/user'])
  }

  onSubmit() {

      this.UserService.AddPersona(this.userForm.value).subscribe(
        (response) => {
          console.log(this.userForm.value);
          console.log('User agregado con exito', response);

            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User agregado con éxito',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['dashboard/user']);
          });
        },
        (error) => {
          console.error('Error al agregar persona', error);
        }
      );
    }
  }


