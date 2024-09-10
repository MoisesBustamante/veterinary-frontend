import { CiudadService } from './../../../services/ciudad.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-paciente.component.html',
  styleUrl: './create-paciente.component.css'
})
export class CreatePacienteComponent implements OnInit{
  pacienteForm!: FormGroup;
  pacientes: any = [];
  constructor(private CiudadService:CiudadService, private router: Router, private fb: FormBuilder){


  }
  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      id_mascota: ['', Validators.required],
      nombre_mascota: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      id_dueno: ['', Validators.required],


    });

    this.getPropietarios();
  }
  getPropietarios() {
    this.CiudadService.getPropietarios().subscribe({
      next: (data) => {
        console.log(data);
        this.pacientes = data.data;

      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  Cancelar(){
    this.router.navigate(['dashboard/pacientes'])
  }
  onSubmit() {
    let ProSend= this.pacienteForm.getRawValue();
    let payload={
     id_mascota: ProSend.id_mascota,
    nombre_mascota: ProSend.nombre_mascota,
     especie: ProSend.especie,
     raza: ProSend.raza,
     fecha_nacimiento: ProSend.fecha_nacimiento,
     propietariosDTO: {
         id_dueno: ProSend.id_dueno

                  }



    }

      this.CiudadService.AddPaciente(payload).subscribe(
        (response) => {


            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Paciente agregado con éxito',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['dashboard/pacientes']);
          });
        },
        (error) => {
          console.error('Error al agregar paciente', error);
        }
      );
    }
  }


