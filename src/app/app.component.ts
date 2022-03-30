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
  
  public success: boolean = false;

  public userForm = this.fb.group({
    name:     ['', [Validators.required]],
    email:    ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ){}

  public createUser = () => {
    if (this.userForm.invalid) return;

    this.userService.createUser(this.userForm.value)
      .subscribe({
        error: (err:any) => {
          console.log(err);
        },
        next: (resp:any) => {
          this.success = true;
          console.log(resp);
          setTimeout(() => {
            this.success = false;
          }, 2000);
          this.userForm.reset();
        }
      })
      
    
  }
}
