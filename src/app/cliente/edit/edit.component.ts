import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

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

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.clienteService.getClientById(this.id).subscribe((response: any) => {
      
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

      this.register = this.registers[index_reg].value;
      this.person = this.people[index_per].value;
      this.client_name = response.nome;
      this.client_cpf_cnpj = response.cpf_cnpj;
      this.active = this.active_type[index_act].value;
      this.client_type = this.clients_type[response.cadastro_tipo_id - 1].value;
      this.client_fantasy = response.fantasia;
      this.alter = this.alter_type[index_alt].value;
      this.client_rg = response.rg_ie;
      this.client_phone = response.fone;
      this.client_cell_phone = response.celular;
      this.discount = response.desconto_auto_aplicar ? 10 : 0;
      this.cep = response.cadastro_endereco_padrao.endereco_cep;
      this.uf = response.cadastro_endereco_padrao.endereco_uf_sigla;
      this.county = response.cadastro_endereco_padrao.endereco_municipio_descricao;
      this.adress = response.cadastro_endereco_padrao.endereco;
      this.neighborhood = response.cadastro_endereco_padrao.endereco_bairro;
      this.number = response.cadastro_endereco_padrao.endereco_numero;
      this.ie = response.cadastro_endereco_padrao.ie_produtor_rural;
      this.description = response.cadastro_endereco_padrao.descricao;
    });
  }

  searchCEP() {
    this.clienteService.openCEP(this.cep).subscribe((response: any) => {
      this.neighborhood = response.bairro;
      this.cep = response.cep;
      this.description = response.complemento;
      this.county = response.localidade;
      this.adress = response.logradouro;
      this.uf = response.uf;
    });
  }

  salvar(){
    console.log("salvar");
  }
}
