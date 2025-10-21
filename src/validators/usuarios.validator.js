import {body, param} from "express-validator";

export const createUsuarioValidator = [
    body('Nombre').isString().withMessage('El nombre es obligatorio.'),
    body('Correo').isEmail().withMessage('El correo es obligatorio y debe ser un correo válido.'),
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