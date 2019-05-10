import { AccessTokenState } from './features/tokenHandling/types';
import { LoginState, SessionState } from './features/login/types';
import { LanguageState } from './features/lang/types';
import { AppState } from './features/app/reducers/types';
import { ConfigState } from './setup/types';

export interface State {
    tokenHandling?: AccessTokenState;
    login?: LoginState;
    lang?: LanguageState;
    config?: ConfigState;
    session?: SessionState;
    app: AppState;
}
