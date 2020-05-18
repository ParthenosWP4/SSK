import { Injectable } from '@angular/core';

@Injectable()

export class ResourceContributionService {

  resource_title       = '';
  resource_contributor = '';
  resource_link        = '';
  resource_key         = '';

  constructor() { }

    public getResourceTitle( sourceTitle: string ): string {
        this.resource_title = sourceTitle ;
        console.log( 'resource_title resource service =', this.resource_title );
        return this.resource_title;
    }

    public getResourceUrl( sourceKey: string ): string {
        this.resource_key = sourceKey ;
        return this.resource_key;
    }

    public getResourceZoteroKey( sourceLink: string ): string {
        this.resource_link = sourceLink ;
        return this.resource_link;
    }

    public getResourceContributor( sourceContributor: string ): string {
        this.resource_contributor = sourceContributor ;
        return this.resource_contributor;
    }

}
