import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  client_register: string | null = null;
  client_person: string | null = null;
  client_name: string | null = null;
  client_cpf_cnpj: string | null = null;
  client_active: string | null = null;

  client_type: string = '';
  client_fantasy: string | null = null;
  client_alter: string | null = null;
  client_rg: string | null = null;
  client_phone: string | null = null;
  client_cell_phone: string | null = null;
  client_discount: number = 0;

  adress_cep: string | null = null;
  adress_uf: string | null = null;
  adress_county: string | null = null;
  adress: string | null = null;
  adress_neighborhood: string | null = null;
  adress_number: string | null = null;
  adress_ie: string | null = null;
  adress_description: string | null = null;
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  searchCEP() {
    this.clienteService.openCEP(this.adress_cep).subscribe((response: any) => {
      this.adress_neighborhood = response.bairro;
      this.adress_description = response.complemento;
      this.adress_county = response.localidade;
      this.adress = response.logradouro;
      this.adress_uf = response.uf;
      this.adress_ibge = response.ibge;

      this.isDisabled = false;
    });
  }

  salvar() {
    if (!this.client_name || !this.client_cpf_cnpj || !this.adress_cep || !this.adress || !this.adress_neighborhood || !this.adress_number) {
      this.openSnackBar('Preencha todos os campos obrigatórios', 'Fechar');
      return;
    }

    let data = {
      nome: this.client_name,
      fantasia: this.client_fantasy,
      tipo_pessoa: this.client_person,
      tipo_cadastro: this.client_register,
      cadastro_grupo_id: null,
      cadastro_tipo_id: parseInt(this.client_type),
      cadastro_profissao_id: null,
      cpf_cnpj: this.client_cpf_cnpj,
      rg_ie: this.client_rg,
      rg_ie_uf: null,
      ie_diferido: null,
      dt_nascimento: null,
      vlr_limite_credito: null,
      obs_venda: null,
      fone: this.client_phone,
      fax: null,
      celular: this.client_cell_phone,
      site: null,
      email: null,
      sexo: null,
      estado_civil: null,
      naturalidade_cidade: null,
      naturalidade_uf: null,
      nome_pai: null,
      nome_mae: null,
      qtd_dependentes: null,
      dados_prof_nome_empresa: null,
      dados_prof_cnpj: null,
      dados_prof_fone: null,
      dados_prof_data_admissao: null,
      dados_prof_ocupacao: null,
      dados_prof_cargo: null,
      dados_prof_vlr_renda_mensal: null,
      dados_prof_vlr_outras_rendas: null,
      dados_prof_endereco: null,
      dados_prof_endereco_numero: null,
      dados_prof_endereco_bairro: null,
      dados_prof_endereco_cep: null,
      dados_prof_endereco_municipio_codigo_ibge: null,
      dados_banc_num_banco: null,
      dados_banc_nome_banco: null,
      dados_banc_agencia: null,
      dados_banc_num_conta: null,
      dados_banc_tipo_conta: null,
      dados_banc_data_conta: null,
      dados_banc_fone_ag: null,
      dados_banc_obs: null,
      obs_geral: null,
      tipo_regime_apuracao: null,
      nome_conjuge: null,
      inscricao_municipal: null,
      dt_casamento: null,
      id_print_wayy: null,
      emp_id: 1,
      chk_emp_disponivel: true,
      chk_alterar_nome: Boolean(this.client_alter),
      desconto_auto_aplicar: false,
      desconto_auto_aliq: null,
      obs_nfe: null,
      consumidor_final: false,
      tipo_preco_venda: null,
      cadastro_empresa_id: null,
      cadastro_empresa_guid: null,
      ativo: Boolean(this.client_active),
      dt_ultima_alteracao: null,
      usuario_ultima_alteracao_id: null,
      usuario_ultima_alteracao_nome: null,
      dt_inclusao: null,
      usuario_inclusao_id: null,
      guid: null,
      cadastro_endereco_padrao: {
        descricao: this.adress_description,
        ativo: true,
        endereco: this.adress,
        endereco_numero: this.adress_number,
        endereco_bairro: this.adress_neighborhood,
        endereco_cep: this.adress_cep,
        endereco_municipio_codigo_ibge: parseInt(this.adress_ibge),
        principal: true,
        cobranca: false,
        ie_produtor_rural: this.adress_ie,
      },
    };

    this.clienteService.createClient(data).subscribe((response: any) => {
      if (response) {
        this.openSnackBar('Cliente criado com sucesso', 'Fechar');
        this.router.navigate(['/clientes']);
      }
    });
  }
}
