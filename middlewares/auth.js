import jwt from 'jsonwebtoken'

export const checkUAuth = (req, res, next) => {
   if(req.headers.authorization){
       try {
        const token = req.headers.authorization.split(' ')[1]
        req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    
        next()
       } catch (error) {
        return res.status(401).json({error: "Token Expired"})
       }
    }
    else {
        res.status(401).json({error:'Not authenticated'})
    }
}