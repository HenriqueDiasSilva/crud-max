import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Clientes';
  urlLogo = 'https://desenvolvimento.maxdata.com.br/assets/imagens/login/MaxWEB.svg'

  sidebarOpen = false;
  
  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }
}
