import { Component, OnInit, Input , Renderer2, QueryList, ElementRef,
  ViewChildren, ChangeDetectorRef} from '@angular/core';
import { ElastichsearchService } from '../../elastichsearch.service';
import { SskService } from '../../ssk.service';
import * as _ from 'lodash';
import { DataContributionService } from '../tag/data-contribution.service' ;

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {


  @Input() tag_type: string;
  @Input() tag_content: string;
  @Input() teiMeta: any;
  @Input() inStep: any;
  @Input() displaySelectedTag: any;
  @Input() inStepContribute: any;



  @ViewChildren('disciplines') disciplineTagQueryList: QueryList<ElementRef>;
  @ViewChildren('techniques')  techniqueTagQueryList: QueryList<ElementRef>;
  @ViewChildren('objects')     objectTagQueryList: QueryList<ElementRef>;
  @ViewChildren('activities')  activityTagQueryList: QueryList<ElementRef>;
  @ViewChildren('standards')   standardTagQueryList: QueryList<ElementRef>;

  public standardsArray    = this.simpleService.standardSelectedTagArray;
  public activitySelected  = this.simpleService.actvity_name;

  disciplineTagClicked = [];
  techniqueTagClicked  = [];
  objectTagClicked     = [];
  activityTagClicked   = [];
  standardTagClicked   = [];

  idTabs = {};
  item: any;
  data: any;
  spinner = true;

  objectsList: any;
  disciplinesList: any;
  techniquesList: any;
  activitiesList: any;
  standardsList: any;


  TagsTypeList       = ['objects', 'techniques', 'disciplines', 'standards', 'activities'];

  constructor(private sskServ: SskService,
              private renderer: Renderer2,
              private cdr: ChangeDetectorRef,
              private elastiServ: ElastichsearchService,
              public simpleService: DataContributionService,
              ) { }

  ngOnInit() {


      _.forEach(this.TagsTypeList, (item) => {
        this.elastiServ.glossaryChange(item).then(
          (value) => {
            switch (item) {
              case 'disciplines':
                  this.disciplinesList  = value;

                  this.disciplinesList.forEach(function (elt, index) {
                    elt.active = false;
                    elt.type   = 'discipline';
                  });
              break;
              case 'techniques':
                  this.techniquesList  = value;

                  this.techniquesList.forEach(function (elt) {
                    elt.active = false;
                    elt.type   = 'technique';
                  });
              break;
              case 'objects':
                  this.objectsList  = value;
                  // console.log('this.objectsList   =', this.objectsList);

                  this.objectsList.forEach(function (elt) {
                    elt.active = false;
                    elt.type   = 'object';
                  });
              break;
              case 'activities':
                  this.activitiesList  = value;
                  console.log('this.activitiesList   =', this.activitiesList);
                  this.activitiesList.forEach(function (elt) {
                    _.map(elt.items, (obj) => {
                      obj.active = false;
                      obj.type   = 'activity';
                    });
                  });
              break;
              case 'standards':
                  this.standardsList   = value;
                  console.log('this.standardsList    =', this.standardsList );
                  this.standardsList .forEach(function (elt) {
                    elt.isTagChecked = false;
                    elt.active    = false;
                    elt.type      = 'standard';
                  });
              break;
            }
          }
        );
      }
    );
  }

  toggleClass(item: any, id: string,  $event: any ) {

    item.active = !item.active;
    // console.log('toggleClass item=', item);
    console.log('toggleClass item      =', item);
    console.log('toggleClass item.type =', item.type);

    let clickedTab, queryList, idParent ;
    switch (item.type) {
        case 'discipline':
            clickedTab =  this.disciplineTagClicked;
            queryList  =  this.disciplineTagQueryList;
            console.log( 'this.disciplineTagQueryList =', this.disciplineTagQueryList);
            idParent   = 'id39';
        break;
        case 'technique':
            clickedTab =  this.techniqueTagClicked;
            queryList  =  this.techniqueTagQueryList;
            idParent   = 'id43';
        break;
        case 'object':
            clickedTab =  this.objectTagClicked;
            queryList  =  this.objectTagQueryList;
            idParent   = 'id47';
        break;
        case 'activity':
            clickedTab =  this.activityTagClicked;
            queryList  =  this.activityTagQueryList;
            console.log('this.activityTagClicked          = ', this.activityTagClicked );
            console.log('this.activityTagQueryList        = ', this.activityTagQueryList);
            console.log('this.activityTagQueryList.length = ', this.activityTagQueryList.length);

            idParent   = 'id40';
        break;
        case 'standard':
            clickedTab =  this.standardTagClicked;
            queryList  =  this.standardTagQueryList;
            console.log('this.standardTagQueryList        =', this.standardTagQueryList);
            console.log('this.standardTagQueryList.length =', this.standardTagQueryList.length);

            idParent   = 'id53';
        break;
    }
    if (item.active === true ) {
      if ( clickedTab.length === 0  ) {
            this.teiMeta.setText(event, id, false);
        } else {
              console.log('---- idParent =', idParent);
              this.teiMeta.createEC(event, idParent);
              this.teiMeta.setText(event, 'id' + (this.teiMeta.getLastExport() - 1), false );
      }
    if (item.type === 'discipline') { this.disciplineTagClicked.push(item.name); }
    if (item.type === 'technique')  { this.techniqueTagClicked.push(item.name); }
    if (item.type === 'object')     { this.objectTagClicked.push(item.name); }
    if (item.type === 'activity')   { this.activityTagClicked.push(item.term);
                                      this.simpleService.methodCall2(item.term);
                                    }
    // if (item.type === 'standard')   { this.standardTagClicked.push(item.name); }


  } else {
      this.teiMeta.setText(event, id, true);
      clickedTab.splice(clickedTab.indexOf(item.name), 1 );
      if (item.type === 'discipline') {  this.disciplineTagClicked = clickedTab; }
      if (item.type === 'technique')  {  this.techniqueTagClicked  = clickedTab; }
      if (item.type === 'object')     {  this.objectTagClicked     = clickedTab; }
      if (item.type === 'activity')   {  this.activityTagClicked   = clickedTab; }
      if (item.type === 'standard')   {  this.standardTagClicked   = clickedTab; }

  }


    queryList.forEach(element => {
      this.cdr.detectChanges();

      // console.log('----- element.nativeElement = ', element.nativeElement);
      // console.log('-----  element.nativeElement.nextElementSibling = ', element.nativeElement.nextElementSibling);

      if ( element.nativeElement.nextElementSibling !== null && item.type !== 'activity') {
        console.log('======= item.type = ', item.type );

          if ( !( element.nativeElement.nextElementSibling.classList.contains('active')) && clickedTab.length === 4) {
                this.renderer.addClass(element.nativeElement.nextElementSibling, 'disabled-button');
                this.renderer.setAttribute(element.nativeElement.nextElementSibling, 'disabled' , 'true');
          } else if ( !( element.nativeElement.nextElementSibling.classList.contains('active')) && clickedTab.length < 4 ) {
                  this.renderer.removeAttribute(element.nativeElement.nextElementSibling, 'disabled');
                  this.renderer.removeClass(element.nativeElement.nextElementSibling, 'disabled-button');
          } else {
                this.renderer.removeClass(element.nativeElement.nextElementSibling, 'disabled-button');
          }
      }

      // activity tags
      if ( item.type === 'activity') {


        /*
        console.log('======= item.type = ', item.type );

        console.log('======= selected activity              = ', item);
        console.log('======= item.active                    = ', item.active);
        console.log('======= element                        = ', element);
        console.log('======= element.nativeElement          = ', element.nativeElement);
        console.log('======= element.nativeElement.children = ', element.nativeElement.children);
         */

        for (const btnActivity of element.nativeElement.children ) {

             if ( clickedTab.length === 1 && !btnActivity.classList.contains('active') ) {
                console.log('btnActivity            =', btnActivity );
                console.log(' btnActivity.innerText =', btnActivity.innerText);
                // this.activitySelected.name = btnActivity.innerText;
                this.renderer.addClass(btnActivity, 'disabled-button');
                this.renderer.setAttribute(btnActivity,  'disabled' , 'true');

            } else if ( clickedTab.length < 1 && !btnActivity.classList.contains('active') ) {
                // this.activitySelected.name = '';
                this.renderer.removeAttribute(btnActivity, 'disabled');
                this.renderer.removeClass(btnActivity, 'disabled-button');
            } else {
              // this.renderer.removeClass(btnActivity, 'disabled-button');

          }
        }

      }


   }
  );
}

// checkbox
public change($event) {

  if ($event.currentTarget.checked === true && !(this.simpleService.standardSelectedTagArray.includes($event.currentTarget.value)) ) {

    console.log('$event.currentTarget                               =', $event.currentTarget );

    // data service contenant les tag selectionnnés
    this.standardsArray.push($event.currentTarget.value);
    console.log('this.standardsArray        =', this.standardsArray );


  }else {

    const idx = this.standardsArray.indexOf( $event.currentTarget.value);
    this.standardsArray.splice(idx, 1);
    console.log('this.standardsArray       =', this.standardsArray);

    }

  }

}
