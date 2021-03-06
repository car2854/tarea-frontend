import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isSuccess: boolean = false;
  public isError: boolean = false;
  public isSubmit: boolean = false;

  public messageError: string[] = [];

  public userForm = this.fb.group({
    name:     ['', [Validators.required]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ){}

  ngOnInit(): void {
    
  }

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

    this.userService.createUser(this.userForm.value)
    .subscribe({
      error: (err:any) => {
        console.log(err);

        console.log(this.messageError);
        
        this.messageError = [];

        if (err.error.msg) this.messageError.push(err.error.msg);
        if (err.status === 400){

          const propertyNames = Object.keys(err.error.errors);
          
          for (let index = 0; index < propertyNames.length; index++) {
              this.messageError.push(err.error.errors[propertyNames[index]].msg);
              
          }
        }
        
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
      
    
  }
}
