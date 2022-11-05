/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './pages/App';

render(() => <App />, document.getElementById('root') as HTMLElement);
