import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
//import * as Octokit from '../assets/js/octokit-rest.js';

declare var Octokit: any;




@Injectable()
export class GithubService {




headers = new Headers();
clientWithAuth = new Octokit({
});
  constructor(private http: Http) {
    //this.githubRepo = gh.getRepository()
    //this.gh = new Octokit();
  }

createFile(dat: string) {
  this.clientWithAuth.repos.list(
    {
      username: 'SSKcommitter'
    }
  ).then(({ data, headers, status }) => {
    console.log(data);
  });

}

}


