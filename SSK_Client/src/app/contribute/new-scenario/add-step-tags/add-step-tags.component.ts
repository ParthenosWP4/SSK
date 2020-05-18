import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-step-tags',
  templateUrl: './add-step-tags.component.html',
  styleUrls: ['./add-step-tags.component.scss']
})
export class AddStepTagsComponent implements OnInit {


  @Input() tagType: string;
  @Input() tagTextValue: string;


  /*
  public static tagList = [];

  tagList = [ {type:  'activity', value: 'Conversion'},
              {type:  'activity', value: 'Writing'},
              {type:  'standard', value: 'Archiving'},
              {type:  'standard', value: 'Preservation'},
              {type:  'standard', value: 'Modeling'},
            ];
  */

  constructor() { }

  ngOnInit() {
  }


}
