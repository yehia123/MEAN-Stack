import {Component, OnInit} from '@angular/core';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';


/**
 * @title Basic menu
 */
@Component({
  selector: 'app-toolbar-button',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolBarComponent implements OnInit {

    public user: SocialUser;
    public loggedIn: boolean;

    animal: string;
    name: string;

    constructor(private authService: AuthService, public dialog: MatDialog) { }

    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(MyDialogComponent, {
        width: '600px',
        data: {name: this.name, animal: this.animal}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signInWithLinkedIn(): void {
      this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
      this.authService.signOut();
    }

}

