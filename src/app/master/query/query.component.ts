import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute,ActivatedRouteSnapshot } from '@angular/router';

import { QueryService } from './../service/query.service';

declare interface modelData {
	title:string,
	summery:string,
	answer:string
}

declare var $:any;

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

	public options: Object = {
		placeholderText: 'Edit Your Content Here!',
		toolbarButtons: [	'undo', 'redo' , '|', 'bold', 'italic', 'underline', '|',
							'align','formatOL','formatUL','outdent', 'indent', '|', 
							'insertLink', 'paragraphFormat', 'html','clearFormatting','fullscreen'
						],
		toolbarButtonsXS: [	'undo', 'redo' , '|', 'bold', 'italic', 'underline', '|',
							'align','formatOL','formatUL','outdent', 'indent', '|', 
							'insertLink', 'clearFormatting'
						  ],
		toolbarButtonsSM: [	'undo', 'redo' , '|', 'bold', 'italic', 'underline', '|',
							'align','formatOL','formatUL','outdent', 'indent', '|', 
							'insertLink', 'clearFormatting'
						  ],
		toolbarButtonsMD: [	'undo', 'redo' , '|', 'bold', 'italic', 'underline', '|',
							'align','formatOL','formatUL','outdent', 'indent', '|', 
							'insertLink', 'paragraphFormat', 'clearFormatting'
						  ],

		heightMin: 150,
		heightMax: 150
	};
	dataModel:modelData = {
		title:'',
		summery:'',
		answer:''
	};

	constructor( private queryServ:QueryService, private routes: Router, private actvRoutes: ActivatedRoute ) { }

	ngOnInit() {
		let docId = this.actvRoutes.snapshot.params['docId'];
		console.log(docId);
		if(docId){
			this.queryServ.getQuery(docId)
			.subscribe(res=>{
				if (res.code==0) {
					this.dataModel = {
						title : res.list[0].title || '',
						summery: res.list[0].query || '',
						answer: res.list[0].answer || ''
					};
				}
			})
		}
	}
	save(form:NgForm){
		console.log(this.dataModel);
		if(form.valid){
			if(this.dataModel.title){
				let data = {
					title : this.dataModel.title,
					query: this.dataModel.summery || '',
					answer: this.dataModel.answer || '',
					rowId : this.actvRoutes.snapshot.params['docId']
				}
				this.queryServ.saveQuery(data)
				.subscribe(res=>{
					if(res.code === 0){
						this.resetModel();
						alert(res.message);
					}
				},this.showErrorResoponse)
			}
		}
	}
	resetModel(){
		this.dataModel = {
			title:'',
			summery:'',
			answer:''
		}
		this.routes.navigate(['/show']);
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