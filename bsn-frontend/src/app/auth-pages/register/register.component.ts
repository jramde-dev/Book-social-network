import {Component} from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationRequest: RegistrationRequest = {firstName: '', lastName: '', email: '', password: ''};
  errorMessage: Array<string> = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router) {
  }

  onRegister() {
    this.errorMessage = [];
    this.authService.register({body: this.registrationRequest}).subscribe({
      next: () => {
        this.router.navigate(['/activate-account']);
      },
      error: (err) => {
        this.errorMessage = err.error.businessValidationErrors;
      }
    })
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

}
