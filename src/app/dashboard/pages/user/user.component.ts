
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import Swal from 'sweetalert2';
declare var $: any;
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit {
  users: any = [];
  paginatedUsers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getPersonas();
    // this.UpdatePersona();
  }

  getPersonas() {
    this.UserService.getPersonas().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data.data;
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
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
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
    return Math.ceil(this.users.length / this.itemsPerPage);
  }



  DeleteUser(id_user: any) {
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
          id_user: id_user
        };


        this.UserService.DeletePersona(payload).subscribe({
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





  Crear() {
    this.router.navigate(['dashboard/create']);
  }

  Actualizar(cedula: any) {
    this.router.navigate(['dashboard/update/', cedula]);
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    
    const wbout: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'users.xlsx');
  }
}
