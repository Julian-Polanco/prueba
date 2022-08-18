import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError } from "rxjs/operators";
import { Endpoint } from "src/app/config/endpoints";

@Injectable({
  providedIn: "root",
})
export class HttpClientService {

  constructor(private http: HttpClient) {}

  get<T>(
    endpoint: Endpoint,
    pathParams?: Map<string, string>,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      responseType?: "json";
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean
    }
  ): Observable<T> {
    return this.handleErrors(
      this.http.get<T>(
        this.getUrl(endpoint, pathParams),
        this.getOptions(false, options)
      )
    );
  }

  post<T>(
    endpoint: Endpoint,
    body: any | null,
    pathParams?: Map<string, string>,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      responseType?: "json";
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean
    }
  ): Observable<T> {
    return this.handleErrors(
      this.http.post<T>(
        this.getUrl(endpoint, pathParams),
        body,
        this.getOptions(false, options)
      )
    );
  }

  private handleErrors<T>(requestObservable: Observable<T>): Observable<T> {
    return requestObservable.pipe<T>(
      catchError<T, Observable<T>>((error: any) => {
        return of(error);
      })
    );
  }

  private getUrl(endpoint: Endpoint, pathParams?: Map<string, string>): string {
    let endpointV = `${endpoint.baseUrl}/${endpoint.path}`;
    if (pathParams != undefined) {
      for (const [key, value] of pathParams) {
        endpointV = endpointV.replace(`{${key}}`, value);
      }
    }
    return endpointV;
  }

  private getOptions(
    authenticate: boolean,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      responseType?: "json";
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean
    }
  ): {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    responseType?: "json";
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean
  } {
    if (!options) {
      options = {};
    }

    if (authenticate !== false) {
      options.headers = this.getHeaders(options.headers);
    }
    return options;
  }

  private getHeaders(
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
  ):
    | HttpHeaders
    | {
        [header: string]: string | string[];
      } {
    if (!headers) {
      headers = new HttpHeaders();
    }

    return headers;
  }
}
