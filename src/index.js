import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

ReactDOM.render(<MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
