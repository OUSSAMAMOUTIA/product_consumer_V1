import {Injectable} from '@angular/core';
import {User} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  users: User[] = [];
  authenticatedUser!: User;

  constructor() {
    this.users.push(
      {id: UUID.UUID(), username: "user1", password: "1234", roles: ["USER"]},
      {id: UUID.UUID(), username: "user2", password: "1234", roles: ["USER"]},
      {id: UUID.UUID(), username: "admin", password: "1234", roles: ["USER", "ADMIN"]},
    )
  }

  public login(username: string, password: string): Observable<User> {
    let user = this.users.find(user => user.username == username);
    if (!user)
      return throwError(() => new Error("User Not Found"));
    if (user.password != password)
      return throwError(() => new Error("Bad Credentials"));
    return of(user);
  }

  public isAuthenticatedUser(user: User): Observable<boolean> {
    this.authenticatedUser = user;
    localStorage.setItem("authUser", JSON.stringify({
      username: user.username,
      roles: user.roles,
      jwt: "JWT_TOKEN"
    }));
    return of(true);
  }
  public hasRole(role:string):boolean{
    return this.authenticatedUser!.roles.includes(role);
  }
  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }
  public isLogOut():Observable<boolean>{
     // @ts-ignore
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
