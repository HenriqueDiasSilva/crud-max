import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ClienteService } from "../services/cliente.service";
import { Client } from "../models/client";

interface Value {
  value: string;
  view_value: string;
}

@Component({
  selector: "app-cliente",
  templateUrl: "./cliente.component.html",
  styleUrls: ["./cliente.component.scss"],
})
export class ClienteComponent {
  client: Client[] = [];
  data_source: any;

  constructor(private clienteService: ClienteService) {
    this.clienteService.getClients().subscribe((response: any) => {

      this.client = response.itens;
      this.data_source = new MatTableDataSource<Client>(this.client);
      this.data_source.paginator = this.paginator;
    });
  }

  displayedColumns: string[] = [
    "code",
    "name",
    "fantasy",
    "cpf/cnpj",
    "status",
    "actions",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  people: Value[] = [
    { value: "fisica", view_value: "Física" },
    { value: "juridica", view_value: "Jurídica" },
  ];

  types: Value[] = [
    { value: "todos", view_value: "Todos" },
    { value: "ativos", view_value: "Ativos" },
    { value: "inativos", view_value: "Inativos" },
  ];
}
