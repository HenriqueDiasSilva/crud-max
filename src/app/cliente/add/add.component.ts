import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

interface Value {
  value: string;
  view_value: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  isDisabled: boolean = true;

  id: number = 0;

  register: string = '';
  person: string = '';
  client_name: string = '';
  client_cpf_cnpj: string = '';
  active: string = '';

  client_type: string = '';
  client_fantasy: string = '';
  alter: string = '';
  client_rg: string = '';
  client_phone: string = '';
  client_cell_phone: string = '';
  discount: number = 0;

  cep: string = '';
  uf: string = '';
  county: string = '';
  adress: string = '';
  neighborhood: string = '';
  number: string = '';
  ie: string = '';
  description: string = '';

  registers: Value[] = [
    { value: 'Cliente', view_value: 'Cliente' },
    { value: 'Fornecedor', view_value: 'Fornecedor' },
    { value: 'Cliente-fornecedor', view_value: 'Cliente / Fornecedor' },
    { value: 'Transportadora', view_value: 'Transportadora' },
    { value: 'Funcionario', view_value: 'Funcionário' },
  ];

  people: Value[] = [
    { value: 'Fisica', view_value: 'Física' },
    { value: 'Juridica', view_value: 'Jurídica' },
  ];

  active_type: Value[] = [
    { value: 'true', view_value: 'Sim' },
    { value: 'false', view_value: 'Não' },
  ];

  alter_type: Value[] = [
    { value: 'true', view_value: 'Sim' },
    { value: 'false', view_value: 'Não' },
  ];

  clients_type: Value[] = [
    { value: '1', view_value: 'Contribuinte' },
    { value: '2', view_value: 'Não Contribuinte' },
    { value: '3', view_value: 'Produtor Rural' },
  ];

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}

  searchCEP() {
    this.clienteService.openCEP(this.cep).subscribe((response: any) => {
      this.neighborhood = response.bairro;
      this.cep = response.cep;
      this.description = response.complemento;
      this.county = response.localidade;
      this.adress = response.logradouro;
      this.uf = response.uf;

      this.isDisabled = false;
    });
  }
}
