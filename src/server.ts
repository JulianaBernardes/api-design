import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { create } from 'domain';
import { createNewUser, signin } from './handlers/user';

const app = express();

const customLogger = (message) => (req, res, next) => {
    console.log('Hello from custom logger! ' + message);
    next();
}

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parsing query string (?key=value&key2=value2)
app.use(customLogger('This is a custom message'));

app.use((req, res, next) => {
    req.secret = 'secret123';
    next();
});
app.get('/', (req, res, next) => {
    // throw new Error('error test')
    // setTimeout(() => {
    //     next(new Error('error test inside timeout'))
    // }, 1)
    // console.log('hello from express');
    // res.status(200)
    // res.json({
    //     message: 'Hello from Express!'
    // });
    res.json({message : 'hello'});
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
    if(err.type === 'auth') {
        res.status(401).json({
            message: 'unauthorized'
        })
    } else if (err.type ==='input') {
        res.status(400).json({
            message: 'invalid input'
        })
    } else {
        res.status(500).json({
            message: 'oops, thats on us...'
        })
    }
})


export default app;