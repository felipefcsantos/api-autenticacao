import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { 
        type: String, 
        required: [true, 'O nome do(a) usuário(a) é obrigatório.']
     },
    login: { 
        type: String, 
        required: [true, 'O login do(a) usuário(a) é obrigatório.']
     },
    senha: { 
        type: String, 
        required: [true, 'A senha do(a) usuário(a) é obrigatório.']
     },
    perfil: { 
        type: String, 
        required: [true, 'O perfil do(a) usuário(a) é obrigatório.']
     }
}, { versionKey: false });

const usuario = mongoose.model('usuarios', usuarioSchema);

export { usuario, usuarioSchema }