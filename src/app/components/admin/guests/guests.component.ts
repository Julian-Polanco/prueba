import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { Guest } from 'src/app/models/guest';
import { ResponseService } from 'src/app/models/response-service';
import { UserList } from 'src/app/models/user-list';
import { UserLoginSucess } from 'src/app/models/user-login-success';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { EditGuestComponent } from '../edit-guest/edit-guest.component';


const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {

  articuloselect: Guest = new Guest("", "", "", "", "");

  @ViewChild(MatTable)
  dataSource!: MatTable<Guest>;

  columnas: string[] = ['document', 'fullName', 'email', 'role', 'borrar', 'editar'];

  datos: Guest[] = [];

  dataUser: UserLoginSucess;

  constructor(private httpClient: HttpClientService, private spinner: SpinnerService,
    private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDataUser();
    this.loadData();
  }

  loadData(): void {
    const spinner = this.spinner.start("Cargando listado de clientes...");
    this.httpClient.get<ResponseService<UserList>>(
      this.dataUser.rol == 2 ? ENDPOINTS.getAllUsersFromAdmin : ENDPOINTS.getAllUsersFromSuperadmin)
      .subscribe((result: ResponseService<UserList>) => {
        if (result.status == 200) {
          this.datos = result.data;
        }
        this.spinner.stop(spinner);
      });
  }

  get isLogin(): boolean {
    return !INVALID_DATA.includes(String(this.authService.isLoginUser()));
  }

  loadDataUser(): void {
    if (this.isLogin) {
      this.dataUser = this.authService.isLoginUser();
    }
  }

  editUser(columnId: number, userId: number): void {
    const dialogRef = this.dialog.open(EditGuestComponent, {
      data: {
        userId: userId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.renderRows();
    });
  }

  deleteUser(columnId: number, userId: number): void {
    const user = {
      id: userId
    };
    if (confirm("¿Realmente quiere borrarlo?")) {
      const spinner = this.spinner.start("Eliminando usuario...");
      this.httpClient.post(ENDPOINTS.deleteUser, user).subscribe((result: any) => {
        if (result.status == 200) {
          this.datos.splice(columnId, 1);
          this.dataSource.renderRows();
        }
        this.spinner.stop(spinner);
      });
    }
  }

  agregar(): void {
  }

}