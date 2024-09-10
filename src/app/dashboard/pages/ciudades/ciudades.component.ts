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
  selector: 'app-ciudades',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ciudades.component.html',
  styleUrl: './ciudades.component.css'
})
export class CiudadesComponent implements OnInit {
  ciudades: any = [];
  paginatedCity: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private CiudadService: CiudadService, private router: Router) {}

  ngOnInit(): void {
    this.getPersonas();

  }

  getPersonas() {
    this.CiudadService.getCiudades().subscribe({
      next: (data) => {
        console.log(data);
        this.ciudades = data.data;
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
    this.paginatedCity = this.ciudades.slice(startIndex, endIndex);
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
    return Math.ceil(this.ciudades.length / this.itemsPerPage);
  }



  // DeleteCiudad(id_ciudad: any) {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: "btn btn-success me-2",
  //       cancelButton: "btn btn-danger"
  //     },
  //     buttonsStyling: true
  //   });

  //   swalWithBootstrapButtons.fire({
  //     title: "¿Estás seguro?",
  //     text: "¡No podrás revertir esto!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Sí, eliminar",
  //     cancelButtonText: "No, cancelar",
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       let payload = {
  //         id_user: id_ciudad
  //       };


  //       this.CiudadService.DeleteCiudad(payload).subscribe({
  //         next: () => {
  //           this.getPersonas();
  //           console.log('Persona eliminada con éxito');

  //           swalWithBootstrapButtons.fire({
  //             title: "¡Eliminado!",
  //             text: "La persona ha sido eliminada.",
  //             icon: "success"
  //           });
  //         },
  //         error: err => {

  //           console.error('Error al eliminar persona:', err.message);

  //           if (err.status === 500) {
  //             swalWithBootstrapButtons.fire({
  //               title: "Error al eliminar",
  //               text: "No se puede eliminar esta persona porque tiene datos relacionados.",
  //               icon: "error"
  //             });
  //           } else {
  //             swalWithBootstrapButtons.fire({
  //               title: "Error",
  //               text: "Ocurrió un error inesperado al eliminar la persona.",
  //               icon: "error"
  //             });
  //           }
  //         }
  //       });
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       swalWithBootstrapButtons.fire({
  //         title: "Cancelado",
  //         text: "La persona está a salvo :)",
  //         icon: "error"
  //       });
  //     }
  //   });
  // }





  CrearCiudad() {
    this.router.navigate(['dashboard/create-ciudad']);
  }

  ActualizarCiudad(id_ciudad: any) {
    this.router.navigate(['dashboard/update-ciudad/', id_ciudad]);
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ciudades);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ciudades');

    // Genera el archivo de Excel y activa la descarga
    const wbout: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'ciudades.xlsx');
  }
}

