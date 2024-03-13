import jwt from 'jsonwebtoken'


const generateAuthToken = (user)=>{
    const token = jwt.sign({userId : user._id},process.env.SECRET_KEY, {expiresIn: '1h'});
    return token;
}

const authenticateToken = (req, res, next)=>{
    try {
        
        const token = req.headers.authorization.split(' ')[1];

        const user = jwt.verify(token , process.env.SECRET_KEY);
        req.user = user;
        if(user) next();
    } catch (error) {
        return res.status(401).json({error: "Error in authorization"});
    }
    

}

export {generateAuthToken, authenticateToken};