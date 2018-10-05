import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SskService} from '../ssk.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  browseItems: Array<string> = ['scenarios', 'steps', 'resources'];
  homeText  = 'A collection of research use case scenarios illustrating best practices in Digital Humanities and Heritage research';
  browseBtn  = 'BROWSE BY';
  firstTitle = 'Why standards ?';
  rightContent = 'Standards are generally published by standardization </br>organizations, such as ISO, W3C or the TEI Consortium. ';
  itemOne = 'They express a consensus.';
  itemTwo = 'They are accessible to anyone.';
  itemThree = 'They are actively maintained.';
  secondTitle = 'Increase efficiency, interoperability and sustainability by using standards';
  secondDesc = 'Incorporating standards in all the steps of your research process will make it last longer, easier to update, '
              + 'improve and share. Standards are non legally binding documents produced by an organisation ensuring :';
  sItemOne = 'Documenting existing standards by providing reference materials.';
  sItemTwo = 'Fostering the adoption of standards.';
  sItemThree = 'Communicating with research communities.';
  thirdTitle = 'Browse scenarios, follow the steps';
  thirdDesc = 'Guidelines and tools are easier to understand and use when presented through examples. The SSK provides a variety of ' +
              'standardized resources in a meaningful context.<br><br>The research scenarios brought together here will help you ' +
              'identify  the most useful material to carry out your research project, step by step.';
  fourthTitle = 'Contribute to the SSK and help build a community';
  fourthDesc = 'Bringing together researchers from different backgrounds, the SSK is a place to discuss and devise best practice ' +
                'processes in various fields of interest within the Arts & Humanities.';
                
  forImage = environment.forImage;
  constructor(private router: Router, private sskService: SskService) { }

  ngOnInit() {
    this.sskService.setTitle('Standardization Survival Kit');
  }


  redirect(link: string) {
    this.router.navigate([link]);
  }
}
