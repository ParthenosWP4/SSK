import {  Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/throw';
import { Scenario} from './ScenarioObject';
import * as xml2js from 'xml2js';
import * as _ from 'lodash'
import * as jsPath from 'jsonpath';
import {Subject} from 'rxjs/Subject';
import {environment} from '../environments/environment'
import { DomSanitizer} from '@angular/platform-browser';


declare var _scenarioTab: IDictionary  ;

@Injectable()
export class AppService {
    public _scenarioTab = {}
    _scenarioList: Array<any> = []
    constentList: Array<any> = []
    _scenario: Observable<any> = null
    private result: Array<any> = []
    public _stepArray = {}
    options: any
    parser: any
    stepContent: any
    params: any = {}
    req = '/contents/scenarios/'
    currentStep: any = {}
    constructor(private http: Http,  private sanitizer: DomSanitizer) {
        this.stepContent = {}
        this.params = {
            'target': 'github',
            'req': this.req
        }
        this.parser = new xml2js.Parser()
        this.options = new RequestOptions()
        this.options.headers = new Headers()
        this.options.headers.append('Content-Type', 'application/json;charset=utf-8');
    };
    transformUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }

    getScenarios() {
        this.params = {
            'target': 'github',
            'req': '/contents/scenarios/'
        }
        return this.http.get(this.params)
            .map(response => response.json())
            .do(scenarios => console.log('fetched scenarios'))
            .publishReplay(1)
            .refCount()
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    };

    getScenario(scenarioName: String) {
        this.params = {
            'target': 'github',
            'req': this.req
        }
        this.options.headers.append('Accept', 'application/vnd.github.VERSION.raw')
            this.params.req = this.params.req + scenarioName
            return this.http.get(this.params, this.options)
                .map(response =>  response.text())
                .publishReplay(1)
                .refCount()
                .catch((error: any) => Observable.throw(error || 'Server error'))
    };

    parseData(data: string) {
        let parsedData = {}
        data = data.replace('\ufeff', '')
        this.parser.parseString(data, function (err, result) {
            try {
                parsedData = JSON.parse(JSON.stringify(result).replace(/\$/g, 'attr')
                    .replace(/xml:id/g, 'xmlId').replace(/spec\$/g, 'specification'))
               // console.log(parsedData)

            }
            catch(err) {
                console.log(err);
            }
        });
        return parsedData;
    }

    createObject(data: string, scenarioName: String) {
        let scenarioContent: {};
        let scenarioElt = new Scenario();
        let tab: Array<any>
        let desctab: any
        let key: string
        scenarioContent = this.parseData(data)
        scenarioElt.name = scenarioName;
        // Need to reviwe this SSK_sc_schemaCustomization.xml
        scenarioName = scenarioName.split('.')[0]
        console.log(scenarioName)
        scenarioElt.id = scenarioName.split('_')[1] + '_' + scenarioName.split('_')[2]
        scenarioElt.urlImage = jsPath.query(scenarioContent, '$..graphic[0].attr.url')[0]
        //console.log(scenarioElt)
        desctab = jsPath.query(scenarioContent, '$..div[0].head[0]')
        if ( desctab[0] !== '') {
            for ( let item in desctab) {
                key = jsPath.query(desctab[item],'$..["xml:lang"]')[0];
                scenarioElt.title[key] = jsPath.query(desctab[item],'$.._')[0]
             }
        }
        desctab = jsPath.query(scenarioContent, '$..div[0].desc[0]')
        if ( desctab[0] !== '') {
            for (let item in desctab) {
                key = jsPath.query(desctab[item],'$..["xml:lang"]')[0];
                scenarioElt.desc[key] = jsPath.query(desctab[item],'$.._')[0]
             }
        }
        tab =  jsPath.query(scenarioContent, '$..event')[0];
       // scenarioElt['stepKeys'] : Array<strng>
        for( let entry  in tab){
            scenarioElt.stepKeys.push(jsPath.query(tab[entry], '$..ref')[0])

        }

        return scenarioElt


    }

    getSteps(stepKeys: Array<string>) {
       const  observables: Array<Observable<any>> = []
       stepKeys.forEach(element => {
            observables.push(this.getStepContent(element))
       });
       return observables
    }

    getStepContent(stepReference: String) {
        this.params = {
            'target': 'github',
            'req': '/contents/steps/' + stepReference + '.xml'
        }
            return this.http.get(this.params, this.options)
                .map(response => this.handleStepContent(response.text()))
                .publishReplay(1)
                .refCount()
                .catch((error: any) => Observable.throw(error || 'Server error'))
     }

    handleStepContent(data: string) {
        let stepContent:any = {}
        let desc :any ={}
        let head :any ={}
        let key :string
        let desctab :any
        let jsonstepContent = this.parseData(data)
        /* head extraction  */  
        desctab = jsPath.query(jsonstepContent, '$..head')
        if(desctab[0] !==''){
            desctab.forEach(element => {
                element.forEach(elt => {
                    key = jsPath.query(elt,'$..["xml:lang"]');
                    head[key] = jsPath.query(elt,'$.._')[0]
                });
            });
        }
        
        /* Description extraction  */  
        desctab = jsPath.query(jsonstepContent, '$..desc[?(@.attr.type == "definition")]')
        if(jsPath.query(jsonstepContent, '$..expan').length >0){
            for (let item in desctab) {
                key = jsPath.query(desctab[item],'$..["xml:lang"]')[0]
                desc[key] = jsPath.query(desctab[item], '$..abbr[0]')[0]+ "" + (desctab[item]._).split(/\n/)[0].slice(0, -1)+ ""+
                                jsPath.query(jsonstepContent, '$..expan[0]')[0]+"."+(desctab[item]._).substring(desctab[item]._.split(/\n/)[0].length).trim()
             }
        }
        else {
            if(desctab[0] !==''){
                for (let item in desctab) {
                    key = jsPath.query(desctab[item],'$..["xml:lang"]');
                     desc[key] = jsPath.query(desctab[item],'$.._')[0]
                 }
            }
            else{
                desc = ""
            }
            
        }
           
        /* Description extraction  */
        let headTerms = jsPath.query(jsonstepContent, '$..event..desc..term')[0]
        

         /*Resources retrieving*/
         
        let resourcesContent = jsPath.query(jsonstepContent, '$..linkGrp')
        let resources = this.resourcesExtraction(resourcesContent)
       
        stepContent = {
            'head': head,
            'desc': desc,
            'headTerms':headTerms,
            'resources':resources,
            'completedDesc': true, 
            'completed': (_.keys(resources).length == 0) ? false : true
        }
        return stepContent;
    }

    resourcesExtraction(resources: any) {
        if (resources === '') {
            return {}
        }
        let generals: any = jsPath.query(resources, '$..[?(@.attr.type == "generalResources")]')[0]
        const projectArray: any = jsPath.query(resources, '$..[?(@.attr.type == "projectResources")]')
        let projects: any
        let generalKeys: any = {}
        if ( generals) {
            generalKeys = _.uniq(generals.ref.map( function(obj) {
                return obj.attr.type;
            }))
            generals =  _.groupBy(generals.ref, function(item) {
                    return item.attr.type
            })
        }
        const projectsKeys = []
        const projectsNestedKeys = []
        if( projectArray.length > 0) {
            projects = {}
            projectArray.forEach(element => {
                projectsKeys.push({
                    'elt': element.attr.source,
                    'corresp': element.attr.corresp
                })
                projects[element.attr.source] = element.ref
             });
        }
        return {
            'generals': generals,
            'projects': projects,
            'keys': {
                'generals': generalKeys,
                'projects': projectsKeys,
                'nestedKeysProjects': projectsNestedKeys
            }
        }
    }

    zoteroAPI(type: string, resourceId: string) {
        this.params = {
            'target': 'zotero',
            'req': type + '/427927/items/' + resourceId
        }
        return this.http.get(this.params, this.options)
            .map(response => response.json())
            .do(resource => console.log('resource fetched'))
            .publishReplay(1)
            .refCount()
            .catch((error: any) => Observable.throw(error || 'Server error'))
    }

    handleResource(content: any) {
        return content
    }

    halAPI(target: string){
        let _self = this
        var req = {
            method: 'GET',
            url: environment.hal+'search/?q=docid:'+target+'&fl=docid,docType_s,keyword_s,uri_s,authLastNameFirstName_s,title_s,producedDate_s',
            headers: {
              'Content-Type': 'text/plain'
            },
        }

        return $.ajax(req)
            .promise()
            .then(data => {return data; }
        );
    }

    handleHALData(data: any) {
        let creatorSummary = ''
        jsPath.query(data, '$..authLastNameFirstName_s').forEach(element => {
            creatorSummary += element + ' '
        });
        const halResult: any = {
                'key': jsPath.query(data, '$..docid[0]'),
                'data': {
                    'url': jsPath.query(data, '$..uri_s')[0],
                    'title': jsPath.query(data, '$..title_s[0]')[0]
                },
                'meta': {
                    'creatorSummary': creatorSummary
                }
        }
        return halResult
    }

    getList() {
        this.params = {
            'target': 'github',
            'req': '/contents/listScenarios/scenariosStepsSSK2.json'
        }
        this.options.headers.append('Accept', 'application/vnd.github.VERSION.raw')
        return this.http.get(this.params, this.options)
            .map(response => response.json())
            .publishReplay(1)
            .refCount()
            .catch((error: any) => Observable.throw(error || 'Server error'))
    }
}

interface IDictionary {
    [key: string]: Scenario;
}