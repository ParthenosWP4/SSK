import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'resourceType'
})
export class ResourceTypePipe implements PipeTransform {

  resourceTypes  = [
    {
      'ident': 'spec',
      'ident2': 'specification',
      'ident3': 'schema',
      'gloss.en': 'Specification',
      'gloss.fr': 'Spécification'
    },
    {
      'ident': 'report',
      'gloss.en': 'Report',
      'gloss.fr': 'Rapport'
    },
    {
      'ident': 'blog',
      'gloss.en': 'Blog',
      'gloss.fr': 'Article de blog'
    },
    {
      'ident': 'code',
      'ident2': 'code_script',
      'gloss.en': 'Scripts and code',
      'gloss.fr': 'Scripts et code'
    },
    {
      'ident': 'paper',
      'ident2': 'article',
      'gloss.en': 'Scholarly paper',
      'gloss.fr': 'Publication scientifique'
    },
    {
      'ident': 'library',
      'gloss.en': 'Computing library',
    },
    {
      'ident': 'database',
      'gloss.en': 'Database',
      'gloss.fr': 'Base de donnée',
    },
    {
      'ident': 'tutorial',
      'gloss.en': 'Tutorial',
      'gloss.fr': 'Tutoriel',
    },
    {
      'ident': 'tool',
      'gloss.en': 'Computing tool, software',
      'gloss.fr': 'Logiciel, outil computationnel',
    },
    {
      'ident': 'service',
      'gloss.en': 'Curating of hosting service',
      'gloss.fr': 'Offre de service de curation ou d\'hébergement',
    },
    {
      'ident': 'bibliography',
      'gloss.en': 'Bibliography',
      'gloss.fr': 'Bibliographie',
    },
    {
      'ident': 'community',
      'gloss.en': 'Community',
      'gloss.fr': 'Communauté',
    },
    {
      'ident': 'webpage',
      'ident2': 'website',
      'gloss.en': 'Web Site',
      'gloss.fr': 'undefined',
    },
    {
      'ident': 'book',
      'gloss.en': 'Books',
      'gloss.fr': 'Livres',
    },
    {
      'ident': 'documentation',
      'gloss.en': 'undefined2',
      'gloss.fr': 'undefined',
    },
  ];
  transform(value: string): string {
    const result = (_.find(this.resourceTypes, item => {
      return item.ident === value.toLowerCase() || item.ident2 === value.toLowerCase();
  }));
    return (result !== undefined) ?  result['gloss.en'] : null;
  }
}
