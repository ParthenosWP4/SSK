import { Component, OnInit } from '@angular/core';
import {SskService} from '../../ssk.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  forImage = environment.forImage;
  githubIcon   = this.forImage + '/assets/images/github_hover.svg';
  orcidIcon    = this.forImage + '/assets/images/icon-orcid.svg';
  emailIcon    = this.forImage + '/assets/images/envelope.svg';
  passwordIcon = this.forImage + '/assets/images/padlock1.svg';

  title =  'User Profile';

  registerForm: FormGroup;
  submitted = false;
  
  constructor(private sskServ: SskService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
    this.registerForm = this.formBuilder.group({
     /* firstName: ['', Validators.required],
      lastName: ['', Validators.required],*/
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }else if (this.registerForm.value.email !== 'ssk.contact@inria.fr' && this.registerForm.value.password !== 'tork&mork') {
        return ;
      }
      this.router.navigate(['user', 'defaultUser']);
  }

}
