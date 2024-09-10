import { CiudadService } from './../../../services/ciudad.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import Swal from 'sweetalert2';
declare var $: any;
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit{
  pacientes: any = [];
  paginatedPacientes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private CiudadService: CiudadService, private router: Router) {}
  ngOnInit(): void {
    this.getPersonas();

  }

  getPersonas() {
    this.CiudadService.getCPacientes().subscribe({
      next: (data) => {
        console.log(data);
        this. pacientes = data.data;
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
    this.paginatedPacientes= this. pacientes.slice(startIndex, endIndex);
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
    return Math.ceil(this.pacientes.length / this.itemsPerPage);
  }



  DeletePaciente(id_mascota: any) {
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
          id_mascota: id_mascota
        };


        this.CiudadService.DeletePaciente(payload).subscribe({
          next: () => {
            this.getPersonas();
            console.log('Persona eliminada con éxito');

            swalWithBootstrapButtons.fire({
              title: "¡Eliminado!",
              text: "La persona ha sido eliminada.",
              icon: "success"
            });
          },
          error: err => {

            console.error('Error al eliminar persona:', err.message);

            if (err.status === 500) {
              swalWithBootstrapButtons.fire({
                title: "Error al eliminar",
                text: "No se puede eliminar esta persona porque tiene datos relacionados.",
                icon: "error"
              });
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Ocurrió un error inesperado al eliminar la persona.",
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





  CrearPaciente() {
    this.router.navigate(['dashboard/create-paciente']);
  }

  ActualizarPaciente(id_mascota: any) {
    this.router.navigate(['dashboard/update-paciente/', id_mascota]);
  }
  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.pacientes);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pacientes');

    // Genera el archivo de Excel y activa la descarga
    const wbout: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'pacientes.xlsx');
  }

}
