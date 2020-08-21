import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Routers, { MyRouter } from './router';

import '../../global/index.global.less';

const App: React.FC = () => {
  return (
    <Switch>
        <Route exact key="/" path="/">
          <Redirect to="/index"/>
        </Route>
        {
          Routers.map((route: MyRouter) => (
            <Route key={route.name} path={route.path} exact={route.exact} render={ () => {
              const Component = route.component;
              return (
                <Component />
              )
            }}/>
          ))
        }
      </Switch>
  )
}

export default App;