import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminStatus: boolean;
  constructor(private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private router:Router) { }
  
  signIn(email: string, password: string): void{
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(user =>{
      this.afFirestore.collection('users').ref.where('id','==',user.user.uid).onSnapshot(
        snap=>{
          snap.forEach(userRef=>{
            console.log('userRef', userRef.data());
            localStorage.setItem('user', JSON.stringify(userRef.data()));
            if (userRef.data().role === 'admin' && userRef.data().access) {
              this.router.navigateByUrl('admin');
              this.adminStatus = true;
            }
            else{
              this.router.navigateByUrl('home');
              this.adminStatus = false;

            }
          })
        }
      )
    })
  .catch(err=>console.log(err))
  }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('login')
      })
    .catch(err=>console.log(err))
    this.adminStatus = false;
  }

  signUp(email:string,password:string): void{
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResp => {
        const user = {
          id: userResp.user.uid,
          email: userResp.user.email,
          role: 'user'
        };
        this.afFirestore.collection('users').add(user)
          
      .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
  }
  checkStatus(): boolean{
    return this.adminStatus
  }
}

