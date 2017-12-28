import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AppService} from './app.service';

@Component({
    selector: 'home',
    'styles': [
        '../../node_modules/font-awesome/css/font-awesome.css'
      ],
    templateUrl: './home.component.html',
})

export  class HomeComponent {

    private scenarios: Array<any> = [];
    public  scenarioObjects: Array<any> = [];

    title = 'STANDARDIZATION SURVIVAL KIT'
    desc = ' Supporting the modeling and management of research data for the Arts and Humanities. '
    browseBtn = 'browse by'
    browseItems: Array<string> = ['scenarios', 'steps', 'resources']
    mediumTitle: Array<string> = ['Standards. ', 'Ever heard of them ?']
    mediumDesc: Array<string> = ['Taking the form of documents informing about practices, protocols, artefact characteristics or data formats, they can be used as reference for two parties working in the same field of activity for producing comparable or interoperable results.', 
                                    'Standards are usually published by standardization organisations (such as <font>ISO</font>, <font>W3C</font> or the <font>TEI Consortium</font>), which ensure that the following three requirements for standards are actually fulfilled :']
    
    thumbnails: Array<any> = [
        {
            'img': 'assets/images/hand-shake.svg',
            'label': 'consensus',
            'desc' : 'The standard reflects the expertise of a wide, possibly international group of experts in the field.'
        },
        {
            'img': 'assets/images/world+book.svg',
            'label': 'publication',
            'desc' : 'The standard is accessible to anyone who wants to know its content.'
        },
        {
            'img': 'assets/images/wrench.svg',
            'label': 'Maintenance',
            'desc' : 'The standard is updated, replaced or deprecated depending on the evolution of the corresponding technical field.'
        }
    ]

    secondH = 'A reference environement covering <font>digital research scenarios</font> in the Arts and Humanities.'

    homeLastParagraphs = ['It provides you with reference material about standards and their use, such as bibliographic sources, available documentation or transformations tools.',
                    'The <font>research scenarios</font> gathered here will serve you as examples to give you some insight on how to use standards in your own similar project.']
    scenariosLink = window.location.host + '/ssk/scenarios '
                    constructor(
      private router: Router,
      private _appService: AppService
    ) {}

    transform(url) {
        console.log(window.location.host)
        return this._appService.transformUrl(url)
    }
}
 
