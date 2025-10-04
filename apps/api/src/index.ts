import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from './config/env';
import { apiLimiter } from './middleware/rateLimit';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';
import { logInfo } from './config/logger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(apiLimiter);

passport.use(
  new GitHubStrategy(
    {
      clientID: env.githubClientId ?? 'github-client-id',
      clientSecret: env.githubClientSecret ?? 'github-secret',
      callbackURL: '/auth/github/callback'
    },
    (_accessToken, _refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: env.googleClientId ?? 'google-client-id',
      clientSecret: env.googleClientSecret ?? 'google-secret',
      callbackURL: '/auth/google/callback'
    },
    (_accessToken, _refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

app.use(passport.initialize());

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', router);
app.use(errorHandler);

if (require.main === module) {
  app.listen(env.port, () => {
    logInfo('API listening', { port: env.port });
  });
}

export default app;
