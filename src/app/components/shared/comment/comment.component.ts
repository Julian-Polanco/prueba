import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { UserLoginSucess } from 'src/app/models/user-login-success';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  raitingValue: number = 0;

  @Input()
  fullName: string = "";

  @Input()
  comment: string = "";

  @Input()
  userId: number = -1;

  @Input()
  commentUserId: number = -2;

  @Input()
  idComment: number = -1;

  commentsForm = new FormGroup({
    rating: new FormControl('')
  });

  dataUser: UserLoginSucess;

  @Output()
  commentDeleted = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClientService, private authService: AuthService,
    private spinnerService: SpinnerService, private snackBar: SnackBarService,) { }

  ngOnInit(): void {
    this.commentsForm.controls.rating.setValue(this.raitingValue);
    this.loadDataUser();
  }

  get actionFromComment(): boolean {
    return (this.userId === this.commentUserId) || this.isSuperAdmin;
  }

  get isLogin(): boolean {
    return !INVALID_DATA.includes(String(this.authService.isLoginUser()));
  }

  loadDataUser(): void {
    if (this.isLogin) {
      this.dataUser = this.authService.isLoginUser();
    }
  }

  get isSuperAdmin(): boolean {
    return this.dataUser && this.dataUser.rol == 3;
  }

  deleteComment(): void {
    var spinnerRef = this.spinnerService.start("Eliminando comentario...");
    const comment = {
      commentId: this.idComment
    };
    this.httpClient.post(ENDPOINTS.deleteRoomComment, comment).subscribe((result: any) => {
      if (result.status == 200) {
        this.commentDeleted.emit(true);
        this.snackBar.openSnackBar("Comentario eliminado satisfactorialmente!");
      }
      this.spinnerService.stop(spinnerRef);
    });
  }


}
