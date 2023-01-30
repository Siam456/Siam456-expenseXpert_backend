import './pre-start';

import App from '@app';
import IndexRoute from '@modules/defaults/index.route';
import UserRouter from '@modules/user/user.router';
import OtpRoute from '@modules/otp/otp.router';
import CosmeticsRouter from '@modules/cosmetics/cosmetics.router';
import AuthRouter from '@modules/auth/auth.router';

const app = new App([
    new IndexRoute(),
    new UserRouter(),
    new AuthRouter(),
    new OtpRoute(),
    new CosmeticsRouter(),
]);

app.listen();
