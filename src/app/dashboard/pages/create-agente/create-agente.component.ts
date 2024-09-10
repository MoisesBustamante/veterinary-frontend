import { PropietariosService } from './../../../services/propietarios.service';

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create-agente',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-agente.component.html',
  styleUrl: './create-agente.component.css'
})
export class CreateAgenteComponent implements OnInit{
  propietarioForm!: FormGroup;
  ciudades: any = [];

  constructor(private PropietariosService: PropietariosService, private router: Router, private fb: FormBuilder){


  }
  ngOnInit(): void {
    this.propietarioForm = this.fb.group({
      id_dueno: ['', Validators.required],
      tipo_identificacion: ['', Validators.required],
      identificacion_dueno: ['', Validators.required],
      nombre_dueno: ['', Validators.required],
      id_ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    this.getCiudades();
  }
  getCiudades() {
    this.PropietariosService.getCiudades().subscribe({
      next: (data) => {
        console.log(data);
        this.ciudades = data.data;

      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  Cancelar(){
    this.router.navigate(['dashboard/propietarios'])
  }
  onSubmit() {
    let ProSend= this.propietarioForm.getRawValue();
    let payload={
     id_dueno: ProSend.id_dueno,
     tipo_identificacion: ProSend.tipo_identificacion,
     identificacion_dueno: ProSend.identificacion_dueno,
     nombre_dueno: ProSend.nombre_dueno,
     ciudadesDTO: {
         id_ciudad: ProSend.id_ciudad,
         nombre_ciudad: ProSend.nombre_ciudad
                  },
    direccion: ProSend.direccion,
    telefono: ProSend.telefono

    }

      this.PropietariosService.AddPropietarios(payload).subscribe(
        (response) => {
          console.log(this.propietarioForm.value);
          console.log('Propietario agregado con exito', response);

            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Propietario agregado con éxito',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['dashboard/propietarios']);
          });
        },
        (error) => {
          console.error('Error al agregar propietario', error);
        }
      );
    }
  }


