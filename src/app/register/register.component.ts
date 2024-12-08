import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  constructor(private api:ApiService, private router:Router){}

  regsiterForm = new FormGroup({
    username:new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]),
    email:new FormControl('',[Validators.required, Validators.email]),
    age: new FormControl('',[Validators.required, Validators.pattern('[0-9]{1,3}')]),
    status: new FormControl('')
  })

  register(){
    console.log(this.regsiterForm.value);
    if(this.regsiterForm.invalid){
      // alert('Please fill the form properly')
      Swal.fire({
        
        text:"Please fill the form properly",
        icon:'warning'
      })
    }
    else{
      
      const data = this.regsiterForm.value
      const reqbody = {firstName:data.username,age:data.age, email:data.email, status:data.status} 
      console.log(reqbody)
      // {username: 'scasc', email: 'alex@gmail.com', age: '25', status: 'active'}
      this.api.AddEmployeeApi(reqbody).subscribe({
        next:(res:any)=>{
          console.log(res)
          Swal.fire({
            title:'Registration Successful',
            text:`welcome ${res.firstName}`,
            icon:'success'
          })
          // alert(`Welscome ${res.username}. Login to Continue`)
          this.regsiterForm.reset()
          this.router.navigateByUrl('/view-users')
        },
        error:(err:any)=>{
          console.log(err)
          if(err.status == 406){
            // alert(err.error)
            Swal.fire({
              title:'Error',
              text:err.error,
              icon:'error'
            })
            this.regsiterForm.reset()
          }
          else{
            // alert('Something went wrong')
            Swal.fire({
              title:'Wow',
              text:`Something went wrong`,
              icon:'error'
            })
          }
        }
      })
    }
  }

}
