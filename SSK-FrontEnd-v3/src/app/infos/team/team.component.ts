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
    'projectPresentationTextPart1': `PARTHENOS stands for “Pooling Activities, Resources and Tools
                                      for Heritage E-research Networking, Optimization and Synergies”.
                                      It is inspired by the name of Athena Parthenos, the Greek goddess of wisdom,
                                      inspiration and civilization.`},
  {
    'projectPresentationTextPart2': `PARTHENOS is a research infrastructure whose objective is to strengthen
                                      the cohesion of research across a number of related fields associated with the humanities.
                                      This broad sector includes linguistic studies, cultural heritage,
                                      history and archaeology and existing
                                      research structures such as ARIADNE (archaeology), CLARIN (languages) and DARIAH
                                      (arts and humanities) are members of PARTHENOS.`},
  {
    'projectPresentationTextPart3': `PARTHENOS is led by PIN (Italy) and has 16 partners.
                                      The scientific coordinator is Prof. Franco Niccolucci.
                                      To know more about the partners please visit the dedicated page.`}];

  behindTheSceneContent: Array<any> = [{ 'behindTheSceneTitle': 'Behind the scenes' },
  {
    'behindTheScenePresentationTextPart1': `Within the PARTHENOS infrastructure,
                            the Work Package 4 addressed the standards set up by community
                            needs and defined, managed and maintained by international initiatives.
                            The standards concern all the aspects of digital activity,
                            from individual items to documents and collections.`},
  {
    'behindTheScenePresentationTextPart2': `The design and development of the « Standardization Survival Kit » was undertaken
                            by the WP4 members and lead by the Inria’s team.` },
  ];



  twitterIconSrc = '';

  profileImageDefault = 'assets/images/blank-profile-profileImage.png';

  teamInfoMembersList: Array<any> = [{
    'name': 'Laurent Romary',
    'profileImage': 'Laurent.jpg',
    'iconTwitter': '',
    'twitterLink': '',
    'role': 'Project Team Manager',
    'bio': 'Directeur de Recherche at Inria (France), within the team ALMAnaCH, and former director general of DARIAH (2014-2018). He carries out research on the modelling of semi-structured documents, with a specific emphasis on texts and linguistic resources. He has been active in standardisation activities within ISO committee TC 37 and the Text Encoding Initiative. He has also been working since many years on the advancement of open access.'
  },

  {
    'name': 'Charles Riondet',
    'profileImage': 'Charles.jpg',
    'iconTwitter': '',
    'twitterLink': '',
    'role': 'project management, data modelling',
    'bio': 'History Ph.D. and Archivist is research Engineer in Digital Humanities at the French Institute for Research in Computer Science and Automation (Inria) in Paris, Member of the Team ALMAnaCH. He is involved in European Union funded Horizon 2020 projects PARTHENOS and EHRI as a metadata and standards specialist, with a focus on the standardization of textual data (XML-TEI), archival metadata (EAD, EAC-CPF) and also research workflows.'
  },

  {
    'name': 'Marie Puren (until 2018)',
    'profileImage': 'Marie.png',
    'iconTwitter': '',
    'twitterLink': '',
    'role': 'project management, data modelling',
    'bio': 'Postdoctoral researcher in Digital History at the CNRS\' Laboratory for Historical Research - Rhône Alpes (LARHRA), and research associate at the Bibliothèque Nationale de France. She received her PhD in History at the Sorbonne University, and is a lecturer in Digital Humanities at the Ecole Nationale des Chartes and at the Université de Versailles - Saint Quentin. She is also a responsible for the French version of the Programming Historian. Her main research interests are intellectual history, French literature, digital humanities, and digital data modelization and management.'
  },
  ];


  teamInfoMembersList2: Array<any>  = [{
    'name': 'Dorian Seillier',
    'profileImage': 'Dorian.jpeg',
    'iconTwitter': '',
    'twitterLink': '',
    'role': 'UX designer',
    'bio': ''
  },

  {
    'name': 'Lionel Dadjou',
    'profileImage': 'Lionel.jpg',
    'iconTwitter': '',
    'twitterLink': '',
    'role': 'Lead developer',
    'bio': 'Holds a Master Degree in Computer science with major in software engineering. He is currently research engineer at the French National Institute for Computer Science and Applied Mathematic (Inria) in Paris, and member of the ALMAnaCH team where he  works as a lead developer. He is involved in European Union funded Horizon 2020 projects PARTHENOS.'
  },

  {
    'name': 'Damien Biabiany',
    'profileImage': 'damien.jpg',
    'iconTwitter': '',
    'twitterLink': '',
    'role': 'Developer',
    'bio': ''
  }];

  constructor(private sskServ: SskService) { }

  ngOnInit() {
    this.sskServ.setTitle(this.title);
    this.title = this.sskServ.getTitle();
  }

}
