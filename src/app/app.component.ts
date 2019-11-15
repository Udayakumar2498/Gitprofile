import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gitprofile';


 constructor(private http: HttpClient, private snacbar: MatSnackBar){}

name: any;
userdetail: any;
errmsg = false;
load = false;



  search() {
    if(!this.name)
    {
      this.snacbar.open('Enter User Name','Close', { duration: 2000,verticalPosition: 'top', horizontalPosition: 'right'} );
      return;
    }
    this.load = true;
    this.errmsg = false;
    const localData = localStorage.getItem(this.userdetail);
    if (localData) {
      this.userdetail = JSON.parse(localData);
      this.load = false;
      this.errmsg = false;
    }
     else {
    console.log(this.name);
    this.http.get('https://api.github.com/users/' + this.name + '?access_token=4f0522ca96cd66f42d225470285924584e50e77c')
    .subscribe(response => {
     this.userdetail = response;
     console.log(this.userdetail);
     localStorage.setItem(this.name, JSON.stringify(this.userdetail));
     this.load = false;
     this.errmsg = false;
    },
   errmsg => {
     this.load = false;
     this.errmsg = true;
     this.userdetail = false;
     this.snacbar.open('No Users Found','Close', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'} );

   }
    );
  }}
}
