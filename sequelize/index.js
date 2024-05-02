// 13/02/2024

// Importando Sequelize y DataTypes desde sequelize
const { Sequelize, DataTypes } = require("sequelize")

// Creando una instancia de Sequelize con los datos de conexión
const sequelize = new Sequelize('sequelize_example', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
})

// Función principal asincrónica
async function main() {

    // Definiendo el modelo de Usuario
    const Usuario = sequelize.define('Usuario', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    // Definiendo el modelo de Pedido
    const Pedido = sequelize.define('Pedido', {
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    // Definiendo la relación entre Usuario y Pedido
    Usuario.hasMany(Pedido);
    Pedido.belongsTo(Usuario);

    // Sincronizando los modelos con la base de datos
    await sequelize.sync()
        .then(() => {
            console.log('Tablas creadas con exito')
        })
        .catch((err) => {
            console.log('Error al sincronizar los modelos', err)
        })

    try {
        console.log('----------------------------Creamos usuarios----------------------------')
        const usuario1 = await Usuario.create({ nombre: 'Esteban', apellido: 'Durán' });
        console.log(usuario1);
        
        const usuario2 = await Usuario.create({ nombre: 'Hugo', apellido: 'Navarro' });
        const usuario3 = await Usuario.create({ nombre: 'Jorge', apellido: 'Sanchez' });
        const usuario4 = await Usuario.create({ nombre: 'Ildefonso', apellido: 'Lares' });

        console.log('----------------------------Creamos pedidos ----------------------------')
        const pedido1 = await Pedido.create({descripcion: 'Pedido 1', cantidad: 3, precio: 20.00, estado:'pendiente'})
        console.log(pedido1)

        const pedido2 = await Pedido.create({descripcion: 'Pedido 2', cantidad: 3, precio: 20.00, estado:'pendiente'})
        const pedido3 = await Pedido.create({descripcion: 'Pedido 3', cantidad: 3, precio: 20.00, estado:'pendiente'})
        const pedido4 = await Pedido.create({descripcion: 'Pedido 4', cantidad: 3, precio: 20.00, estado:'pendiente'})

        console.log('---------------------------Asignamos pedidos----------------------------')
        await usuario1.addPedido(pedido1).then(result =>{
            console.log(result.toJSON());
        }).catch(err => {
            console.log(err)
        })

        await usuario2.addPedido(pedido2);
        await usuario3.addPedido(pedido3);

        console.log('------------------------Asignamos pedidos por ID-------------------------')
        const usuarioID = await Usuario.findByPk(4);
        console.log(usuarioID);

        await usuarioID.addPedido(pedido4).then(result =>{
            console.log(result.toJSON());
        }).catch(err => {
            console.log(err)
        })

        console.log('------------------------Seleccionar pedidos-----------------------------')
        const usuariosPedidos = await Usuario.findAll({include: Pedido}).then(result =>{
            console.log(result);
        }).catch(err => {
            console.log(err)
        })

        console.log('------------------------Modificar usuario-----------------------------')
        const usuario1Copia = await Usuario.findByPk(1);
        console.log(usuario1Copia);

        await usuario1Copia.update({nombre: 'Luis'})

        console.log('------------------------Eliminar pedido-----------------------------')
        const pedidoCopia = await Pedido.findByPk(1);
        console.log(pedidoCopia)

        await pedidoCopia.destroy().then(result =>{
            console.log(result);
        }).catch(err => {
            console.log(err)
        })

        console.log('------------------------Modificar con Where-----------------------------')
        const idUsuarioModificar = 4;
        const nuevosValores = {
            nombre: 'Jose',
            apellido: 'tapia'
        };

        const resultadoActualizacion = await Usuario.update(nuevosValores, {
            where: {id: idUsuarioModificar},
        })

        console.log('Resultado actualizacion', resultadoActualizacion)

        console.log('------------------------Eliminar con Where-----------------------------')
        const idUsuarioEliminar = 4;
        const resultadoEliminacion = await Usuario.destroy({
            where: {id: idUsuarioEliminar},
        })

        console.log('Resultado eliminacion', resultadoEliminacion);

        // Cerrando la conexión con la base de datos
        sequelize.close();

    } catch (error) {
        console.log(error);
    }
};

main();
