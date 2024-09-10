import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PropietariosService } from '../../../services/propietarios.service';

@Component({
  selector: 'app-update-propietario',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './update-propietario.component.html',
  styleUrls: ['./update-propietario.component.css']
})
export class UpdatePropietarioComponent implements OnInit {
  propietarioForm: FormGroup;
  ciudades: any = [];
  id_dueno: string= '';

  public propietarioSend: any = {
    id_dueno: '',
    tipo_identificacion: '',
    identificacion_dueno: '',
    nombre_dueno: '',
    id_ciudad: '',
    direccion: '',
    telefono: '',

  }

  constructor(
    private PropietariosService: PropietariosService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.propietarioForm = this.fb.group({
      id_dueno: ['', Validators.required],
      tipo_identificacion: ['', Validators.required],
      identificacion_dueno: ['', Validators.required],
      nombre_dueno: ['', Validators.required],
      id_ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id_dueno = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id_dueno);


    this.loadPropietarioData();
    this.getCiudades();
  }

  getCiudades() {
    this.PropietariosService.getCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.data;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  loadPropietarioData() {
    let payload={
      id_dueno:this.id_dueno

    }


      this.PropietariosService.getPropietarioById(payload).subscribe(data => {
       console.log(data);

       this.propietarioForm.patchValue({
        id_dueno: this.id_dueno,
        tipo_identificacion: data.data.tipo_identificacion,
        identificacion_dueno: data.data.identificacion_dueno,
        nombre_dueno: data.data.nombre_dueno,
        id_ciudad:data.data.ciudadesDTO.id_ciudad,
        direccion: data.data.direccion,
        telefono: data.data.telefono
      });


      });
  }

  Cancelar() {
    this.router.navigate(['dashboard/propietarios']);
  }

  onSubmit() {
    this.propietarioForm.markAllAsTouched();

    if (!this.propietarioForm.valid) {
      return;
    }


    let propietarioSend= this.propietarioForm.getRawValue();
    let payload={
      id_dueno: propietarioSend.id_dueno,
     tipo_identificacion: propietarioSend.tipo_identificacion,
     identificacion_dueno:  propietarioSend.identificacion_dueno,
     nombre_dueno:  propietarioSend.nombre_dueno,
     ciudadesDTO: {
         id_ciudad:  propietarioSend.id_ciudad,
         nombre_ciudad:  propietarioSend.nombre_ciudad
                  },
    direccion:  propietarioSend.direccion,
    telefono:  propietarioSend.telefono
                }

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
        this.PropietariosService.AddPropietarios(payload).subscribe(
          (response) => {
            if (response.code == 200) {
              this.ngOnInit();
              swalWithBootstrapButtons.fire({
                title: "¡Actualizado!",
                text: "El User ha sido actualizado con éxito.",
                icon: "success"
              }).then(() => {
                console.log('User actualizado', response);
                this.router.navigate(['dashboard/propietarios']);
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
  }


