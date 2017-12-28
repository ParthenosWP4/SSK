import { Component, OnInit, Input } from '@angular/core';

import { AppService } from './app.service';
import * as ScrapeIt from 'scrape-it';






@Component({
    selector: 'resource',
    templateUrl: 'resource.component.html',
})


export class ResourceComponent  implements OnInit {

    @Input() resource: any;
    extensionFiles: Array<string> = ['zip']
    thumbnail: string
    constructor(private _appService: AppService) {
        this.thumbnail = 'assets/images/sub-resources-img.png'
    }
    ngOnInit() {
        this.resource['useThumbnail'] = false
        switch (this.resource.attr.source) {
            case 'zotero':
                    this._appService.zoteroAPI(('key' in this.resource.attr) ? this.resource.attr.key : 'groups', this.resource.attr.target)
                    .subscribe(data => {
                        Object.assign(this.resource , data)
                        if ( this.extensionFiles.indexOf(this.resource.data.url.split('.').pop()) !== -1) {
                            this.resource['useThumbnail'] = true
                        }
                        this.shortedElement(this.resource)
                    },
                    err => console.log(err),
                );
                break;
            case 'github':
                this.resource['useThumbnail'] = true
                this.thumbnail = 'assets/images/github-logo.png'
                ScrapeIt('https://cors-anywhere.herokuapp.com/' + this.resource.attr.target, {
                    title : 'title',
                    creatorSummary: '.author'
                }).then(page => {
                    this.resource['key'] = 'none'
                    this.resource['data'] = {
                        'title': page.title,
                        'url' : this.resource.attr.target
                    }
                    this.resource['meta'] = {
                        'creatorSummary': page.creatorSummary
                    }
                    this.shortedElement(this.resource)
                });
            break;
            case 'hal':
                this._appService.halAPI(this.resource.attr.target)
                .then(data => {
                    Object.assign(this.resource, this._appService.handleHALData(data))
                    this.shortedElement(this.resource)},
                    err => console.log(err),
                );
            break;
            default:
                this.resource['key'] = 'none'
                this.resource['data'] = {
                    'title': '',
                    'url': (this.isUrl(this.resource.attr.target)) ? this.resource.attr.target : '#'
                }
                this.resource['meta'] = {
                    'creatorSummary' : ''
                }
                this.shortedElement(this.resource)
            break;
        }
    }

    transform(url) {
        return this._appService.transformUrl (url);
    }

   getExtension(url: string) {
      return (url.split('.').pop() in this.extensionFiles)
   }

   isUrl(url: string) {
       if ( url === undefined ) {
           return false
       }
       return (url.length > 4 && url.indexOf('http') === 0 )
   }

   redirect(url) {
    window.open(url, '_blank');
   }

   shortedElement(resource: any) {
     resource.data.url = this.http2Https(resource.data.url)
        resource.data.shortTitle = resource.data.title
        resource.meta.shortAuthors = resource.meta.creatorSummary
        if ((resource.data.title).length > 40) {
            resource.data.shortTitle = (resource.data.title).substring(0, 35) + '...';
        }
        if (resource.meta.creatorSummary  &&  (resource.meta.creatorSummary).length > 40) {
            resource.meta.shortAuthors = (resource.meta.creatorSummary).substring(0, 35) + '...';
        }
        return resource
    }

    http2Https (url: string) {
        if (url.indexOf('https') === -1 ) {
            url.replace('http', 'https')
        }
        return url
    }

}


