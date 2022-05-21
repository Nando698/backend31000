//Defino clase y sus metodos

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;

    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(pet){
        return this.mascotas = [...this.mascotas, pet]
    }
    countMascotas() {
        return this.mascotas.length
    }
    addBook(titulo, autor) {
        return this.libros = [...this.libros, {titulo: titulo, autor:autor}]

    }
    getBookNames() {
        const nombres = []
        this.libros.forEach(libro => nombres.push(libro.titulo));
        return  nombres
    }
  }


// Instance de un usuario
const usuario = new Usuario('Fernando', 'Diaz', [], [] )


//Testeo metodos

usuario.addMascota('charly')
usuario.addBook ('On Stranger Tides', 'Tim Powers')
console.log('Test addMascota: ',usuario.mascotas)
usuario.addMascota('pepe')
console.log('Test addMascota: ',usuario.mascotas)
console.log('Test countMascota: ',usuario.countMascotas())
console.log('Test addBook: ', usuario.libros)
usuario.addBook ('El proceso', 'Franz Kafka')
console.log('Test addBook: ', usuario.libros)
console.log('Test getBookNames: ',usuario.getBookNames())