import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from '../services/cliente.service';
import { Client } from '../models/client';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

interface Value {
  value: string;
  view_value: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  client: Client[] = [];
  data_source: any;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clienteService.getClients().subscribe((response: any) => {
      this.client = response.itens;
      this.data_source = new MatTableDataSource<Client>(this.client);
      this.data_source.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  displayedColumns: string[] = [
    'code',
    'name',
    'fantasy',
    'cpf/cnpj',
    'status',
    'actions',
  ];

  people: Value[] = [
    { value: 'Fisica', view_value: 'Física' },
    { value: 'Juridica', view_value: 'Jurídica' },
  ];

  types: Value[] = [
    { value: 'Todos', view_value: 'Todos' },
    { value: 'Ativos', view_value: 'Ativos' },
    { value: 'Inativos', view_value: 'Inativos' },
  ];

  openDialog(id: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
