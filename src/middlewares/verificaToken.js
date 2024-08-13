import jwt from 'jsonwebtoken'

export const verificaToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado!' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.user._id;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado!' });
      }
}