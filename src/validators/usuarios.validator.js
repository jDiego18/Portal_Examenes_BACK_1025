import {body, param} from "express-validator";

export const createUsuarioValidator = [
    body('nombre').isString().withMessage('El nombre es obligatorio.'),
    body('correo').isEmail().withMessage('El correo es obligatorio y debe ser un correo válido.'),
    body('rol').isInt().withMessage('El rol es obligatorio.')
];

export const updateUsuarioValidator = [
    param('id').isInt().withMessage('El ID del usuario debe ser un número entero.'),
    body('nombre').isString().withMessage('El nombre es obligatorio.'),
    body('correo').isEmail().withMessage('El correo es obligatorio y debe ser un correo válido.'),
    body('contraseña').isLength({min: 6}).withMessage('La contraseña es obligatoria y debe tener al menos 6 caracteres.'),
    body('rol').isInt().withMessage('El rol es obligatorio.'),
    body('estatus').isInt().withMessage('El estatus es obligatorio.')
];