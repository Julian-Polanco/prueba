import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { FileUploadServiceService } from 'src/app/services/file-upload-service.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

const INVALIDA_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit, OnChanges {

  selectedFiles: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  imagesMaxError: number = 0;
  sizeMAx: boolean = false;

  @Input()
  codeRoom: string = "";

  @Output()
  isSelectedImages = new EventEmitter<boolean>();

  constructor(private spinnerService: SpinnerService, private httpClient: HttpClientService, private snackBarService: SnackBarService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.codeRoom && !INVALIDA_DATA.includes(changes.codeRoom.currentValue)) {
      this.uploadFiles();
    }
  }

  ngOnInit(): void {
  }

  selectFiles(event: any): void {
    this.sizeMAx = false;
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0] && this.selectedFiles.length <= 4) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        if (this.selectedFiles[i].size / 1024 / 1024 > 2) {
          this.sizeMAx = true;
          this.isSelectedImages.emit(false);
          return;
        }
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
    this.isSelectedImages.emit(this.selectedFiles.length <= 4);
    this.imagesMaxError = this.selectedFiles.length;
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles && this.selectedFiles.length <= 4) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
      this.snackBarService.openSnackBar("Habitación agregada existosamente!!!");
    }
    this.imagesMaxError = this.selectedFiles.length;
  }

  upload(idx: number, file: File): void {
    var spinnerRef = this.spinnerService.start("Cargando imagen...");
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      const formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('code', this.codeRoom);
      this.httpClient.post(ENDPOINTS.uploadImages, formData).subscribe(
        (result: any) => {
          if (result.status == 200) {
            this.spinnerService.stop(spinnerRef);
            this.progressInfos[idx].value = Math.round(100 * file.size / file.size);
            const msg = 'Se cargó la imagen: ' + file.name;
            this.message.push(msg);
          }
        },
        (err: any) => {
          this.spinnerService.stop(spinnerRef);
          this.progressInfos[idx].value = 0;
          const msg = 'Error al cargar imagen: ' + file.name;
          this.message.push(msg);
        });
    }
  }

}
