import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Value {
  value: string;
  view_value: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  client_db: any;
  adress_db: any;

  id: number = 0;

  client_register: string = '';
  client_person: string = '';
  client_name: string = '';
  client_cpf_cnpj: string = '';
  client_active: string = '';

  client_type: string = '';
  client_fantasy: string = '';
  client_alter: string = '';
  client_rg: string = '';
  client_phone: string = '';
  client_cell_phone: string = '';
  client_discount: number = 0;

  adress_cep: string = '';
  adress_uf: string = '';
  adress_county: string = '';
  adress: string = '';
  adress_neighborhood: string = '';
  adress_number: string = '';
  adress_ie: string = '';
  adress_description: string = '';
  adress_ibge: string = '';

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.clienteService.getClientById(this.id).subscribe((response: any) => {
      console.log(response);
      this.client_db = response;
      this.adress_db = response.cadastro_endereco_padrao;

      const index_reg = this.registers.findIndex(
        (reg) => reg.value === response.tipo_cadastro
      );
      const index_per = this.people.findIndex(
        (per) => per.value === response.tipo_pessoa
      );
      const index_act = this.active_type.findIndex(
        (act) => act.value === String(response.ativo)
      );
      const index_alt = this.alter_type.findIndex(
        (alt) => alt.value === String(response.chk_alterar_nome)
      );

      this.client_register = this.registers[index_reg].value;
      this.client_person = this.people[index_per].value;
      this.client_name = response.nome;
      this.client_cpf_cnpj = response.cpf_cnpj;
      this.client_active = this.active_type[index_act].value;
      this.client_type = this.clients_type[response.cadastro_tipo_id - 1].value;
      this.client_fantasy = response.fantasia;
      this.client_alter = this.alter_type[index_alt].value;
      this.client_rg = response.rg_ie;
      this.client_phone = response.fone;
      this.client_cell_phone = response.celular;
      this.client_discount = response.desconto_auto_aplicar ? 10 : 0;
      this.adress_cep = response.cadastro_endereco_padrao.endereco_cep;
      this.adress_uf = response.cadastro_endereco_padrao.endereco_uf_sigla;
      this.adress_county =
        response.cadastro_endereco_padrao.endereco_municipio_descricao;
      this.adress = response.cadastro_endereco_padrao.endereco;
      this.adress_neighborhood =
        response.cadastro_endereco_padrao.endereco_bairro;
      this.adress_number = response.cadastro_endereco_padrao.endereco_numero;
      this.adress_ie = response.cadastro_endereco_padrao.ie_produtor_rural;
      this.adress_description = response.cadastro_endereco_padrao.descricao;
      this.adress_ibge =
        response.cadastro_endereco_padrao.endereco_municipio_codigo_ibge;
    });
  }

  searchCEP() {
    this.clienteService.openCEP(this.adress_cep).subscribe((response: any) => {
      this.adress_neighborhood = response.bairro;
      this.adress_description = response.complemento;
      this.adress_county = response.localidade;
      this.adress = response.logradouro;
      this.adress_uf = response.uf;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  salvar() {
    if (!this.client_name || !this.client_cpf_cnpj || !this.adress_cep || !this.adress || !this.adress_neighborhood || !this.adress_number) {
      this.openSnackBar('Preencha todos os campos obrigatórios', 'Fechar');
      return;
    }

    let data = {
      ...this.client_db,
      id: this.id,
      nome: this.client_name,
      fantasia: this.client_fantasy,
      tipo_pessoa: this.client_person,
      tipo_cadastro: this.client_register,
      cadastro_tipo_id: parseInt(this.client_type),
      cpf_cnpj: this.client_cpf_cnpj,
      rg_ie: this.client_rg,
      fone: this.client_phone,
      celular: this.client_cell_phone,
      chk_alterar_nome: Boolean(this.client_alter),
      desconto_auto_aplicar: this.client_discount > 0 ? true : false,
      ativo: Boolean(this.client_active),
      cadastro_endereco_padrao: {
        ...this.adress_db,
        descricao: this.adress_description,
        endereco: this.adress,
        endereco_numero: this.adress_number,
        endereco_bairro: this.adress_neighborhood,
        endereco_cep: this.adress_cep,
        endereco_municipio_codigo_ibge: parseInt(this.adress_ibge),
        ie_produtor_rural: this.adress_ie,
      },
    };
    this.clienteService
      .editClient(data, String(this.id))
      .subscribe((response: any) => {
        if (response) {
          this.openSnackBar('Cliente editado com sucesso', 'Fechar');
        }
      });
  }
}
