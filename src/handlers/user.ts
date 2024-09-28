import { hash } from 'crypto';
import prisma from '../db';
import { createJWT, hashPassword, comparePassword } from '../modules/auth';

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        });
        const token = createJWT(user);
        res.json({ token });
    } catch (e) {
        e.type = 'input'
        next(e)
    }
}
// class CustomError extends Error { // exemple to handle errors

// }
export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePassword(req.body.password, user.password);
    console.log(isValid);
    if(!isValid) {
        res.status(401)
        res.json({ message: 'Invalid credentials' });
        return;
    }

    const token = createJWT(user);
    res.json({ token });
    
}