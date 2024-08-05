import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { CreateEditContactComponent } from "./create-edit-contact/create-edit-contact.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ContactListComponent
    },
    {
        path: 'create',
        component: CreateEditContactComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
