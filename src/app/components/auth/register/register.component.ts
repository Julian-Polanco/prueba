import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/user-register';
import { MyErrorStateMatcher } from 'src/app/providers/custom-validators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private authService: AuthService, private spinnerService: SpinnerService, private snackBarService: SnackBarService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z- ]{1,63}$',),]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z- ]{1,63}$',),]),
      document: new FormControl('', [Validators.required, this.noWhitespaceValidator, Validators.pattern('[0-9]{1,10}$',),]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',),]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
    },
      { validators: this.checkPasswords });
  }

  ngOnInit(): void {
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('repeatPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    var spinnerRef = this.spinnerService.start("Registrando...");

    if (!this.registerForm.valid) {
      return;
    }
    const user: UserRegister = {
      fullname: this.registerForm.controls.name.value + " " + this.registerForm.controls.lastName.value,
      document: this.registerForm.controls.document.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value
    }
    this.authService.register(user).subscribe((data) => {
      this.spinnerService.stop(spinnerRef);
      if (data.status == 200) {
        this.snackBarService.openSnackBar("Registro exitoso!!!");
        this.router.navigate(['/auth/login']);
      }
    }, (_) => {
      this.spinnerService.stop(spinnerRef);
    });
  }

}
