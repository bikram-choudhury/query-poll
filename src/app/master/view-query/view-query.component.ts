import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { QueryService } from './../service/query.service';
import * as _ from 'underscore';

declare var $:any;

@Component({
  selector: 'app-view-query',
  templateUrl: './view-query.component.html',
  styleUrls: ['./view-query.component.css']
})
export class ViewQueryComponent implements OnInit {

	queryResult:any[] = [];
    queryContent:string;
	constructor( private queryServ:QueryService, private routes:Router ) { }

	ngOnInit() {
		this.queryServ.getQuery('')
		.subscribe(res=>{
			if (res.code==0) {
				this.queryResult = res.list;
			}
		}, this.showErrorResoponse)
	}
    viewQuery(docId:string){
        if(docId){
            let momentry = _.findWhere(this.queryResult,{_id:docId});
            this.queryContent = momentry && momentry.query;
        }
    }
    editQuery(docId:string){
        if(docId){
            this.routes.navigate(['/query',docId]);
        }
    }
    deleteQuery(docId:string){
        if(docId){
            this.queryServ.deleteQuery(docId)
            .subscribe(res=>{
                if(res.code == 0){

                    this.queryContent = "";
                    this.queryResult = _.reject(this.queryResult, function(obj) { 
                        return obj._id === docId; 
                    });
                }
            })
            
        }
    }
    showErrorResoponse(response:any,message?:string){
        
        if(response.type){
            let thiss = this,
            	errEtatus = response.status.toString(),
            	defaultErrorMsg = "Can't able to handel "+errEtatus+" error code. ";
            switch(errEtatus){
                case '0':
                    // this.showNotification('top','right','danger',"CONNECTION REFUSED");
                    alert("CONNECTION REFUSED");
                    break;
                case '400':
                    // this.showNotification('top','right','danger',"BAD REQUEST");
                    alert("BAD REQUEST");
                    break;
                case '401':
                    // this.showNotification('top','right','danger',"DESTINATION UNAUTHORIZED");
                    alert("DESTINATION UNAUTHORIZED");
                    break;
                case '403':
                    // this.showNotification('top','right','danger',"FORBIDDEN");
                    alert("FORBIDDEN");
                    break;
                case '404':
                    // this.showNotification('top','right','danger',"404 NOT FOUND");
                    alert("404 NOT FOUND");
                    break;
                case '408':
                    // this.showNotification('top','right','danger',"REQUEST TIMEOUT");
                    alert("REQUEST TIMEOUT");
                    break;
                case '500':
                    // this.showNotification('top','right','danger',"INTERNAL SERVER ERROR");
                    alert("INTERNAL SERVER ERROR");
                    break;
                case '502':
                    // this.showNotification('top','right','danger',"BAD GATEWAY ERROR");
                    alert("BAD GATEWAY ERROR");
                    break;
                case '503':
                    // this.showNotification('top','right','danger',"SERVICE UNAVAILABLE ERROR");
                    alert("SERVICE UNAVAILABLE ERROR");
                    break;
                case '505':
                    // this.showNotification('top','right','danger'," HTTP VERSION NOT SUPPORTED");
                    alert(" HTTP VERSION NOT SUPPORTED");
                    break;
                default:
                    // this.showNotification('top','right','danger',defaultErrorMsg);
                    alert(defaultErrorMsg);
            }
        }
        
    }
    showNotification(from:string, align:string,type:string,message:string){
        
    }
}
