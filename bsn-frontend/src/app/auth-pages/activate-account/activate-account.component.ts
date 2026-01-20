import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {
  activationMessage: string = ''; // Error message
  isActivationOkay: boolean = true; // if the activation is okay or not
  isSubmitted: boolean = false; // if the user has submitted the form

  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService) {
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  onRedirectToLogin() {
    this.router.navigate(['/login']);
  }

  private confirmAccount(value: string) {
    this.authService.activateAccount({token: value}).subscribe({
      next: () => {
        this.activationMessage = "Thank you for activating your account. \nYou can now login to your account.";
        this.isSubmitted = true;
        this.isActivationOkay = true;
      },
      error: () => {
        this.activationMessage = "Token has been expired or invalid."
        this.isSubmitted = true;
        this.isActivationOkay = false;
      }
    });
  }
}
