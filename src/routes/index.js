import express from 'express'
import usuarios from './authRoutes.js'

const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('API-AUNTENTICAÇÃO ONLINE'))
    app.use(express.json(),  usuarios)
}

export default routes;