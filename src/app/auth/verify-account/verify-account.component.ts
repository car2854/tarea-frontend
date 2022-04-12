import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  public isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.userService.verifyAccount(this.route.snapshot.paramMap.get('token'))
      .subscribe({
        error: (err:any) => {
          console.log(err);
          
        },
        complete: () => {
          this.isLoading = false;
        }
      })

  }

}
