import Realm from 'realm';

const sAvailableEAN = {
  name: 'AvailableEAN',
  properties: {
    codigoBarra: 'string',
    quantidade: 'int',
  },
};
const sDetalhes = {
  name: 'Detalhes',
  properties: {
    campo: 'string',
    valor: 'string',
  },
};
const sItems = {
  name: 'Itens',
  properties: {
    barraEndereco: 'string',
    tipo: 'string',
    codigo: 'string',
    quantidade: 'int',
    barras: 'AvailableEAN[]',
    detalhes: 'Detalhes[]',
  },
};
const sEnderecos = {
  name: 'Enderecos',
  properties: {
    codigo: 'string',
    completed: { type: 'bool', default: false },
    published: { type: 'bool', default: false },
    descricao: 'string',
    ordem: 'int',
    unidadeArmazenagem: 'Itens[]',
  },
};
const sPedido = {
  name: 'Pedidos',
  primaryKey: 'pedido',
  properties: {
    pedido: 'string',
    totalizador: 'int',
    enderecos: 'Enderecos[]',
  },
};

interface iPedido {
  pedido: string;
  totalizador: number;
  enderecos: {
    codigo: number;
    completed: boolean;
    published: boolean;
    descricao: string;
    ordem: number;
    unidadeArmazenagem: {
      barraEndereco: number;
      tipo: string;
      codigo: number;
      quantidade: number;
      detalhes: {
        campo: string;
        valor: number;
      }[];
      barras: {
        codigoBarra: number;
        quantidade?: number;
      }[];
    }[];
  }[];
}

export default class Database {
  private path: string = 'Pedidos';
  private schema = sPedido;
  private cursor = new Realm({
    path: this.path,
    schema: [sPedido, sEnderecos, sItems, sDetalhes, sAvailableEAN],
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
  });

  constructor() {
    this.cursor;
  }
  storeOrder(order: iPedido) {
    // const init = new Date().getUTCMilliseconds();
    const d = this.cursor.write(() => {
      const data = this.cursor.create(this.path, order, 'modified');
      return data;
    });
    // const end = new Date().getUTCMilliseconds();
    // const total = end - init;
    // console.log({ init, end, total, action: 'Storing data' });
    return d;
  }
  getAddress() {
    // const init = new Date().getUTCMilliseconds();
    const data: iPedido = this.cursor.objects(this.path)[0];
    const addresses = data.enderecos;
    const address = addresses[0];
    console.log(addresses[0]);
    // const end = new Date().getUTCMilliseconds();
    // const total = end - init;
    // console.log({ init, end, total, action: 'Get addresses' });
    return address;
  }

  clearDatabase() {
    // const tempo_inicio = new Date().getMilliseconds();
    this.cursor.write(() => {
      this.cursor.deleteAll();
    });
    // const tempo_final = new Date().getMilliseconds();
    // const total = tempo_final - tempo_inicio;
    // console.log({
    //   tempo_inicio,
    //   tempo_final,
    //   total,
    //   action: 'Clearing database',
    // });
  }
}
