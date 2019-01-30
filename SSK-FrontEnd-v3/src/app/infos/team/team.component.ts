import { Component, OnInit } from '@angular/core';
import { SskService } from '../../ssk.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  title = 'SSK team';
  forImage = environment.forImage;
  contentProjectTeamPage: Array<any> = [{ 'title': 'The PARTHENOS project' },
  {
    'projectPresentationTextPart1': `PARTHENOS stands for “Pooling Activities, Resources and Tools for Heritage E-research Networking,
     Optimization and Synergies”. It is a research infrastructure whose objective is to strengthen the cohesion of research across a number
      of related fields associated with the humanities. This broad sector includes linguistic studies, cultural heritage,
       history and archaeology and existing research structures such as ARIADNE (archaeology), CLARIN (languages) and
        DARIAH (arts and humanities) are members of PARTHENOS.`},
  {
    'projectPresentationTextPart2': `PARTHENOS is a research infrastructure whose objective is to strengthen
                                      the cohesion of research across a number of related fields associated with the humanities.
                                      This broad sector includes linguistic studies, cultural heritage,
                                      history and archaeology and existing
                                      research structures such as ARIADNE (archaeology), CLARIN (languages) and DARIAH
                                      (arts and humanities) are members of PARTHENOS.`},
  {
    'projectPresentationTextPart3': `Within the PARTHENOS infrastructure, the Work Package 4 (WP4)
      addressed the standards set up by community needs and defined, managed and maintained by international initiatives.
       The standards concern all the aspects of digital activity, from individual items to documents and collections.`}];

  behindTheSceneContent: Array<any> = [{ 'behindTheSceneTitle': 'The Standardization Survival Kit' },
  {
    'behindTheScenePresentationTextPart1': `The design and development of the Standardization Survival Kit 
    has been carried out since 2016 by <a href="http://www.parthenos-project.eu/consortium" target = "_blank">PARTHENOS WP4 members</a> 
    (PIN, CLARIN, KNAW, CNR, CSIC, FORTH, OEAW, 
      MIBACT-ICCU, SISMEL, Academy of Athens, FH Potsdam, Huma-Num, Inria) and lead by Inria (team ALMAnaCH).`},
  {
    'behindTheScenePresentationTextPart2': `The design and development of the « Standardization Survival Kit » was undertaken
                            by the WP4 members and lead by the Inria’s team.` },
  ];



  twitterIconSrc = '';

  profileImageDefault = 'assets/images/blank-profile-profileImage.png';

  teamInfoMembersList: Array<any> = [{
    'name': 'Laurent Romary',
    'profileImage': 'Laurent.png',
    'twitterLink': '',
    'role': 'Project Team Manager',
    'bio': `Directeur de Recherche at Inria (France), within the team ALMAnaCH, and former director general of DARIAH (2014-2018).
     He carries out research on the modelling of semi-structured documents, with a specific emphasis on texts and linguistic resources.
     He has been active in standardisation activities within ISO committee TC 37 and the Text Encoding Initiative. He has also been working
     since many years on the advancement of open access.`
  },

  {
    'name': 'Charles Riondet',
    'profileImage': 'Charles.png',
    'twitterLink': 'https://twitter.com/charlesriondet/',
    'role': 'Project management, Data modelling',
    'bio': `History Ph.D. and Archivist. Research Engineer in Digital Humanities at Inria in Paris, member of the team ALMAnaCH.
     Metadata and standards specialist, with a focus on the standardization of textual data (XML-TEI),
      archival metadata (EAD, EAC-CPF) and research workflows.`
  },

  {
    'name': 'Marie Puren (until 2018)',
    'profileImage': 'Marie.png',
    'twitterLink': 'https://twitter.com/MariePuren',
    'role': 'Project management, Data modelling',
    'bio': `Postdoctoral researcher in Digital History at the CNRS' Laboratory for Historical Research - Rhône Alpes (LARHRA),
     and research associate at the Bibliothèque Nationale de France. She received her PhD in History at the Sorbonne University,
      and is a lecturer in Digital Humanities at the Ecole Nationale des Chartes and at the Université de Versailles - Saint Quentin.
       She is also a responsible for the French version of the Programming Historian.`
  },
  ];


  teamInfoMembersList2: Array<any>  = [{
    'name': 'Dorian Seillier',
    'profileImage': 'Dorian.jpeg',
    'twitterLink': 'https://twitter.com/DorianSeillier',
    'role': 'UX designer',
    'bio': `Master’s degree in Medieval History and in Information Architecture at the ENS de Lyon.
      He is currently a member of the Team ALMAnaCH at Inria Paris, where he works as a UX Designer / Information Architect.`
  },

  {
    'name': 'Lionel Tadjou',
    'profileImage': 'Lionel.jpg',
    'twitterLink': 'https://twitter.com/NTatali',
    'role': 'Lead developer',
    'bio': `Holds a Master Degree in Computer science with major in software engineering.
     He is currently research engineer at Inria Paris,
      and member of the ALMAnaCH team where he  works as a lead developer.`
  },

  {
    'name': 'Damien Biabiany',
    'profileImage': 'Damien.jpg',
    'twitterLink': '',
    'role': 'Developer',
    'bio': `Student at the Coding Factory By Itescia, developer at Inria Paris with a work-study contract.
      He joined the ALMAnaCH team in December 2018 for the PARTHENOS project.
      He works on the Front-end development of the SSK and the contribution feature.`
  }];

  constructor(private sskServ: SskService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }

}
