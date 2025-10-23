import {body, param} from "express-validator";
import Usuario from "../models/usuarios.model.js";

export const createUsuarioValidator = [
    body('Nombre').isString().withMessage('El nombre es obligatorio.'),
    body('Correo')
        .isEmail().withMessage('El correo es obligatorio y debe ser un correo válido.')
        .custom(async (correo) => {
            const existente = await Usuario.findByCorreo(correo);
            if (existente) {
                throw new Error('El correo ya está registrado.');
            }
            return true;
        }),
    body('Rol_Id').isInt().withMessage('El rol es obligatorio.'),
    body('Creado_Por_Id').isInt().withMessage('El campo creado por es obligatorio.')
];

export const updateUsuarioValidator = [
    param('id').isInt().withMessage('El ID del usuario debe ser un número entero.'),
    body('Nombre').isString().withMessage('El nombre es obligatorio.'),
    body('Correo').isEmail().withMessage('El correo es obligatorio y debe ser un correo válido.'),
    body('Contraseña').isLength({min: 6}).withMessage('La contraseña es obligatoria y debe tener al menos 6 caracteres.'),
    body('Rol_Id').isInt().withMessage('El rol es obligatorio.'),
    body('Estatus_Id').isInt().withMessage('El estatus es obligatorio.')
];

export const setPasswordValidator = [
    param('id').isInt().withMessage('El ID del usuario es obligatorio.'),
    body('Contraseña')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('Confirmacion')
        .custom((value, { req }) => value === req.body.Contraseña)
        .withMessage('La confirmación de la contraseña no coincide.'),
    body('Actualizado_Por_Id').isInt().withMessage('El valor de Actualizado_Por_Id es obligatorio.')
];