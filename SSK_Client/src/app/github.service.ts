import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import * as   format from '../../node_modules/xml-formatter';

declare var Octokit: any;


@Injectable()
export class GithubService {



  translationClient: any;
  clientWithAuth = new Octokit({
    auth: 'token tokenCode'
  });

  constructor(private http: Http) {

  }

  createFile(dat: string, type: string) {
    dat = format(dat);
    const fileName = ((type === 'scenario') ? 'SSK_sc' : 'SSK_st') + Date.now() + '.xml';
    const path = 'drafts/' + ((type === 'scenario') ? 'scenariosDrafts' : 'stepsDrafts') + '/' + fileName;
    return new Promise((resolve, reject) => {
      this.clientWithAuth.repos.createFile({
        owner: 'ParthenosWP4',
        repo: 'SSK',
        path: path,
        message: 'Commit of File' + fileName,
        content: btoa(dat),
        committer: {
          name: 'SSKCommitter',
          email: 'ssk@inria.fr'
        }
      }).then(({ data, headers, status }) => {
        resolve(true);
      })
        .catch(({ error }) => {
          resolve(false);
        });
    });

  }

  getStandardFile() {
    return new Promise((resolve, reject) => {
      this.clientWithAuth.repos.getContents({
        owner: 'ParthenosWP4',
        repo: 'SSK',
        path: 'standardsKB/standards.json',
      }).then(({ data, headers, status }) => {
        resolve(data);
      })
        .catch(({ error }) => {
          resolve(false);
        });
    });
  }

  updateStandard(sha: string, updatedContent: any, standardShortName: string) {
    return new Promise((resolve, reject) => {
      this.clientWithAuth.repos.updateFile({
        owner: 'ParthenosWP4',
        repo: 'SSK',
        path: 'standardsKB/standards.json',
        message: 'Add new standard \"' + standardShortName + '\"',
        content: btoa(unescape(encodeURIComponent(updatedContent))),
        committer: {
          name: 'SSKCommitter',
          email: 'ssk@inria.fr'
        },
        sha: sha,
      }).then(({ data, headers, status }) => {
        console.log(data);
        resolve(true);
      })
        .catch(({ error }) => {
          resolve(false);
        });
    });
  }
}



