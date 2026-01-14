class LivroDao {

  constructor(db) {
    this._db = db
  }

  lista(callback) {
    this._db.all(
      'SELECT * from livros',
      (erro, resultados) =>
        callback(erro, resultados)
    )
  }
}

module.exports = LivroDao