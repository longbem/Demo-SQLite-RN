import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Ship.db';
const database_version = '1.0';
const database_display_name = 'SQLite React Offline Database';
const database_size = 200000;

export default class Database {
  // khoi tao co so du lieu
  initDB() {
    let db;
    return new Promise(resolve => {
      console.log('finish connection');
      SQLite.echoTest()
        .then(() => {
          console.log('Kiem tra tinh toan ven');
          console.log('open database ...');
          // open database
          SQLite.openDatabase(
            database_name,
            database_version,
            database_display_name,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('open database');
              db.executeSql('SELECT * FROM Info_Customer')
                .then(() => {
                  console.log('Database ready .. executing query ...');
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready .. populating data');
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Info_Customer (id_khach INTEGER PRIMARY KEY, ten_khach TEXT, so_dien_thoai INTEGER, tien_hang INTEGER, dia_chi TEXT, ghi_chu TEXT)',
                    );
                  })
                    .then(() => {
                      console.log('Create table successfully');
                    })
                    .catch(error => {
                      console.log('error', error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  // close database
  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database Close');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }

  // list info customer
  listInfo() {
    return new Promise(resolve => {
      const Info_Customer = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT c.id_khach, c.ten_khach, c.so_dien_thoai, c.tien_hang, c.dia_chi, c.ghi_chu FROM Info_Customer c',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(
                  `Prod ID: ${row.id_khach}, Prod Name: ${row.ten_khach}`,
                );
                const {
                  id_khach,
                  ten_khach,
                  so_dien_thoai,
                  tien_hang,
                  dia_chi,
                  ghi_chu,
                } = row;
                Info_Customer.push({
                  id_khach,
                  ten_khach,
                  so_dien_thoai,
                  tien_hang,
                  dia_chi,
                  ghi_chu,
                });
              }
              console.log(Info_Customer);
              resolve(Info_Customer);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log('error: ', err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // get customer by id
  customerByID(id) {
    console.log(id);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Info_Customer WHERE id_khach = ?', [
              id,
            ]).then(([tx, results]) => {
              console.log(results);
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // add customer new
  aadCustomerNew(cu) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO Info_Customer VALUES(?, ?, ?, ?, ?, ?)',
              [
                cu.id_khach,
                cu.ten_khach,
                cu.so_dien_thoai,
                cu.tien_hang,
                cu.dia_chi,
                cu.ghi_chu,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log('error: ', err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // update a customer
  updateCustomer(id, cu) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE Info_Customer SET ten_khach = ?, so_dien_thoai = ?, tien_hang = ?, dia_chi = ?, ghi_chu = ? WHERE id_khach = ?',
              [
                cu.ten_khach,
                cu.so_dien_thoai,
                cu.tien_hang,
                cu.dia_chi,
                cu.ghi_chu,
                id,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db); // dong database
            })
            .catch(err => {
              console.log('err', err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // dedete a customer
  deleteCustomer(id) {
    console.log('delete');
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Info_Customer WHERE id_khach = ?', [
              id,
            ]).then(([tx, results]) => {
              console.log('results: ', results);
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db); // dong database
            })
            .catch(err => {
              console.log('err: ', err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // // tinh tong tien hang
  //   sumShip(){
  //     console.log('tong tien');
  //     return new Promise(resolve => {
  //       this.initDB().then(db =>{
  //           db.transaction(tx => {
  //               tx.executeSql('SELECT * FROM Info_Customer', [id]).then(([tx, results]) =>{
  //
  //               })
  //           })
  //       })
  //     })
  //   }
}
