import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppService } from './app.service';
import { HomeComponent } from './/home/home.component';
import { LoginComponent } from './/login/login.component';
import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './lists/list/list.component';
import { ListItemsComponent } from './lists/list-items/list-items.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListsComponent,
    HeaderComponent,
    ListComponent,
    ListItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }


