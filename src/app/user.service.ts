import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  constructor(
    private http: HttpClient
  ) { }

  public createUser = (data: any) => {
    return this.http.post(`${base_url}/user`, data);
  }

  public verifyAccount = (token: any) => {

    const header = {
      headers: {
        'x-token': token
      }
    }

    return this.http.put(`${base_url}/user/verificarCuenta`, null, header);
  }

}
