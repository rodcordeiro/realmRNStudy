import Realm from 'realm';

export interface iBarra {
  ean: string;
  quantidade: number;
}
export interface iDetalhes {
  campo: string;
  valor: string;
}
export interface iEndereco {
  codigoEndereco: number;
  descricaoEndereco: string;
  ordem: number;
  tipo: string;
  unidade: string;
  descricaoProduto: string;
  quantidade: number;
  barras: Array<iBarra>;
  detalhes: Array<iDetalhes>;
}

export interface iColetado {
  codigoCliente: number;
  codigoPedido: string;
  CodigoEndereco: number;
  EAN: string;
  Quantidade: number;
  user: number;
}
export interface iPedido {
  codigoPedido: string;
  coletado?: number;
  totalizador: number;
  enderecos: iEndereco[];
}
type pedido = iPedido;
export default class Database {
  private path: string = 'Pedido';

  private schemaVersion: number = 1;
  private cursor = new Realm({
    path: this.path,
    schema: [
      {
        name: 'Pedido',
        properties: {
          codigoPedido: 'string',
          coletado: { type: 'int', default: 0 },
          totalizador: 'int',
          enderecos: 'Endereco[]',
        },
      },
      {
        name: 'Endereco',
        properties: {
          codigoEndereco: 'int',
          descricaoEndereco: 'string',
          ordem: 'int',
          tipo: 'string',
          unidade: 'string',
          descricaoProduto: 'string',
          quantidade: 'int',
          coletado: { type: 'int', default: 0 },
          barras: 'Barras[]',
          detalhes: 'Detalhes[]',
        },
      },
      {
        name: 'Barras',
        properties: {
          ean: 'string',
          quantidade: 'int',
        },
      },
      {
        name: 'Detalhes',
        properties: {
          campo: 'string',
          valor: 'string',
        },
      },
      {
        name: 'Coletado',
        properties: {
          codigoCliente: 'int',
          codigoPedido: 'string',
          CodigoEndereco: 'int',
          EAN: 'string',
          Quantidade: 'int',
          user: 'int',
          published: { type: 'bool', default: false },
        },
      },
    ],
    schemaVersion: this.schemaVersion,
    deleteRealmIfMigrationNeeded: true,
  });

  save(order: iPedido) {
    try {
      const d = this.cursor.write(() => {
        const data = this.cursor.create(this.path, order[0], 'modified');
        return data;
      });
      return d;
    } catch (err) {
      return err;
    }
  }

  getAddress() {
    const addresses = this.cursor.objects('Endereco');
    return addresses[0];
  }

  collectItem(addrCode: string) {
    const address = this.cursor
      .objects('Endereco')
      .filter((item) => item.codigoEndereco === addrCode)[0];
    console.log(address);
  }

  clearDatabase() {
    this.cursor.write(() => {
      this.cursor.deleteAll();
    });
  }
}
