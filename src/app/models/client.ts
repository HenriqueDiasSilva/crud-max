export interface Client {
  id: number;
  nome: string;
  ativo: boolean;
  fantasia: string;
  cpf_cnpj: string;
  rg_ie: string;
  tipo_pessoa: string;
  tipo_cadastro: string;
  cadastro_tipo_id: number;
  fone: string;
  chk_alterar_nome: boolean;
  desconto_auto_aplicar: boolean;
  cadastro_endereco_padrao: CadastroEnderecoPadrao;
}

export interface CadastroEnderecoPadrao {
  id: number;
  descricao: string;
  ativo: boolean;
  endereco: string;
  endereco_numero: string;
  endereco_bairro: string;
  endereco_cep: string;
  endereco_municipio_codigo_ibge: number;
  principal: boolean;
  cobranca: boolean;
  ie_produtor_rural: string;
}
