import express, { type Request, type Response } from 'express';
import { nanoid } from 'nanoid';
import redis from 'redis';

const app = express();
const redisClient = redis.createClient();

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/healthz', (req: Request, res: Response) => res.send('Micro Url is up and running'));

app.get('/shorten', (req: Request, res: Response) => {
    res.render('index');
})
app.post('/generate_url', async (req: Request, res: Response) => {
    try {
        const { original_url } = req.body;
        const existing_short_url = await redisClient.get(original_url);

        if(existing_short_url) {
            return res.status(200).json({micro_url: `${req.headers.host}/${existing_short_url}`})
        }

        const short_id = nanoid();
        await redisClient.set(original_url!, short_id);

        return res.status(200).json({short_url: `${req.headers.host}/${short_id}`});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`)
})