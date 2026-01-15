class LivroDao {

  constructor(db) {
    this._db = db
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        INSERT INTO livros (
          titulo,
          preco,
          descricao
        ) values (?,?,?)
        `,
        [
          livro.titulo,
          livro.preco,
          livro.descricao
        ], 
        function(err) {
          if (err) {
            console.log(err)
            return reject('Não foi possível adicionar o livro!')
          }

          resolve()
        })
    })
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * from livros',
        (erro, resultados) => {
          if (erro) return reject('Não foi possível listar os livros!')
          return resolve(resultados)
        }
      )
    })
  }

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        'SELECT * from livros WHERE id = ?',
        [id],
        (erro, resultados) => {
          if (erro) return reject('Não foi possível buscar o livro!')
          return resolve(resultados)
        }
      )
    })
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(
        'DELETE FROM livros WHERE id = ?',
        [id],
        function (erro) {
          if (erro) {
            return reject('Não foi possível remover o livro!')
          }

          resolve()
        }
      )
    })
  }

  edit(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        UPDATE livros
        SET
          titulo = ?,
          preco = ?,
          descricao = ?
        WHERE id = ?
        `,
      [
        livro.titulo,
        livro.preco,
        livro.descricao,
        livro.id
      ],
    function (erro) {
      if (erro) return reject(erro)
      resolve()
    })
    })
  }
}

module.exports = LivroDao