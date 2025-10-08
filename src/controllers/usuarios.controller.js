import { validationResult } from "express-validator";
import Usuario from "../models/usuarios.model.js";
import {ok, created, noContent, badRequest, notFound} from "../utils/httpResponse.js";

export const getAll = async (req, res) => {
    const usuarios = await Usuario.findAll();
    ok(res, usuarios);
};

export const getById = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (!usuario) return notFound(res, 'Usuario no encontrado');
    ok(res, usuario);
}

export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return badRequest(res, errors.array());

    const usuario = await Usuario.create(req.body);
    created(res, usuario);
};

export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return badRequest(res, errors.array());

    const { id } = req.params;
    const usuario = await Usuario.update(id, req.body);
    if (!usuario) return notFound(res, 'Usuario no encontrado');
    ok(res, usuario);
};

export const remove = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.remove(id);
    if (!usuario) return notFound(res, 'Usuario no encontrado');
    noContent(res); 
}