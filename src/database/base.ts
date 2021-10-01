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
    coletado: { type: 'int', default: 0 },
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
    coletado: { type: 'int', default: 0 },
    enderecos: 'Enderecos[]',
  },
};

export interface iPedido {
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
  private schemaVersion: number = 1;
  private cursor = new Realm({
    path: this.path,
    schema: [sPedido, sEnderecos, sItems, sDetalhes, sAvailableEAN],
    schemaVersion: this.schemaVersion,
    migration: (oldRealm, newRealm) => {
      // only apply this change if upgrading to schemaVersion 2
      console.log(oldRealm.schemaVersion);
      if (oldRealm.schemaVersion < this.schemaVersion) {
        const oldObjects = oldRealm.objects(this.path);
        const newObjects = newRealm.objects(this.path);
        // loop through all objects and set the fullName property in the new schema
        for (const objectIndex in oldObjects) {
          // const oldObject = oldObjects[objectIndex];
          // const newObject = newObjects[objectIndex];
          // newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
        }
      }
    },
    // deleteRealmIfMigrationNeeded: true,
  });

  constructor() {
    this.cursor;
  }
  storeOrder(order: iPedido) {
    const d = this.cursor.write(() => {
      const data = this.cursor.create(this.path, order, 'modified');
      return data;
    });
    return d;
  }
  getAddress() {
    const data: iPedido = this.cursor.objects(this.path)[0];
    const addresses = data.enderecos;
    const address = addresses[0];
    return address;
  }
  pickProduct(addressCode, ProductCode) {
    const data = this.cursor.objects(this.path);
    const product = data[0].enderecos.filter((item) => {
      if (item.codigo === addressCode) {
        return item.unidadeArmazenagem.filter((item) => {
          if (item.codigo === ProductCode) {
            console.log({ item });
            this.cursor.write(() => {
              item.coletado = item.coletado + 1;
              console.log(item);
            });
            return item;
          }
        });
      } //.unidadeArmazenagem.filter((item) => item.codigo === ProductCode)[0];
    });

    // product.coletado = product.coletado + 1;
    console.log(product);
    return product[0];
  }
  findById(id: number) {
    const tasks = this.cursor.objects('Task');
    const task = tasks.filtered(`_id = ${id}`)[0];
    console.log(task);
  }
  findByText(text: string) {
    const tasks = this.cursor.objects('Task');
    const task = tasks.filtered(`text = '${text}'`)[0];
    console.log(task);
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
