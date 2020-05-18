import { Component, OnInit, Renderer2 } from '@angular/core';
import { SskService } from '../../ssk.service';
import { AddTagComponent } from './add-tag/add-tag.component';
import { GithubService } from '../../github.service';

@Component({
  selector: 'app-add-standard',
  templateUrl: './add-standard.component.html',
  styleUrls: ['./add-standard.component.scss']
})

export class AddStandardComponent implements OnInit {


  title = 'Add Standard';
  constructor(private sskServ: SskService, private renderer: Renderer2, private githubService: GithubService) { }



  items: any[] = [{ 'id': 0, 'value': '' }];
  languagesList = [{ 'item': 'eng', 'label': 'English' },
  { 'item': 'fr', 'label': 'French' },
  { 'item': 'ita', 'label': 'Italian' },
  { 'item': 'deu', 'label': 'German' },
  { 'item': 'esp', 'label': 'Spanish' }
  ];

  garbageIcon = '../../../../assets/images/garbage.svg';
  exclamationIcon = '../../../assets/images/Exclamation_point2.svg';
  descriptionLangIndication = 'you can edit the description in several languages';
  standard: any = {};
  successfulUpdate = false;
  sha: string;
  res: string;
  showSubmit =false;

  tagsList = [];

  editorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '100px',
    width: 'auto',
    minWidth: '545px',
    placeholder: 'Enter text here...',
    translate: 'yes',
    'toolbar': [
      ['undo', 'redo'],
      ['orderedList', 'unorderedList'],
      ['link', 'unlink']
    ]
  };

  ngOnInit() {
    this.sskServ.setTitle('Add new Standard');
    this.title = this.sskServ.getTitle();
  }


  removeDescription(id) {
    document.getElementById('descriptionEditor-' + id).remove();
    this.items.pop();
  }


  copyNgxEditor() {
    this.items.push({ 'id': this.items.length + 1, 'value': '' });
  }

  submitform() {
     this.githubService.getStandardFile().then(
       (value) => {
         const standardsContent: Array<any> = JSON.parse(atob(value['content']));
         this.standard.id = standardsContent.length + 1;
         standardsContent.push(this.standard);
         this.sha = value['sha'];
         this.githubService.updateStandard(this.sha, JSON.stringify(standardsContent, null, 2), this.standard.standard_abbr_name ).then(
           (result) => {
               this.successfulUpdate = !result;
               if (result) {
                this.res = 'The standard  \"' + this.standard.standard_abbr_name + '\" has been successful added ';
                 // Request to Backend to update into ElasticSearch

               } else {
                this.sha = null;
                this.res = 'Something went wrong, please  try again or contact SSK team via  ssk@inria.fr';
               }
           });
       });

  }

  change_checkbox(el) {
    if (el.checked) {
      alert(el.value + ' : checked');
    } else {
      alert(el.value + ' : un-checked');
    }
  }

  selected(item: any) {
  }

  jsonPrettyHighlightToId(jsonobj, id_to_send_to) {
    let json = JSON.stringify(jsonobj, undefined, 2);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'color: darkorange;';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'color: red;';
        } else {
          cls = 'color: green;';
        }
      } else if (/true|false/.test(match)) {
        cls = 'color: blue;';
      } else if (/null/.test(match)) {
        cls = 'color: magenta;';
      }
      return '<span style="' + cls + '">' + match + '</span>';
    });
    document.getElementById(id_to_send_to).innerHTML = json;
  }

  create() {
    let i = 0;
    const elts = document.getElementsByClassName('ngx-editor-textarea');
    for (const entry of this.items) {
      this.standard['standard_desc_' + entry['value']] = elts.item(i++).innerHTML;
    }
    if ( AddTagComponent.tagList.length > 0) {
      this.standard.standard_resources = AddTagComponent.tagList;
    }
  
    this.jsonPrettyHighlightToId(this.standard, 'resDiv');
    this.showSubmit = true;
  }

}
