import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import Intro from './Intro';
import messagesEN from '../translations/en-GB.json';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <IntlProvider locale={'en'} messages={messagesEN}>
            <Intro />
        </IntlProvider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
