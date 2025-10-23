import { conectarDb, sql } from "../config/db.js";
import bcrypt from "bcrypt";

const table = "dbo.Usuarios";

const Usuario = {
    findAll: async () => {
    const db = await conectarDb();
    const result = await db.request().query(`SELECT * FROM ${table}`);
    return result.recordset;
    },

    findById: async (id) => {
        const db = await conectarDb();
        const result = await db.request()
            .input('Id', sql.Int, id)
            .query(`SELECT * FROM ${table} WHERE Usuarios_Id = @Id`);
        return result.recordset[0];
    },

    findByCorreo: async (correo) => {
        const db = await conectarDb();
        const result = await db.request()
            .input('Correo', sql.NVarChar, correo)
            .query(`SELECT * FROM ${table} WHERE Correo = @Correo`);
        return result.recordset[0];
    },

    create: async (user) => {
        const db = await conectarDb();
        const result = await db.request()
            .input('Nombre', sql.NVarChar, user.Nombre)
            .input('Correo', sql.NVarChar, user.Correo)
            .input('Contraseña', sql.NVarChar, user.Contraseña)
            .input('Rol_Id', sql.Int, user.Rol_Id)
            .input('Creado_Por_Id', sql.Int, user.Creado_Por_Id)
            .input('Fecha_Creacion', sql.DateTime, new Date())
            .input('Estatus_Id', sql.Int, 1)
            .query(`INSERT INTO ${table} 
                (Nombre, Correo, Contraseña, Rol_Id, Creado_Por_Id, Fecha_Creacion, Estatus_Id) 
                VALUES (@Nombre, @Correo, @Contraseña, @Rol_Id, @Creado_Por_Id, @Fecha_Creacion, @Estatus_Id);
                SELECT SCOPE_IDENTITY() AS Id;`);
        return { id: result.recordset[0].Id, ...user };
    },

    update: async (id, user) => {
        const db = await conectarDb();
        const result = await db.request()
            .input('Id', sql.Int, id)
            .input('Nombre', sql.NVarChar, user.Nombre)
            .input('Correo', sql.NVarChar, user.Correo)
            .input('Contraseña', sql.NVarChar, user.Contraseña)
            .input('Rol_Id', sql.Int, user.Rol_Id)
            .input('Estatus_Id', sql.Int, user.Estatus_Id)
            .query(`UPDATE ${table} SET Nombre = @Nombre, Correo = @Correo, Contraseña = @Contraseña, Rol_Id = @Rol_Id, Estatus_Id = @Estatus_Id WHERE Usuarios_Id = @Id`);
        return result.rowsAffected[0] > 0 ? { id, ...user } : null;
    },

    remove: async (id) => {
        const db = await conectarDb();
        const result = await db.request()
            .input('Id', sql.Int, id)
            .query(`DELETE FROM ${table} WHERE Usuarios_Id = @Id`);
        return result.rowsAffected[0] > 0;
    },

    setPassword: async (id, user) => {
        const db = await conectarDb();
        const hash = await bcrypt.hash(user.Contraseña, 10);
        const result = await db.request()
            .input('Id', sql.Int, id)
            .input('Contraseña', sql.NVarChar, hash)
            .input('Actualizado_Por_Id', sql.Int, user.Actualizado_Por_Id)
            .input('Fecha_Ultima_Actualizacion', sql.DateTime, new Date())
            .query(`UPDATE ${table} SET Contraseña = @Contraseña, Actualizado_Por_Id = @Actualizado_Por_Id, Fecha_Ultima_Actualizacion = @Fecha_Ultima_Actualizacion WHERE Usuarios_Id = @Id`);
        return result.rowsAffected[0] > 0;
    }
};

export default Usuario;

