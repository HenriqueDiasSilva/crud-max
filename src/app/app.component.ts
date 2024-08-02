import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ClienteService } from "./services/cliente.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "";
  urlLogo = "https://desenvolvimento.maxdata.com.br/assets/imagens/login/MaxWEB.svg";
  sidebarOpen = false;

  private user_login = {
    email: "usuarioteste@maxdata.com.br",
    senha: "j>grr@je",
  };

  constructor(private router: Router, private clienteService: ClienteService) {
    this.clienteService.login(this.user_login);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.getTitleFromRoute(event.urlAfterRedirects);
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getTitleFromRoute(url: string): string {
    if (url.includes("add")) {
      return "Novo Cliente";
    } else if (url.includes("edit")) {
      return "Cliente";
    } else {
      return "Clientes";
    }
  }
}
