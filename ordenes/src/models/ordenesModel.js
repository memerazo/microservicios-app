const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3307, // Cambiado a 3306, el puerto por defecto para MySQL/MariaDB
    database: 'ordenesdb'
});

// Función para crear una orden
async function crearOrden(orden) {
    const { nombreCliente, emailCliente, totalCuenta } = orden;
    const result = await connection.query(
        'INSERT INTO ordenes (nombreCliente, emailCliente, totalcuenta, fechahora) VALUES ( ?, ?, ?, NOW())',
        [nombreCliente, emailCliente, totalCuenta]
    );
    return result;
}

// Función para obtener una orden por ID
async function traerOrden(id) {
    const [rows] = await connection.query('SELECT * FROM ordenes WHERE id = ?', [id]);
    return rows;
}

// Función para obtener todas las órdenes
async function traerOrdenes() {
    const [rows] = await connection.query('SELECT * FROM ordenes');
    return rows;
}

module.exports = {
    crearOrden,
    traerOrden,
    traerOrdenes
};

