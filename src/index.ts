import express, { type Request, type Response } from 'express';
import connectRedis from './config/db';
import { createMurl, decodeMurl } from './murl';

const app = express();

//redisClient.on('error', (error) => console.error(error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${import.meta.dirname}/static`));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/healthz', (_req: Request, res: Response) => res.send('Micro Url is up and running'));

app.get('/', (_req: Request, res: Response) => res.status(301).redirect('/shorten'));

app.get('/shorten', (_req: Request, res: Response) => {
    res.locals.error_message = null;
    res.status(200).render('index');
});


app.post('/shorten', async (req: Request, res: Response) => {
    const { original_url } = req.body;
    try {
        const murl = await createMurl(original_url);
        if(murl) {
            app.locals.murl = `${req.headers.host}/${murl.endpoint}`;
            app.locals.error_message = null;
            return res.render('murl');
        }
    } catch (error) {
        res.locals.error_message = (error as Error).message;
        res.render('index')
    }
})

app.get('/:microID', async (req: Request, res: Response) => {
    const { microID } = req.params;
    try {
        const original_url = await decodeMurl(microID);
        return res.status(301).redirect(`${original_url}`);
    } catch (error) {
        res.locals.error_message = (error as Error).message;
        return res.render('murl')
    }
})

connectRedis()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
    })
})
.catch((error) => console.error('Error: ', error));


