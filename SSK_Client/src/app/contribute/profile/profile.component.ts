import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { PipeTransform, Pipe } from '@angular/core';

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
  border: any = {
    'border' : '1px solid #979797'
  } ;

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


  userScenarioDraft =   [
    { id: 1, title: 'Collaborative Digital Edition of a Musical Corpus',
             authors: [ 'Vincent Besson',
                        'Adeline Joffres',
                        'Hélène Gautier']
                    },

    { id: 2, title: 'Production and processing of 3D objects',
             authors: ['Hélène Gautier'
                      , 'Adeline Joffres'
                      , 'Paulin Ribbe'
                      , 'Mehdi Chayani'
                      , 'Xavier Granier'
                      , 'Sarah Tournon-Valiente']
                    },

    { id: 3, title: 'Extract textual content from images',
             authors: ['Saranya Balasubramanian' ,
                      'Peter Catrie' ,
                      'Dario Kampkaspar' ,
                      'Tomasz Parkoła' ,
                      'Charles Riondet' ,
                      'Pavel Stranak' ,
                       'Daniel Schoppe']
                      },

    { id: 4, title: 'Research standards for scholars',
             authors: ['Maurizio Sanesi' ,
                       'Roberta Giacomi' ,
                       'Emiliano Degl\'Innocenti',
                       'Claus Spiecker' ,
                       'Karolien Verbrugge']
            },

    { id: 5, title: 'Documenting application of lasers in conservation/restoration',
             authors: ['Klaus Illmayer',
                       'Susanne Haaf',
                       'Piotr Bański']
            },
  ];

  userStepsDraft = [
        {GithubRef: 'step_Rv_121017',
        author: {forename: 'Emilie', affiliation: 'DANS', surname: 'Kraikamp'},
        desc: null,
        description: `Recode occupation variable into a class and status score for occupations
                      in the 19th and 20th century,
                      and for contemporary occupations by using the HISCO occupational coding scheme`,

        head: [{lang: 'en', content: [ {part: 'Combine variables into scales'}]},
              {lang: 'fr', content: [{part: 'Ré-encoder les variables'}]}
              ],
        lastUpdate: '2019-04-12T07:29:13Z',
        metadata: [
              {link: 'http://tadirah.dariah.eu/vocab/index.php?tema=34&/contextualizing',
              key: 'contextualizing', source: 'http://tadirah.dariah.eu/', type: 'activity'},

              {abbr: 'HISCO', complete: 'Historical International Standard of Classification of Occupations',
              link: 'socialhistory.org/en/projects/hisco-history-work',
              tags: ['Classification', 'Human-history', 'Research Activities - Organizing',
                    'Research Objects - Digital Humanities'],
              resources: ['collab.iisg.nl/web/hisco/about'] },

              {abbr: 'ISCO', complete: 'International Standard Classification of Occupations',
              link: ' http://www.ilo.org/public/english/bureau/stat/isco/ ',
              tags: ['Classification', 'Human-history', 'Research Activities - Organizing', 'Research Objects - Digital Humanities'],
              resources: ['www.ilo.org/public/english/bureau/stat/isco/isco88/major.htm']}
        ],
        parents: [{id: 'SSK_sc_statisticalAnalysisOccupations', position: 0}],
        position: 0,
        // resources: [{…}, {…}, {…}, {…}, {…}],
        // tslint:disable-next-line:max-line-length
        stepDesc: [{lang: 'en', content: 'Recode occupation variable into a class and status…ons by using the HISCO occupational coding scheme'}],
        title: 'Recode variables ',
        _id: 'step_Rv_121017',
        _index: 'ssk',
        _score: 1.505671,

        },
        {GithubRef: 'step_CViS_121017',
        author: {forename: 'Emilie', affiliation: 'DANS', surname: 'Kraikamp'},
        desc: null,
        description: `Perform Exploratory Factor Analysis (EFA)`,

        head: [{lang: 'en', content: [ {part: 'Recode variables'}]},
              {lang: 'fr', content: [{part: 'Ré-encoder les variables'}]}
              ],
        lastUpdate: '2019-04-12T07:29:13Z',
        metadata: [
              {link: 'http://tadirah.dariah.eu/vocab/index.php?tema=34&/contextualizing',
              key: 'contextualizing', source: 'http://tadirah.dariah.eu/', type: 'activity'},

              {abbr: 'HISCO', complete: 'Historical International Standard of Classification of Occupations',
              link: 'socialhistory.org/en/projects/hisco-history-work',
              tags: ['Classification', 'Human-history', 'Research Activities - Organizing',
                    'Research Objects - Digital Humanities'],
              resources: ['collab.iisg.nl/web/hisco/about'] },

              {abbr: 'ISCO', complete: 'International Standard Classification of Occupations',
              link: ' http://www.ilo.org/public/english/bureau/stat/isco/ ',
              tags: ['Classification', 'Human-history', 'Research Activities - Organizing', 'Research Objects - Digital Humanities'],
              resources: ['www.ilo.org/public/english/bureau/stat/isco/isco88/major.htm']}
        ],
        parents: [{id: 'SSK_sc_statisticalAnalysisOccupations', position: 1}],
        position: 1,
        // resources: [{…}, {…}, {…}, {…}, {…}],
        stepDesc: [{lang: 'en', content: 'Perform Exploratory Factor Analysis (EFA)'}],
        title: 'Combine variables into scales',
        _id: 'step_CViS_121017',
        _index: 'ssk',
        _score: 1.505671,

    },
  ];

  userResourcesDraft = [{
        // tslint:disable-next-line:max-line-length
        abstract: `History Of Work Information System<br /><br />We offer information on occupations in the past: Tens of thousands of occupational titles
        from countries and languages around the world from the sixteenth to the twentieth century; linked to short descriptions of the content of the work;
        linked to images and iconographic essays on the world of work; a bibliography on the world of work and links to related websites;
        information on social class schemes and occupational stratification scales such as respectively HISCLASS and HISCAM.`,
        category: 'general',
        creator: '[ International Institute of Social History]',
        creators: '[ International Institute of Social History]',
        parents: [ {id: 'step_Rv_121017'} ],
        redirect: 'https://datasets.socialhistory.org/dataverse/historyofwork',
        resType: 'database',
        title: 'History of Work Dataverse',
        type: 'resource',
        url: 'https://datasets.socialhistory.org/dataverse/historyofwork',
        _id: 'MDBMD762',
        _index: 'ssk',
        _score: 0.9850221,
        _type: '_doc',
         },
        {abstract: `Semantic Text Analytics API: From text to actionable data: extract
         meaning from unstructured text and put it in context with a simple API.`,
        category: 'general',
        creator: '[ SpazioDati]',
        creators: '[ SpazioDati]',
        parents: [{id: 'step_ItdaoeoSIMooMautAtC'}],
        redirect: 'http://www.dandelion.eu',
        resType: '',
        title: 'Dandelion API | Semantic Text Analytics as a service',
        type: 'resource',
        url:  'http://www.dandelion.eu',
        _id: 'XISZR9RA',
        _index: 'ssk',
        _score: 0.9850221,
        _type: '_doc',
  },{
    abstract: `The Getty Thesaurus of Geographic Names ® (TGN), The Art & Architecture Thesaurus ® (AAT), the Union List of Artist Names ® (ULAN), the Cultural Objects Name Authority ® (CONA),
    and the Iconography Authority (IA) are structured resources that can be used to improve access to information about art, architecture,
    and material culture. Through rich metadata and links, it is hoped that the Getty vocabularies will provide a powerful conduit for research and discovery
    for digital art history and related disciplines.`,
    category: 'general',
    creator: '[ Getty Research Institute]',
    creators: '[ Getty Research Institute]',
    parents: [{id: 'step_DtGatCBV2'},{id: 'step_ItdaoeoSIMooMautAtC'},{id: 'step_DtrTaTGaCBV2'}],
    redirect: 'http://www.getty.edu/research/tools/vocabularies/tgn/index.html',
    resType: '',
    title: 'Getty Thesaurus of Geographic Names',
    type: 'resource',
    url:  'http://www.getty.edu/research/tools/vocabularies/tgn/index.html',
    _id: 'JEF4GFGT',
    _index: 'ssk',
    _score: 0.9850221,
    _type: '_doc',
  }

]


  scenariosPublication = [{ title: {  content: [{part: 'Perform Statistical Analysis on Historical and Contemporary Occupations'}], lang: 'en'},
                 lastUpdate: '2019-04-06T13:20:08Z',
                 id: 'SSK_sc_scholarsStandardsV2',
                 author: [ { forename: 'Hélène', affiliation: 'Huma-Num/CNRS', surname: 'Gautier'},
                           { forename: 'Adeline', affiliation: 'Huma-Num/CNRS', surname: 'Joffres'},
                           { forename: 'Paulin', affiliation: 'Huma-Num/CNRS', surname: 'Ribbe'},
                           { forename: 'Mehdi', affiliation: '3D-SHS Huma-Num"s consortium', surname: 'Chayani'},
                           { forename: 'Xavier', affiliation: '3D-SHS Huma-Num"s consortium', surname: 'Granier'},
                           { forename: 'Sarah', affiliation: '3D-SHS Huma-Num"s consortium', surname: 'Tournon-Valiente'}
                       ],
                 desc: [ { lang: 'en', content: `Given a large dataset with several raw variables, a social science researcher
                 needs to (re)code some of the data in order to properly conduct statistical analysis and modelling techniques.
                 To allow comparison across studies, researchers often develop and use certain standards for recoding some aspects
                 of individuals, such as recoding contemporary occupations into the ISCO.
                 After (re)coding variables, scales are often constructed
                 by using standard methods such as factor and reliability analysis.
                 Several software packages, such as SPSS Statistics, exist that are widely
                 used for these purposes across social science researchers.
                 Statistical analyses and modelling also have certain software standards.
                 Finally, reporting the results is done within a consistent style, such as APA Style.
                 Some of these coding, software and reporting standards are covered in this use case.`}],
                 image: { graphic: {url: 'https://raw.githubusercontent.com/ParthenosWP4/SSK/master/img/SSK-schemCust.jpg'},
                          type: 'image'} ,

                 scenario_metadata : { discipline: [{key: 'Archaeology and Prehistory', source: 'aureHAL', type: 'discipline'}],
                                       object: [{key: 'Images (3D)', source: 'tadirah', type: 'object'}],
                                       technique: [{ key: 'Georeferencing', source: 'tadirah', type: 'techniques'},
                                                   { key: 'Photography', source: 'tadirah', type: 'techniques'},
                                                   { key: 'Preservation Metadata', source: 'tadirah', type: 'techniques'},
                                                   { key: 'Scanning', source: 'tadirah', type: 'techniques'},
                                                   { key: 'Technology Preservation', source: 'tadirah', type: 'techniques'}]
                                      } ,

               },
               {  title: {  content: [{part: 'Doing 3D reconstruction in archaeological context'}], lang: 'en'},
                  lastUpdate: '2019-03-06T13:20:08Z',
                  id: 'SSK_sc_RUBRICA',
                  author: [ { forename: 'Chiara', affiliation: 'Huma-Num/CNRS', surname: 'Zuanni'},
                           { forename: 'Vincent', affiliation: 'Huma-Num/CNRS', surname: 'Baillet'}
                       ],
                  desc: [ { lang: 'en', content: `Reflectance Transformation Imaging, a computational photography method based on
                  the principle of raking light, has been extensively used in fields such as archaeology, museum studies,
                  and art history to capture and enhance subtle surface details. Low-angled and multidirectional light
                  creates texture details and enhances planar irregularities. There are two methods to capture RTI images:
                  the Dome Method and the Highlight RTI Method. In both methods, objects are photographed with a single
                  camera in a fixed position. The only element that changes in the process is the position of light.
                  In the Dome method the light position is known since lights are fixed. In the highlight method
                  the position of the light is captured by using reflective spheres that are then used by a specialised
                  software to create the RTI image. The images stack is then computed into a polynomial texture map.
                  In a dedicated viewer, the resulting file can be viewed under individual light positions and different
                  rendering algorithms. This scenario focuses on the preparation of captured RTI data for archiving.
                  The main component of an RTI dataset is photographies.
                  Additionally some software-dependent formats will have to be considered for archiving.`}],
                 image: { graphic: {url: 'https://raw.githubusercontent.com/ParthenosWP4/SSK/master/img/sc_DTABf_figure.jpg'},
                          type: 'image'} ,

                 scenario_metadata : { discipline: [{key: 'Musicology and performing arts', source: 'aureHAL', type: 'discipline'}],
                                       object: [ {key: 'Sound', source: 'nemo', type: 'object'},
                                                 {key: 'Score', source: 'nemo', type: 'object'},
                                                 {key: 'Multiple score formats', source: 'nemo', type: 'object'}
                                                 ],
                                       technique: [{key: 'Encoding', source: 'tadirah', type: 'techniques'}]
                                      } ,

               },
               {  title: {  content: [{part: 'Collaborative Digital Edition of a Musical Corpus'}], lang: 'en'},
                  lastUpdate: '2019-05-06T13:20:08Z',
                  id: 'SSK_sc_DTABf',
                  author: [ { forename: 'Chiara', affiliation: 'Huma-Num/CNRS', surname: 'Zuanni'},
                           { forename: 'Vincent', affiliation: 'Huma-Num/CNRS', surname: 'Baillet'},
                           { forename: 'Mehdi', affiliation: '3D-SHS Huma-Num"s consortium', surname: 'Chayani'}
                       ],
                  desc: [ { lang: 'en', content: `Reflectance Transformation Imaging, a computational photography method based on
                  the principle of raking light, has been extensively used in fields such as archaeology, museum studies,
                  and art history to capture and enhance subtle surface details. Low-angled and multidirectional light
                  creates texture details and enhances planar irregularities. There are two methods to capture RTI images:
                  the Dome Method and the Highlight RTI Method. In both methods, objects are photographed with a single
                  camera in a fixed position. The only element that changes in the process is the position of light.
                  In the Dome method the light position is known since lights are fixed. In the highlight method
                  the position of the light is captured by using reflective spheres that are then used by a specialised
                  software to create the RTI image. The images stack is then computed into a polynomial texture map.
                  In a dedicated viewer, the resulting file can be viewed under individual light positions and different
                  rendering algorithms. This scenario focuses on the preparation of captured RTI data for archiving.
                  The main component of an RTI dataset is photographies.
                  Additionally some software-dependent formats will have to be considered for archiving.`}],
                 image: { graphic:
                         {url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Cistercian_monks_at_work_-_UL_Cambridge_Ms_Mm.5.31.jpg'},
                          type: 'image'} ,

                 scenario_metadata : { discipline: [{key: 'Musicology and performing arts', source: 'aureHAL', type: 'discipline'}],
                                       object: [ {key: 'Sound', source: 'nemo', type: 'object'},
                                                 {key: 'Score', source: 'nemo', type: 'object'},
                                                 {key: 'Multiple score formats', source: 'nemo', type: 'object'}
                                                 ],
                                       technique: [{key: 'Encoding', source: 'tadirah', type: 'techniques'}]
                                      } ,

               },

  ];

  // Data scenarioElt for <app-scenarios></app-scenarios> component
  scenarioElt ={
      "title": {
        "lang": "en",
        "content": [
          {
            "part": "Perform Statistical Analysis on Historical and\n     Contemporary Occupations"
          }
        ]
      },
      "desc": [
        {
          "lang": "en",
          "content": "Given a large dataset with several raw variables, a social science researcher needs to (re)code some of the data in order to properly conduct statistical analysis and modelling techniques. To allow comparison across studies, researchers often develop and use certain standards for recoding some aspects of individuals, such as recoding contemporary occupations into the ISCO. After (re)coding variables, scales are often constructed by using standard methods such as factor and reliability analysis. Several software packages, such as SPSS Statistics, exist that are widely used for these purposes across social science researchers. Statistical analyses and modelling also have certain software standards. Finally, reporting the results is done within a consistent style, such as APA Style. Some of these coding, software and reporting standards are covered in this use case."
        }
      ],
      "image": {
        "head": null,
        "type": "image",
        "graphic": {
          "url": "https://raw.githubusercontent.com/ParthenosWP4/SSK/master/img/statisticalAnalysis.png"
        }
      },
      "scenario_metadata": {
        "technique": [
          {
            "key": "Encoding",
            "source": "tadirah",
            "type": "techniques"
          }
        ],
        "discipline": [
          {
            "source": "aurehal",
            "type": "discipline",
            "key": "History"
          },
          {
            "source": "aurehal",
            "type": "discipline",
            "key": "Sociology"
          },
          {
            "source": "aurehal",
            "type": "discipline",
            "key": "Methods and statistics"
          }
        ],
        "object": [
          {
            "key": "Data",
            "source": "tadirah",
            "type": "objects"
          }
        ],
        "type": "scenario_metadata",
        "parent": "SSK_sc_statisticalAnalysisOccupations"
      },
      "author": [
        {
          "forename": "Emilie",
          "affiliation": "DANS",
          "surname": "Kraikamp",
        }
      ],
      "id": "SSK_sc_statisticalAnalysisOccupations",
      "lastUpdate": "2019-04-06T13:20:08Z",
      "steps": [
        {
          "_index": "ssk",
          "_type": "_doc",
          "_id": "step_Rv_121017",
          "_score": 1.505671,
          "stepDesc": [
            {
              "lang": "en",
              "content": "Recode occupation variable into a class and status score for occupations in the 19th and 20th century, and for contemporary occupations by using the HISCO occupational coding scheme"
            }
          ],
          "lastUpdate": "2019-04-12T07:29:13Z",
          "author": {
            "forename": "Emilie",
            "affiliation": "DANS",
            "surname": "Kraikamp"
          },
          "head": [
            {
              "lang": "en",
              "content": [
                {
                  "part": "Recode variables"
                }
              ]
            },
            {
              "lang": "fr",
              "content": [
                {
                  "part": "Ré-encoder les variables"
                }
              ]
            }
          ],
          "position": 0,
          "GithubRef": "step_Rv_121017",
          "parents": [
            {
              "id": "SSK_sc_statisticalAnalysisOccupations",
              "position": 0
            }
          ],
          "desc": null,
          "title": "Recode variables ",
          "description": "Recode occupation variable into a class and status score for occupations in the 19th and 20th century, and for contemporary occupations by using the HISCO occupational coding scheme",
          "metadata": [
            {
              "link": "http://tadirah.dariah.eu/vocab/index.php?tema=34&/contextualizing",
              "key": "contextualizing",
              "source": "http://tadirah.dariah.eu/",
              "type": "activity"
            },
            {
              "abbr": "HISCO",
              "complete": "Historical International Standard of Classification of Occupations",
              "link": "socialhistory.org/en/projects/hisco-history-work",
              "tags": [
                "Classification",
                "Human-history",
                "Research Activities - Organizing",
                "Research Objects - Digital Humanities"
              ],
              "resources": [
                "collab.iisg.nl/web/hisco/about"
              ],
              "desc": [
                {
                  "eng": "The Historical International Standard of Classification of Occupations or HISCO is a theoretical model used to code social class and occupational status. Formulated in 2002, the model complements the ILO's ISCO68 scheme, as it prescribes a universal code system for examining occupation descriptions. "
                }
              ],
              "key": "HISCO"
            },
            {
              "abbr": "ISCO",
              "complete": "International Standard Classification of Occupations",
              "link": " http://www.ilo.org/public/english/bureau/stat/isco/ ",
              "tags": [
                "Classification",
                "Human-history",
                "Research Activities - Organizing",
                "Research Objects - Digital Humanities"
              ],
              "resources": [
                "www.ilo.org/public/english/bureau/stat/isco/isco88/major.htm"
              ],
              "desc": [
                {
                  "eng": "The International Standard Classification of Occupations (ISCO) is an International Labour Organization (ILO) classification structure for organizing information on labour and jobs. "
                },
                {
                  "fr": " La CITP ou classification internationale type des professions (ISCO en anglais) est une nomenclature internationale. Elle sert ÃÂÃÂÃÂÃÂ  identifier aussi prÃÂÃÂÃÂÃÂ©cisÃÂÃÂÃÂÃÂ©ment que possible chaque mÃÂÃÂÃÂÃÂ©tier, et sert de correspondance entre les nomemclatures nationales, pour faciliter les comparaisons entre pays. "
                },
                {
                  "deu": " Die Berufssystematik International Standard Classification of Occupations (deutsch Internationale Standardklassifikation der Berufe) ist ein von der Internationalen Arbeitsorganisation (ILO) zusammengestelltes, international gÃÂÃÂÃÂÃÂ¼ltiges monohierarchisches Klassifikationsschema fÃÂÃÂÃÂÃÂ¼r Gruppen von Berufen. "
                },
                {
                  "esp": " La ClasificaciÃÂÃÂÃÂÃÂ³n Internacional Uniforme de Ocupaciones (CIUO), tambiÃÂÃÂÃÂÃÂ©n conocida por sus siglas en inglÃÂÃÂÃÂÃÂ©s ISCO, es una estructura de clasificaciÃÂÃÂÃÂÃÂ³n de la OrganizaciÃÂÃÂÃÂÃÂ³n Internacional del Trabajo (OIT) para organizar la informaciÃÂÃÂÃÂÃÂ³n de trabajo y empleo. "
                }
              ],
              "key": "ISCO"
            }
          ],
          "resources": [
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "S6AKYT7L",
              "_score": 0.9850221,
              "type": "resource",
              "title": "HISCO: Historical International Standard Classification of Occupations",
              "url": "",
              "period": "\"2002\"",
              "abstract": "",
              "creators": "[Marco H.D. van Leeuwen, Sören Edvinsson, Ineke Maas, Andrew Miles]",
              "parents": [
                {
                  "id": "step_Rv_121017"
                }
              ],
              "category": "general",
              "resType": "specification"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "MDBMD762",
              "_score": 0.9850221,
              "type": "resource",
              "title": "History of Work Dataverse",
              "url": "https://datasets.socialhistory.org/dataverse/historyofwork",
              "abstract": "History Of Work Information System\\n\\nWe offer information on occupations in the past: Tens of thousands of occupational titles from countries and languages around the world from the sixteenth to the twentieth century; linked to short descriptions of the content of the work; linked to images and iconographic essays on the world of work; a bibliography on the world of work and links to related websites; information on social class schemes and occupational stratification scales such as respectively HISCLASS and HISCAM.",
              "creators": "[ International Institute of Social History]",
              "parents": [
                {
                  "id": "step_Rv_121017"
                }
              ],
              "category": "general",
              "resType": "database"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "BBR32UYM",
              "_score": 0.9850221,
              "type": "resource",
              "title": "History Of Work Information System",
              "url": "https://historyofwork.iisg.nl/",
              "abstract": "We offer information on occupations in the past:\\nTens of thousands of occupational titles from countries and languages around the world from the sixteenth to the twentieth century, linked to short descriptions of the content of the work, linked to images and iconographic essays on the world of work, computer assisted coding of your occupational titles into HISCO, a bibliography on the world of work and links to related websites, information on the social class scheme HISCLASS",
              "creators": "[ HISCO]",
              "parents": [
                {
                  "id": "step_Rv_121017"
                }
              ],
              "category": "project",
              "resType": "database"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "WYXSPBCA",
              "_score": 0.9850221,
              "type": "resource",
              "title": "HISCAM",
              "url": "http://www.hisma.org/HISMA/HISCAM.html",
              "abstract": "The 'HISCAM' or 'historical CAMSIS' project is concerned with deriving a measure of occupational stratification for the 19th and early 20th centuries. Using historical data resources obtained from marriage registers, family histories and census datasets, this project analyses inter-generational patterns of occupational social associations, to derive CAMSIS scales for historical occupational records, using the HISCO occupational coding scheme.",
              "creators": "[Ineke Maas, Marco van Leeuwen]",
              "parents": [
                {
                  "id": "step_Rv_121017"
                }
              ],
              "category": "project",
              "resType": "database"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "Y9J5QM7B",
              "_score": 0.85404384,
              "type": "resource",
              "title": "ISCO - International Standard Classification of Occupations",
              "url": "http://www.ilo.org/public/english/bureau/stat/isco/isco08/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_Rv_121017"
                }
              ],
              "category": "general",
              "resType": "specification"
            }
          ]
        },
        {
          "_index": "ssk",
          "_type": "_doc",
          "_id": "step_CViS_121017",
          "_score": 1.505671,
          "stepDesc": [
            {
              "lang": "en",
              "content": "Perform Exploratory Factor Analysis (EFA)"
            }
          ],
          "lastUpdate": "2019-04-12T07:29:13Z",
          "author": {
            "forename": "Emilie",
            "affiliation": "DANS",
            "surname": "Kraikamp"
          },
          "head": [
            {
              "lang": "en",
              "content": [
                {
                  "part": "Combine variables into scales"
                }
              ]
            },
            {
              "lang": "fr"
            }
          ],
          "position": 1,
          "GithubRef": "step_CViS_121017",
          "parents": [
            {
              "id": "SSK_sc_statisticalAnalysisOccupations",
              "position": 1
            }
          ],
          "desc": null,
          "title": "Combine variables into scales ",
          "description": "Perform Exploratory Factor Analysis (EFA)",
          "metadata": [
            {
              "link": "http://tadirah.dariah.eu/vocab/index.php?tema=34&/contextualizing",
              "key": "contextualizing",
              "source": "http://tadirah.dariah.eu/",
              "type": "activity"
            }
          ],
          "resources": [
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "VAAKZ6JI",
              "_score": 0.9850221,
              "type": "resource",
              "title": "Books related to R",
              "url": "https://www.r-project.org/doc/bib/R-books.html",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "bibliography"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "I828B5GI",
              "_score": 0.9850221,
              "type": "resource",
              "title": "SPSS homepage",
              "url": "https://www.ibm.com/analytics/de/de/technology/spss/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tool"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "QP9WMGDS",
              "_score": 0.85404384,
              "type": "resource",
              "title": "The R Manuals",
              "url": "https://cran.r-project.org/manuals.html",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tutorial"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "PENH8EZE",
              "_score": 0.85404384,
              "type": "resource",
              "title": "The R Journal",
              "url": "https://journal.r-project.org/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "paper"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "S5BQ68HQ",
              "_score": 0.85404384,
              "type": "resource",
              "title": "JASP",
              "url": "https://github.com/jasp-stats/jasp-desktop",
              "period": "\"2019-02-14T11:51:39Z\"",
              "abstract": "JASP aims to be a complete statistical package for both Bayesian and Frequentist statistical methods, that is easy to use and familiar to users of SPSS",
              "creators": "[ JASP Team]",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": ""
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "P3WVDB2Z",
              "_score": 0.85404384,
              "type": "resource",
              "title": "PSPP manual",
              "url": "https://www.gnu.org/software/pspp/manual/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tutorial"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "2PCNPUUG",
              "_score": 0.85404384,
              "type": "resource",
              "title": "STATA webpage",
              "url": "http://www.stata.com/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tool"
            }
          ]
        },
        {
          "_index": "ssk",
          "_type": "_doc",
          "_id": "step_TfRotS_121017",
          "_score": 1.505671,
          "stepDesc": [
            {
              "lang": "en",
              "content": "Perform Reliability Analysis"
            }
          ],
          "lastUpdate": "2019-04-10T14:16:15Z",
          "author": {
            "forename": "Emilie",
            "affiliation": "DANS",
            "surname": "Kraikamp"
          },
          "head": [
            {
              "lang": "en",
              "content": [
                {
                  "part": "Test for reliability of the scales"
                }
              ]
            },
            {
              "lang": "fr"
            }
          ],
          "position": 2,
          "GithubRef": "step_TfRotS_121017",
          "parents": [
            {
              "id": "SSK_sc_statisticalAnalysisOccupations",
              "position": 2
            }
          ],
          "desc": null,
          "title": "Test for reliability of the scales ",
          "description": "Perform Reliability Analysis",
          "metadata": [
            {
              "link": "http://tadirah.dariah.eu/vocab/index.php?_search_expresion=Meta%3A+Assessing",
              "key": "Meta%3A+Assessing",
              "source": "http://tadirah.dariah.eu/",
              "type": "activity"
            }
          ],
          "resources": [
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "VAAKZ6JI",
              "_score": 0.9850221,
              "type": "resource",
              "title": "Books related to R",
              "url": "https://www.r-project.org/doc/bib/R-books.html",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "bibliography"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "I828B5GI",
              "_score": 0.9850221,
              "type": "resource",
              "title": "SPSS homepage",
              "url": "https://www.ibm.com/analytics/de/de/technology/spss/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tool"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "QP9WMGDS",
              "_score": 0.85404384,
              "type": "resource",
              "title": "The R Manuals",
              "url": "https://cran.r-project.org/manuals.html",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tutorial"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "PENH8EZE",
              "_score": 0.85404384,
              "type": "resource",
              "title": "The R Journal",
              "url": "https://journal.r-project.org/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "paper"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "S5BQ68HQ",
              "_score": 0.85404384,
              "type": "resource",
              "title": "JASP",
              "url": "https://github.com/jasp-stats/jasp-desktop",
              "period": "\"2019-02-14T11:51:39Z\"",
              "abstract": "JASP aims to be a complete statistical package for both Bayesian and Frequentist statistical methods, that is easy to use and familiar to users of SPSS",
              "creators": "[ JASP Team]",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": ""
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "P3WVDB2Z",
              "_score": 0.85404384,
              "type": "resource",
              "title": "PSPP manual",
              "url": "https://www.gnu.org/software/pspp/manual/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tutorial"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "2PCNPUUG",
              "_score": 0.85404384,
              "type": "resource",
              "title": "STATA webpage",
              "url": "http://www.stata.com/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tool"
            }
          ]
        },
        {
          "_index": "ssk",
          "_type": "_doc",
          "_id": "step_MtRbV_121017",
          "_score": 1.505671,
          "stepDesc": [
            {
              "lang": "en",
              "content": "Perform Structural Equation Modelling (SEM)"
            }
          ],
          "lastUpdate": "2019-04-10T14:16:15Z",
          "author": {
            "forename": "Emilie",
            "affiliation": "DANS",
            "surname": "Kraikamp"
          },
          "head": [
            {
              "lang": "en",
              "content": [
                {
                  "part": "Model the relationship between variables"
                }
              ]
            },
            {
              "lang": "fr"
            }
          ],
          "position": 3,
          "GithubRef": "step_MtRbV_121017",
          "parents": [
            {
              "id": "SSK_sc_statisticalAnalysisOccupations",
              "position": 3
            }
          ],
          "desc": null,
          "title": "Model the relationship between variables ",
          "description": "Perform Structural Equation Modelling (SEM)",
          "metadata": [
            {
              "link": "http://tadirah.dariah.eu/vocab/index.php?tema=30&/structural-analysis",
              "key": "structural-analysis",
              "source": "http://tadirah.dariah.eu/",
              "type": "activity"
            }
          ],
          "resources": [
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "3BIQ5K3W",
              "_score": 0.9850221,
              "type": "resource",
              "title": "SPSS AMOS homepage",
              "url": "https://www.ibm.com/fr-en/marketplace/structural-equation-modeling-sem",
              "abstract": "",
              "parents": [
                {
                  "id": "step_MtRbV_121017"
                }
              ],
              "category": "general",
              "resType": "tool"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "VAAKZ6JI",
              "_score": 0.9850221,
              "type": "resource",
              "title": "Books related to R",
              "url": "https://www.r-project.org/doc/bib/R-books.html",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "bibliography"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "QP9WMGDS",
              "_score": 0.85404384,
              "type": "resource",
              "title": "The R Manuals",
              "url": "https://cran.r-project.org/manuals.html",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tutorial"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "PENH8EZE",
              "_score": 0.85404384,
              "type": "resource",
              "title": "The R Journal",
              "url": "https://journal.r-project.org/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "paper"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "S5BQ68HQ",
              "_score": 0.85404384,
              "type": "resource",
              "title": "JASP",
              "url": "https://github.com/jasp-stats/jasp-desktop",
              "period": "\"2019-02-14T11:51:39Z\"",
              "abstract": "JASP aims to be a complete statistical package for both Bayesian and Frequentist statistical methods, that is easy to use and familiar to users of SPSS",
              "creators": "[ JASP Team]",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": ""
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "P3WVDB2Z",
              "_score": 0.85404384,
              "type": "resource",
              "title": "PSPP manual",
              "url": "https://www.gnu.org/software/pspp/manual/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tutorial"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "2PCNPUUG",
              "_score": 0.85404384,
              "type": "resource",
              "title": "STATA webpage",
              "url": "http://www.stata.com/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tool"
            }
          ]
        },
        {
          "_index": "ssk",
          "_type": "_doc",
          "_id": "step_A_121017",
          "_score": 1.505671,
          "stepDesc": [
            {
              "lang": "en",
              "content": "Calculate p-values for significance, by using Analysis of Variance (ANOVA) or regression-analyses"
            }
          ],
          "lastUpdate": "2019-04-12T07:29:13Z",
          "author": {
            "forename": "Emilie",
            "affiliation": "DANS",
            "surname": "Kraikamp"
          },
          "head": [
            {
              "lang": "en",
              "content": [
                {
                  "part": "Analyse"
                }
              ]
            },
            {
              "lang": "fr",
              "content": [
                {
                  "part": "Analyser"
                }
              ]
            }
          ],
          "position": 4,
          "GithubRef": "step_A_121017",
          "parents": [
            {
              "id": "SSK_sc_statisticalAnalysisOccupations",
              "position": 4
            }
          ],
          "desc": null,
          "title": "Analyse ",
          "description": "Calculate p-values for significance, by using Analysis of Variance (ANOVA) or regression-analyses",
          "metadata": [
            {
              "link": "http://tadirah.dariah.eu/vocab/index.php?tema=30&/structural-analysis",
              "key": "structural-analysis",
              "source": "http://tadirah.dariah.eu/",
              "type": "activity"
            }
          ],
          "resources": [
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "VAAKZ6JI",
              "_score": 0.9850221,
              "type": "resource",
              "title": "Books related to R",
              "url": "https://www.r-project.org/doc/bib/R-books.html",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "bibliography"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "I828B5GI",
              "_score": 0.9850221,
              "type": "resource",
              "title": "SPSS homepage",
              "url": "https://www.ibm.com/analytics/de/de/technology/spss/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tool"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "QP9WMGDS",
              "_score": 0.85404384,
              "type": "resource",
              "title": "The R Manuals",
              "url": "https://cran.r-project.org/manuals.html",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tutorial"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "PENH8EZE",
              "_score": 0.85404384,
              "type": "resource",
              "title": "The R Journal",
              "url": "https://journal.r-project.org/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "paper"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "S5BQ68HQ",
              "_score": 0.85404384,
              "type": "resource",
              "title": "JASP",
              "url": "https://github.com/jasp-stats/jasp-desktop",
              "period": "\"2019-02-14T11:51:39Z\"",
              "abstract": "JASP aims to be a complete statistical package for both Bayesian and Frequentist statistical methods, that is easy to use and familiar to users of SPSS",
              "creators": "[ JASP Team]",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": ""
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "P3WVDB2Z",
              "_score": 0.85404384,
              "type": "resource",
              "title": "PSPP manual",
              "url": "https://www.gnu.org/software/pspp/manual/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tutorial"
            },
            {
              "_index": "ssk",
              "_type": "_doc",
              "_id": "2PCNPUUG",
              "_score": 0.85404384,
              "type": "resource",
              "title": "STATA webpage",
              "url": "http://www.stata.com/",
              "abstract": "",
              "parents": [
                {
                  "id": "step_CViS_121017"
                },
                {
                  "id": "step_TfRotS_121017"
                },
                {
                  "id": "step_MtRbV_121017"
                },
                {
                  "id": "step_A_121017"
                }
              ],
              "category": "general",
              "resType": "tool"
            }
          ]
        }
      ]
    }

  constructor(protected keycloak: KeycloakService) { }

  ngOnInit() {
    console.log(this.keycloak);
    this.keycloak.isLoggedIn().then(
      (res) => {
        console.log(res);
        if ( !res) {
          this.keycloak.login();
        } else {
           this.keycloak.loadUserProfile(true).then((result) => {
             console.log(result);
           });
        }
      });
  }

}


