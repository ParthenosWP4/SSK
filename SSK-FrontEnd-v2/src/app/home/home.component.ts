import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  browseItems: Array<string> = ['scenarios', 'steps', 'resources'];
  homeText: string = 'The Standardization Survival Kit : </br>' +
    'for a wider use of standards within Arts and Humanities';
  browseBtn  = 'BROWSE BY';
  firstTitle = 'Why standards ?';
  rightContent = 'Standards are generally published by standardization </br>organizations, such as ISO, W3C or the TEI Consortium. ';
  itemOne = 'They express a consensus.'
  itemTwo = 'They are accessible to anyone.'
  itemThree = 'They are actively maintained.'
  secondTitle = 'What is the SSK ?';
  leftTextTile = 'The SSK is an overlay platform dedicated to promoting a wider use of standards within the Arts and Humanities : ';
  sItemOne = 'Documenting existing standards by providing reference materials.'
  sItemTwo = 'Fostering the adoption of standards.'
  sItemThree = 'Communicating with research communities.'
  thirdTitle = 'How does the ssk work ?'
  lastContent = 'Guidelines and tools are easier to understand and use when presented through examples. </br></br>' + '\n The SSK provides a variety of standardized resources in a meaningful context. The <a href ="#/scenarios">research scenarios</a> brought together here will help you identify the most useful material to help you carry out your research project, step by step. '

  constructor() { }

  ngOnInit() {

  }

}
