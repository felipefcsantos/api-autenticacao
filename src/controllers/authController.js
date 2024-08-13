import { usuario } from '../models/Usuario.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const autenticar = async (req, res, next) => {
    try {
        const { login, senha } = req.body
        const user = await usuario.findOne({ login })
        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            res.status(401).json({ message: 'Usuário ou senha invalida!' });
            return
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const returnUser = {
            nome: user.nome,
            perfil: user.perfil,
            id: user._id,
            token
        }
        res.status(200).json({ dados: returnUser })
    } catch (erro) {
        next(erro)
    }
}

export const cadastrarUsuario = async (req, res, next) => {
    try {
        const { senha, login, ...rest } = req.body;
        const verificaDuplicata = await usuario.findOne({ login });
        if (!verificaDuplicata) {
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            const newBody = {
                ...rest,
                senha: senhaCriptografada,
                login
            }
            const novoUsuario = await usuario.create(newBody);
            res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario })
        } else {
            res.status(500).json({ message: 'Login já possue no sistema!' })
        }
    } catch (erro) {
        next(erro)
    }
}


export const editarUsuario = async (req, res, next) => {
    try {
        const id = req.userId
        await usuario.findByIdAndUpdate(id, req.body)
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
    } catch (erro) {
        next(erro)
    }
}

export const editarUsuarioPorId = async (req, res, next) => {
    try {
        const id = req.params.id
        await usuario.findByIdAndUpdate(id, req.body)
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
    } catch (erro) {
        next(erro)
    }
}

export const apagarUsuario = async (req, res, next) => {
    try {
        const id = req.params.id
        await usuario.findByIdAndDelete(id)
        res.status(200).json({ message: 'Usuário apagado com sucesso!' })
    } catch (erro) {
        next(erro)
    }
}

export const buscarUsuarios =  async (req, res, next) => {
    try {
        const usuarios = await usuario.find({})
        res.status(200).json({usuarios})
    } catch (erro) {
        next(erro)
    }
}

export const buscarUsuarioPorId =  async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await usuario.findOne({_id: id})
        res.status(200).json({usuario: user})
    } catch (erro) {
        next(erro)
    }
}

