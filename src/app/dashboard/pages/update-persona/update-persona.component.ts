import { UserService } from './../../../services/user.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-persona',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './update-persona.component.html',
  styleUrls: ['./update-persona.component.css']
})
export default class UpdatePersonaComponent implements OnInit {
  userForm: FormGroup;
  id_user: string = '';
  isEditing: boolean = false;

  public personaSend: any = {
    id_user: '',
    username: '',
    password: '',
    email: '',
    role: '',

  }

  constructor(
    private UserService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      id_user: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id_user);

    this.loadPersonaData();
  }

  loadPersonaData(): void {
    let payload={
      id_user:this.id_user

    }

      this.UserService.getPersonaById(payload).subscribe(data => {
       console.log(data.data);
       this.userForm.patchValue({
        id_user: data.data.id_user,
        username: data.data.username,
        password: data.data.password,
        email: data.data.email,
        role: data.data.role
      });
      });

  }
  onSubmit() {
    this.userForm.markAllAsTouched();

    if (!this.userForm.valid) {
      return;
    }

    let personaSend: any = this.userForm.getRawValue(); // Obtener los valores del formulario

    // Configuración de SweetAlert2 con botones personalizados
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-2",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, ¡actualizar! ",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserService.AddPersona(personaSend).subscribe(
          (response) => {
            if (response.code == 200) {
              this.ngOnInit();
              swalWithBootstrapButtons.fire({
                title: "¡Actualizado!",
                text: "El User ha sido actualizado con éxito.",
                icon: "success"
              }).then(() => {
                console.log('User actualizado', response);
                this.router.navigate(['dashboard/user']);
              });
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: response.message,
                icon: "error"
              });
            }
          }
        );
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "La actualización ha sido cancelada.",
          icon: "error"
        });
      }
    });
  }



  onCancel(): void {
    this.router.navigate(['dashboard/user']);
  }


}
