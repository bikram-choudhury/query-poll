import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as _ from 'underscore';

@Injectable()
export class QueryService {

	host = '//localhost:4080';
	
	constructor(private https: Http) { }
	
	saveQuery(data:any):Observable<any>{
		if (!_.isEmpty(data)) {
			let hostApi = this.host+"/api/save",
				header = new Headers({'content-type': 'application/json'}),
				option = new RequestOptions({headers: header});
			return this.https.post(hostApi,JSON.stringify(data),option)
					.map(response=>{
						if(response.status == 200 && response.statusText == 'OK'){
							return response.json();
						}
					})
					.catch(err=>{
						let errRes = {
							status: err.status,
							statusText: err.statusText,
							type: err.type,
							url: err.url
						};
						return Observable.throw(errRes);
					})
		}
	}

	getQuery(docId:string):Observable<any>{

		return this.https.get(this.host+"/api/"+docId)
				.map(response=>{
					if(response.status == 200 && response.statusText == 'OK'){
						return response.json();
					}
				})
				.catch(err=>{
					let errRes = {
						status: err.status,
						statusText: err.statusText,
						type: err.type,
						url: err.url
					};
					return Observable.throw(errRes);
				})
	}
	deleteQuery(rowId:string):Observable<any>{
		if(rowId){
			let hostApi = this.host+"/api/"+rowId;
			return this.https.delete(hostApi)
					.map(response=>{
						if(response.status == 200 && response.statusText == 'OK'){
							return response.json();
						}
					})
					.catch(err=>{
						let errRes = {
							status: err.status,
							statusText: err.statusText,
							type: err.type,
							url: err.url
						};
						return Observable.throw(errRes);
					})
		}
	}
}
