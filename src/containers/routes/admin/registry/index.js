import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistryListPage from './RegistryListPage';
import RegistryNewPage from './RegistryNewPage';
import RegistryEditPage from './RegistryEditPage';
import * as common from 'store/modules/common';

class RegistryPage extends Component {

    componentDidMount() {
        const { CommonAction, match } = this.props; 
        CommonAction.setMenuTitle([
            {
                title: 'Registries',
                url: match.path 
            }
        ]);
    } 

    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}`} component={RegistryListPage} />
                <Route exact path={`${match.path}/new`} component={RegistryNewPage} />
                <Route exact path={`${match.path}/:id`} component={RegistryEditPage} />
            </Switch>
        )
    }

}


export default compose(
    withRouter,
    connect(
        state => ({

        }),
        dispatch => ({
            CommonAction: bindActionCreators(common, dispatch)
        })
    ) 
)(RegistryPage);