import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  client_db: any;
  adress_db: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  desativar(): void {
    let data = {
      ...this.client_db,
      ativo: false,
      cadastro_endereco_padrao: {
        ...this.adress_db,
      },
    };
    this.clienteService
      .disableClient(data, String(this.data.id))
      .subscribe((response: any) => {
        if (response) {
          window.location.reload();
        }
      });
    this.dialogRef.close(true);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.clienteService
      .getClientById(this.data.id)
      .subscribe((response: any) => {
        console.log(response);
        this.client_db = response;
        this.adress_db = response.cadastro_endereco_padrao;
      });
  }
}
