// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../../Services/auth.service';
// import { Router } from 'express';

// @Component({
//   selector: 'app-create-account',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './create-account.component.html',
//   styleUrl: './create-account.component.css',
// })
// export class CreateAccountComponent {
//   fauthService : AuthService = inject(AuthService)
//   router: Router = inject(Router)
//   fb: FormBuilder = inject(FormBuilder);
//   createUser(){
// 		this.fauthService.CreateAccount(this.userFrm.controls.['email'].value, this.userFrm.controls.['password'].value)
// 			.then( user => {
// 						console.log(user);       
// 						this.router.navigate([""])
// 					}, 
// 				err => {
// 						console.log(err);
// 						alert(err.message)
// 						}
// 			)   
// 	}
// }
