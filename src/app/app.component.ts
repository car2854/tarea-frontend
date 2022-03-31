import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  
  public isSuccess: boolean = false;
  public isError: boolean = false;
  public isSubmit: boolean = false;

  public messageError: string = '';

  public userForm = this.fb.group({
    name:     ['', [Validators.required]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ){}

  public verifyValidation(campo:string):boolean{
    
    if (this.userForm.get(campo)?.invalid){
      return true
    }else{
      return false;
    }

  }

  public createUser = () => {
    
    if (this.userForm.invalid) return;

    this.isSubmit = true;

    setTimeout(() => {
      this.userService.createUser(this.userForm.value)
      .subscribe({
        error: (err:any) => {
          console.log(err);

          if (err.error.msg) this.messageError = err.error.msg;
          
          this.isSubmit = false;
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 2000);
        },
        next: (resp:any) => {
          this.isSuccess = true;
          console.log(resp);
          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);

          this.isSubmit = false;
          
          this.userForm.reset();

        }
      });
    }, 1500);
      
    
  }
}
