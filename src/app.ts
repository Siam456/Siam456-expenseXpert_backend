import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import Routes from '@interfaces/router.interface';
import errorMiddleWare from '@middlewares/error.middleware';
import helmet from 'helmet';
import { logger, stream } from '@utils/logger';
import { envVarse } from './configs';

class App {
    public app: Application;
    public port: number;
    public env: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = envVarse.port;
        this.env = envVarse.nodeEnv;

        this.initialiseDatabaseConnection();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initialiseErrorHandling();
    }

    private initializeMiddlewares() {
        if (this.env === 'production') {
            this.app.use(
                morgan(
                    ':method :url :status :res[content-length] - :response-time ms',
                    { stream }
                )
            );
            this.app.use(cors({ origin: envVarse.DOMAIN, credentials: true }));
        } else {
            this.app.use(
                morgan(
                    ':method :url :status :res[content-length] - :response-time ms',
                    { stream }
                )
            );
            this.app.use(cors({ origin: true, credentials: true }));
        }

        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(morgan('dev'));
        this.app.use('/uploads', express.static('uploads'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use('/api', route.router);
        });
    }
    private initialiseErrorHandling(): void {
        this.app.use(errorMiddleWare);
    }

    public getServer() {
        return this.app;
    }

    private async initialiseDatabaseConnection(): Promise<void> {
        try {
            await mongoose.set('strictQuery', false);
            await mongoose.connect(envVarse.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);
            logger.info('mongodb connection successful!');
        } catch (err) {
            logger.error(err);
        }
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }
}

export default App;
