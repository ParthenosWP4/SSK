import { Component, OnInit, Input, Renderer2  } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {


  public static tagList = [];
  count  = 0;
  tag: string;
  @Input() item_type: string;
  @Input() add_button_type: string;

  exclamationIcon  = '../../../assets/images/Exclamation_point2.svg';

  standardsList = [ 'None',
                    '3ds',
                    'ACSCII',
                    'ALTO-XML',
                    'Apache FOP',
                    'AutoCAD DXF',
                    'BMP',
                    'CEN/TS 16163/2014',
                    'CIDOC-CRM',
                    'CMDI',
                    'COLLADA',
                    'CSS',
                    'CSS Paged Media',
                    'CSV',
                    'Cendari Archival Extension',
                    'DDI',
                    'DM2E',
                    'DUBLIN CORE',
                    'EAC'];

  // test
  standardsSelection = 'Select standard tags';


  constructor( private renderer: Renderer2) { }

  ngOnInit() {
  }

  activateCheckBoxes(count: number) {

    const inputElems = document.getElementsByTagName('input');
    // Desactivate all others checkboxes
    for (let j = 0; j < inputElems.length; j++) {
      if (inputElems[j].type === 'checkbox' && inputElems[j].checked === false ) {
          inputElems[j].disabled = false;
      }
    }
  }

  checkboxes() {

    const inputElems = document.getElementsByTagName('input');
    let count = 0;

    for (let i = 0; i < inputElems.length; i++) {
      if (inputElems[i].type === 'checkbox' && inputElems[i].checked === true ) {
          if (count < 3) {
                count++;
                this.activateCheckBoxes(count);

          }
        //   else {
        //         this.disableCheckBoxes(count);
        //         break;
        //  }
      }
    }
  }

  standardsSearchFilter() {

    let input, filter, ul, li, a, i, txtValue;
    let p: any;

    console.log('standards function');

    input  = document.querySelector( '#standard-input-search' );
    filter = input.value.toUpperCase();
    ul     = document.querySelector( '.standards-list' );
    li     = ul.getElementsByTagName( 'li' );

    for (i = 1; i < li.length; i++) {
        a = li[i].getElementsByTagName( 'a' )[0];

        txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
            $('.no-matching-standards').remove();


        } else {
            li[i].style.display = 'none';

            if (  li.length === $('ul.standards-list li[style*="display: none"]').length + 1
                  && ($('.no-matching-standards').length === 0) ) {

                       p = this.renderer.createElement('p');
                       this.renderer.addClass(p, 'no-matching-standards');
                       this.renderer.setStyle(p, 'color', 'red');
                       p.innerText = 'No standard(s) match your search';
                       this.renderer.appendChild(ul , p);

             } else {
                    $('.no-matching-standards').remove();
             }

        }
    }
}

  addTag() {
    if ( this.tag != null && AddTagComponent.tagList.indexOf( this.tag  ) === -1 && this.tag !== '') {
         AddTagComponent.tagList.push(this.tag);
         this.tag = null;
         console.log(AddTagComponent.tagList);
      }
  }

  deleteTag( spanID: Number, valueTag: String ) {
      _.remove( AddTagComponent.tagList, item => {
        return item === valueTag;
  });
  }

  change_checkbox(el) {
      if (el.checked) {
        alert(el.value + ' : checked');
      }else {
        alert(el.value + ' : un-checked');
      }
  }

  get staticTagList() {
    return AddTagComponent.tagList;
  }


}
