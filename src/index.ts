import express, { Application } from 'express';
import env from './config/app';
import morgan from 'morgan';
import routes from './routes';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import middlewares from './routes/middlewares';

const port: number = (env.Port as unknown as number) || 3000;
const app: Application = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'too many requests try  after one hour',
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(apiLimiter);

app.use('/api', routes);
app.use(middlewares.NotFound);

app.listen(port, (): void => {
  console.log(`server started at route http://localhost:${port}`);
});

export default app;
