import { UserDataService } from './../user/user-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../user/authentication.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import {
  map,
  shareReplay,
  distinctUntilChanged,
  debounceTime
} from 'rxjs/operators';
import { User } from '../user/user.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  loggedInUser$ = this._authenticationService.user$;
  public allUsers: string[] = [];

  selectedUsers = this.allUsers;

  onKey(value) {
    this.selectedUsers = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.allUsers.filter(option =>
      option.toLowerCase().startsWith(filter)
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _authenticationService: AuthenticationService,
    private _userDataService: UserDataService,
    private _router: Router
  ) {
    this._userDataService.getUsers$().subscribe(users => {
      this.allUsers = users.map(user => user.gebruikersnaam);
      console.log(this.allUsers);
    });
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigate(['/login']) /*Zorgt ervoor dat na uitloggen gebruiker niet verder ge-authenticeerde pagina kan bekijken*/ 
  }
  login() {
    console.log('login');
    this._router.navigate(['/login']);
  }

  selected(event: MatSelectChange) {
    var gebruikersnaam = event.value;
    this._router.navigate([`post/gebruiker/${gebruikersnaam}`]);
  }
}
