import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/DemoListContainer';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

import ProductoCrearContainer from './common/components/Producto/ProductoCrearContainer'; 
import ProductoListContainer from './common/components/Producto/ProductoListContainer';

import ClienteCrearContainer from './common/components/Cliente/ClienteCrearContainer';



module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path='/productos/crear' component={ProductoCrearContainer} />
                <ProtectedRoute exact path='/productos/:id' component={ProductoCrearContainer} />
                <ProtectedRoute exact path='/productos/:id/editar' component={ProductoCrearContainer} />
                <ProtectedRoute exact path='/productos' component={ProductoListContainer} />

                <ProtectedRoute exact path='/clientes/crear' component={ClienteCrearContainer}/>                

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
