import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  primaryKey: '_id',
  properties: {
    _id: 'int',
    text: 'string',
  },
};

// const db =

export default class Database {
  private _id: number = 0;
  public text: string = '';
  private schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'int',
      text: 'string',
    },
  };
  //   private cursor: Realm.Configuration = Realm.open({
  //     path: 'myrealm',
  //     schema: [this.schema],
  //   });
  private cursor = new Realm({
    path: 'TasksAPP',
    schema: [this.schema],
  });

  constructor() {
    this.cursor;
  }

  add(text: string) {
    this.cursor.write(() => {
      const task = this.cursor.create(
        'Task',
        {
          _id: this._id,
          text,
        },
        'modified',
      );
      this._id++;
      console.log({ task });
    });
  }
  listAll() {
    const tasks = this.cursor.objects('Task');
    console.log(`The lists of tasks are: ${tasks.map((task) => task.text)}`);
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
  delete(id: number) {
    const tasks = this.cursor.objects('Task');
    const task = tasks.filtered(`_id = ${id}`)[0];
    this.cursor.write(() => {
      this.cursor.delete(task);
    });
  }
  clearDatabase() {
    this.cursor.deleteAll();
  }
}

// // Sort tasks by name in ascending order
// const tasksByName = tasks.sorted('name');
// console.log(
//   `The lists of tasks in alphabetical order are: ${tasksByName.map(
//     (taskByName) => taskByName.name,
//   )}`,
// );

// console.log({ tasks });
// const task = tasks[0];
// console.log({ task });
// console.log(task.keys());
// console.log(task._objectId());
// // console.log()

// realm.write(() => {
//   // Delete all objects from the realm.
//   realm.deleteAll();
// });
