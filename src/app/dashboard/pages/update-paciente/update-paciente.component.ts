import { CiudadService } from './../../../services/ciudad.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './update-paciente.component.html',
  styleUrl: './update-paciente.component.css'
})
export class UpdatePacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  propietarios: any = [];
  id_mascota: string= '';

  public pacienteSend: any = {
    id_mascota: '',
    nombre_mascota: '',
    especie: '',
    raza: '',
    fecha_nacimiento: '',
    id_dueno: '',


  }

  constructor(
    private CiudadService: CiudadService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.pacienteForm = this.fb.group({
      id_mascota: ['', Validators.required],
     nombre_mascota: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
     fecha_nacimiento: ['', Validators.required],
     id_dueno: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.id_mascota = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id_mascota);


    this.loadPropietarioData();
    this.getPropietarios();
  }

  getPropietarios() {
    this.CiudadService.getPropietarios().subscribe({
      next: (data) => {
        this.propietarios = data.data;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  loadPropietarioData() {
    let payload={
      id_mascota:this.id_mascota

    }


      this.CiudadService.getpacientesById(payload).subscribe(data => {
       console.log(data);

       this.pacienteForm.patchValue({
        id_mascota: this.id_mascota,
        nombre_mascota: data.data.nombre_mascota,
        especie: data.data.especie,
        raza: data.data.raza,
        fecha_nacimiento:data.data.fecha_nacimiento,
        id_dueno: data.data.propietariosDTO.id_dueno
      });


      });
  }

  Cancelar() {
    this.router.navigate(['dashboard/pacientes']);
  }

  onSubmit() {
    this.pacienteForm.markAllAsTouched();

    if (!this.pacienteForm.valid) {
      return;
    }


    let pacienteSend= this.pacienteForm.getRawValue();
    let payload={
     id_mascota: pacienteSend.id_mascota,
     nombre_mascota: pacienteSend.nombre_mascota,
     especie:  pacienteSend.especie,
     raza:  pacienteSend.raza,
     fecha_nacimiento:pacienteSend.fecha_nacimiento,
     propietariosDTO: {
         id_dueno:  pacienteSend.id_dueno
                  }
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
        this.CiudadService.AddPaciente(payload).subscribe(
          (response) => {
            if (response.code == 200) {
              this.ngOnInit();
              swalWithBootstrapButtons.fire({
                title: "¡Actualizado!",
                text: "La Mascota ha sido actualizada con éxito.",
                icon: "success"
              }).then(() => {
                console.log('User actualizado', response);
                this.router.navigate(['dashboard/pacientes']);
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
