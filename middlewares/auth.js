

export const checkUserSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json('No user session')
    }
}