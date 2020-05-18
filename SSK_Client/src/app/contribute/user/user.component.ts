import { Component, OnInit, Input } from '@angular/core';
import {SskService} from '../../ssk.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() goToProfile;
  forImage = environment.forImage;
  githubIcon   = this.forImage + '/assets/images/github_hover.svg';
  orcidIcon    = this.forImage + '/assets/images/icon-orcid.svg';
  emailIcon    = this.forImage + '/assets/images/envelope.svg';
  passwordIcon = this.forImage + '/assets/images/padlock1.svg';

  title =  'User Profile';

  registerForm: FormGroup;
  submitted = false;
  
  constructor(public activeModal: NgbActiveModal, private sskServ: SskService, private formBuilder: FormBuilder,
    private router: Router, private location: PlatformLocation) {
    this.location.onPopState(() => this.activeModal.close());
  }


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
      }else if (this.registerForm.value.email !== 'ssk.@inria.fr' && this.registerForm.value.password !== 'tork&mork') {
        return ;
      }
      if (!this.goToProfile) {
        this.router.navigate(['user', 'defaultUser']);
      } else {
        this.activeModal.dismiss();
        this.sskServ.changeNav('scenario');
        this.router.navigate(['new-scenario']);
      }
  }

  close() {
    this.activeModal.dismiss();
  }

}
