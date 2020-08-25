import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, Data } from '@angular/router';
import { Subject } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStatusChanges = new Subject<string>();
  constructor(private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private router: Router) { }

  signIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afFirestore.collection('users').ref.where('idAuth', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              localStorage.setItem('user', JSON.stringify(userRef.data()));
              if (userRef.data().role === 'admin' && userRef.data().access) {
                this.router.navigateByUrl('admin');
                this.userStatusChanges.next('admin')
              }
              else {
                this.router.navigateByUrl('profile');
                this.userStatusChanges.next('user')
              }
            })
          }
        )
      })
      .catch(() => alert('Користувач не знайдений!'))
  }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/home');
        this.userStatusChanges.next('test')
      })
      .catch(err => console.log(err))
  }

  signUp(email: string, password: string, firstName: string, lastName: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResp => {
        const user = {
          idAuth: userResp.user.uid,
          email: userResp.user.email,
          role: 'user',
          firstName: firstName,
          lastName: lastName,
          orders: [],
        };
        this.afFirestore.collection('users').add(user)
          .then(data => {
            data.get()
              .then(user => {
                localStorage.setItem('user', JSON.stringify(user.data()))
                this.router.navigateByUrl('profile');
                this.userStatusChanges.next('test')
              })
          })
      })
      .catch(err => alert('Даний емайл вже використовується!'))

  }

}

