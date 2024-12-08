import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [SearchPipe,FormsModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit{
allEmployee:any = ""
searchkey:string = "" 
currentName:string=""
currentEmail:string=""
currentStatus:any=""
currentAge:Number=0
currentId:any=""
currentData:object={}
  constructor(private api:ApiService){}

  // editForm = new FormGroup({
  //   firstName:new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]),
  //   email:new FormControl('',[Validators.required, Validators.email]),
  //   age: new FormControl('',[Validators.required, Validators.pattern('[0-9]{1,3}')]),
  //   status: new FormControl('')
  // })
  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(){
    this.api.getAllEmployeesApi().subscribe({
      next:(res:any)=>{
        this.allEmployee = res
        console.log(this.allEmployee)
      },
      error:(err:any)=>{
        console.log(err)
    }
    })
  }

  deleteUser(firstName:any,email:any){
   const reqbody = {firstName,email}
   console.log(reqbody)
    this.api.DeleteEmployeeApi(reqbody).subscribe({
      next:(res:any)=>{
        if(res){
          alert("User deleted sucessfully")
          this.getEmployees()
        }
        else{
          alert("Oops some error happened")
        }
      },
      error:(err:any)=>{
        console.log(err)
    }
    })
    
  }
  changeCurrent(firstName:any,email:any,age:any,status:any,id:any,popup:any){
    this.currentName=firstName
    this.currentAge=age,
    this.currentEmail=email,
    this.currentStatus=status
    this.currentId=id
    this.currentData={firstName,email,age,status}
    // this.editForm.value.firstName = firstName
    // this.editForm.value.age = age
    // this.editForm.value.email = email
    // this.editForm.value.status = status
    this.toggler(popup)

  }

  toggler(popup:any){
  popup.classList.toggle("d-none")
  console.log("Inside toggle")
}

updateUser(oldobj:object,newobj:object){
  return {...oldobj,...newobj}
}

compareObjects(obj1:any, obj2:any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

  editUser(popup:any,fname:any,femail:any,fage:any,fstatus:any,namestatus:any,emailstatus:any){

    
   if(!fname.value || !femail.value || !fage.value || !fstatus.value){
    alert("Please fill completely")
   }
   else{

    !fname.value.trim().match(/^[a-z/sA-Z]+([ '-][a-zA-Z]+)*$/)?namestatus.classList.remove('d-none'):namestatus.classList.add('d-none')
    !femail.value.trim().match(/\S+@\S+\.\S+/)?emailstatus.classList.remove('d-none'):emailstatus.classList.add('d-none')

    if(!fname.value.trim().match(/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/) || !femail.value.trim().match(/\S+@\S+\.\S+/)){
      console.log("Inside match")
      
    }
    else{
      //api call
      const data = {firstName:fname.value.trim(),email:femail.value.trim(),age:fage.value.trim(),status:fstatus.value}
      console.log("Old:",this.currentData)
      console.log("New:",data)
      const reqbody = this.updateUser(this.currentData,data)
      console.log(reqbody)
      const result = this.compareObjects(reqbody,this.currentData)
      if(!result){
        console.log("Changes Made")
        const idObject = {id:this.currentId}
        Object.assign(reqbody,idObject );
        console.log(reqbody)
      this.api.EditEmployeeApi(reqbody).subscribe({
      next:(res:any)=>{
          Swal.fire({
            title:'Edited user Successful',
            text:`Edited user ${res.firstName}`,
            icon:'success'})
            
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
    this.toggler(popup)
    setTimeout(()=>this.getEmployees(),2000)
    }
    else{
      Swal.fire({
                title:"No change is made. Close now",
                icon:'info'})
                this.toggler(popup)
      
    }
    }

   }
    // const {firstName,email,age,status} = this.editForm.value
    // // console.log(this.currentData)
    // console.log(data)
    // console.log(this.currentData)

    // if(firstName || email || age || status){
    //   console.log("Something is changed")
    //   console.log(this.editForm.value)
    //   const curr = this.editForm.value
    //   console.log("Old:",this.currentData)
    //   console.log("New:",curr)



      
   
    // const reqbody = {firstName,email};


  }
}
