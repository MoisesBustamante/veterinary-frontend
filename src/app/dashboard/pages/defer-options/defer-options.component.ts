

import {PropietariosService } from './../../../services/propietarios.service'
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import Swal from 'sweetalert2';
declare var $: any;
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-defer-options',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './defer-options.component.html',
  styleUrl: './defer-options.component.css'
})
export default class DeferOptionsComponent implements OnInit {
  propietarios: any = [];
  paginatedPro: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private PropietariosService: PropietariosService, private router: Router) {}

  ngOnInit(): void {
    this.getPropietarios();


}


  getPropietarios() {
    this.PropietariosService.getPropietarios().subscribe({
      next: (data) => {
        console.log(data);
        this.propietarios = data.data;
        this.updatePaginatedPersonas();
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  updatePaginatedPersonas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPro = this.propietarios.slice(startIndex, endIndex);
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedPersonas();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPersonas();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.propietarios.length / this.itemsPerPage);
  }



  DeletePropietario(id_dueno: any) {
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
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let payload = {
          id_dueno: id_dueno
        };
console.log(payload);


        this.PropietariosService.DeletePropietario(payload).subscribe({
          next: () => {
            this.getPropietarios();
            console.log('Propietario eliminado con éxito');

            swalWithBootstrapButtons.fire({
              title: "¡Eliminado!",
              text: "El Propietario ha sido eliminado.",
              icon: "success"
            });
          },
          error: err => {

            console.error('Error al eliminar persona:', err.message);

            if (err.status === 500) {
              swalWithBootstrapButtons.fire({
                title: "Error al eliminar",
                text: "No se puede eliminar este Propietario porque tiene datos relacionados.",
                icon: "error"
              });
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Ocurrió un error inesperado al eliminar el Propietario.",
                icon: "error"
              });
            }
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "La persona está a salvo :)",
          icon: "error"
        });
      }
    });
  }





  Crear() {
    this.router.navigate(['dashboard/create-agente']);
  }

  Actualizar(id_dueno: any) {
    this.router.navigate(['dashboard/update-propietario/', id_dueno]);
  }
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.propietarios);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Propietarios');

    // Genera el archivo de Excel y activa la descarga
    const wbout: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'propietarios.xlsx');
  }
}

