import React from 'react';
import { render } from 'react-dom';
import Greeter from './Greeter.jsx';

import '../stylesheets/style.scss'

render((
    <div>
        <h1>Playframework, React JS, ES 6 and webpack</h1>
        <Greeter name="Ninja" />
    </div>), document.getElementById("app"));