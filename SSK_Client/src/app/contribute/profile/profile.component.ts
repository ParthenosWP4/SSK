import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  forImage = environment.forImage;
  orcidIcon   = this.forImage + '/assets/images/ORCID-iD_icon-vector.svg';
  emailIcon    = this.forImage + '/assets/images/envelope2.svg';
  addCircleIcon = this.forImage + '/assets/images/plusIn.svg';
  editIcon= this.forImage + '/assets/images/edit.svg';
  editIcon2 = this.forImage + '/assets/images/edit2.svg';
  profilePicture = this.forImage + '/assets/images/profilePicture.svg';

  textDraft1 = `Your drafts consist in all the scenarios,
                steps and resources you started to create,
                but that are not published yet.
                They remain only visible for you until
                you decide to make them public.`;

  textDraft2 = `You still can edit or delete any draft you made.`;

  textDraft3 = `If your draft is the result of
                a collaborative work (multiple authors),
                its publication will be notified to others.`;

  textPublication1 = `Your publications consist in all the scenarios,
                      steps and resources you have submitted.`;

  textPublication2 = `You still can edit or delete any publication you made.`;

  textPublication3 = `If your publication is the result of a
                     collaborative work (multiple authors),
                     editions or suppressions will be notified to others.`;

  constructor() { }

  ngOnInit() {
  }

}
