import { conectarDb, sql } from "../config/db.js";

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

    create: async (user) => {
        const db = await conectarDb();
        const result = await db.request()
            .input('Nombre', sql.NVarChar, user.Nombre)
            .input('Correo', sql.NVarChar, user.Correo)
            .input('Contraseña', sql.NVarChar, user.Contraseña)
            .input('Rol', sql.Int, user.Rol)
            .query(`INSERT INTO ${table} (Nombre, Correo, Contraseña, Rol) VALUES (@Nombre, @Correo, @Contraseña, @Rol);
                    SELECT SCOPE_IDENTITY() AS Id;`);
        return { id: result.recordset[0].Id, ...user };
    },

    update: async (id, user) => {
        const db = await conectarDb();
        await db.request()
            .input('Id', sql.Int, id)
            .input('Nombre', sql.NVarChar, user.Nombre)
            .input('Correo', sql.NVarChar, user.Correo)
            .input('Contraseña', sql.NVarChar, user.Contraseña)
            .input('Rol', sql.Int, user.Rol)
            .input('Estatus', sql.Int, user.Estatus)
            .query(`UPDATE ${table} SET Nombre = @Nombre, Correo = @Correo, Contraseña = @Contraseña, Rol = @Rol, Estatus = @Estatus WHERE Usuarios_Id = @Id`);
        return result.rowsAffected[0] > 0 ? { id, ...user } : null;
    },

    remove: async (id) => {
        const db = await conectarDb();
        await db.request()
            .input('Id', sql.Int, id)
            .query(`DELETE FROM ${table} WHERE Usuarios_Id = @Id`);
        return result.rowsAffected[0] > 0;
    }
};

export default Usuario;

