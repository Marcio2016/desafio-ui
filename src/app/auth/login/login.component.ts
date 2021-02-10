import { MessageService } from './../../shared/message/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  formulario: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }



  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  async onSubmit(): Promise<any> {
    try {
        await this.authService.login(
         this.formulario.value.username,
         this.formulario.value.password
        );
        this.router.navigate(['']);
      } catch (error) {
        this.messageService.showMessage(error.message, true);
      }
  }

}
