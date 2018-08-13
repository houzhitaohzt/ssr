/**
 * @author: houzhitao
 * @since: 2018-05-30 17:49
 */
import React from "react";
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
//
// export const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
//     routes ? (
//         <Switch {...switchProps}>
//         {routes.map((route, i) => (
//             <Route
//                 key={route.key || i}
//                 path={route.path}
//                 exact={route.exact}
//                 strict={route.strict}
//                 render={props => (
//                 <route.component {...props} {...extraProps} route={route} />
//                 )}
//         />
//     ))}
// </Switch>
// ) : null;

const renderRoute = (routes, extraProps = {},  switchProps = {}) => {
    return (<Switch {...switchProps}>{routes.map(renderSingleRoute)}</Switch>)
};

const renderSingleRoute = (route, i) => {
    if(route.routes && route.routes.length){
        return (<Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props => (
                <route.component {...props} >{route.routes.map(renderSingleRoute)}</route.component>
                // <route.component {...props} >{renderRoute(route.routes)}</route.component>
            )}
        />)
    };
    return (<Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={props => (
            <route.component {...props} route={route} />
        )}
    />)
};

export const renderRoutes = (routes, extraProps = {}, switchProps = {}) => {
  return routes ? renderRoute(routes, extraProps = {}, switchProps) : null;
};
