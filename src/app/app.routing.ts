import { Routes } from '@angular/router';
import { QueryComponent } from './master/query/query.component';
import { ViewQueryComponent } from './master/view-query/view-query.component';

export const AppRoutes:Routes = [
	{
		path:'',
		redirectTo:'query',
		pathMatch:'full'
	},
	{
		path: 'query',
		component : QueryComponent
	},
	{
		path: 'query/:docId',
		component : QueryComponent
	},
	{
		path: 'show',
		component : ViewQueryComponent
	},
	{
		path : '**',
		redirectTo:'query',
		pathMatch:'full'
	}
];