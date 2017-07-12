import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import {environment} from "../environments/environment";

@Injectable()
export class InterceptedHttp extends Http {

    public pendingRequests: number = 0;
  public showLoading: boolean = false;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }
    
    private updateUrl(req: string) {
        return  environment.github_origin + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        let username: string = 'Statali';
      let password: string = 'Jesuiscool&calme$6';
      let headers: Headers = new Headers();
      
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json;charset=utf-8');
        }
        options.headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 

        return options;
    }

    /*intercept(observable: Observable<Response>): Observable<Response> {
    console.log("In the intercept routine..");
    this.pendingRequests++;
    return observable
      .catch((err, source) => {
        console.log("Caught error: " + err);
      })
      .do((res: Response) => {
        console.log("Response: " + res);
        this.turnOnModal();
      }, (err: any) => {
        this.turnOffModal();
        console.log("Caught error: " + err);
      })
      .finally(() => {
        console.log("Finally.. delaying, though.")
        var timer = Observable. imer(1000);
        timer.subscribe(t => {
          this.turnOffModal();
        });
      });
    }
  
  private turnOnModal() {
    if (!this.showLoading) {
        this.showLoading = true;
        $('body').spin("modal", "#FFFFFF", "rgba(51, 51, 51, 0.1)");
        console.log("Turned on modal");
    }
    this.showLoading = true;
  }
  
  private turnOffModal() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        $('body').spin("modal", "#FFFFFF", "rgba(51, 51, 51, 0.1)");
      }
      this.showLoading = false;
    }
    console.log("Turned off modal");
  }*/
}

   
