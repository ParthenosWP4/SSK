import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
//import * as Octokit from '../assets/js/octokit-rest.js';

declare var Octokit: any;




@Injectable()
export class GithubService {



AUTHORIZATION_TOKEN = 'token d9d4ac10e58e0ec7b1f0408b63795af68a617416';
headers = new Headers();
clientWithAuth = new Octokit({
  auth: 'token d9d4ac10e58e0ec7b1f0408b63795af68a617416'
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


