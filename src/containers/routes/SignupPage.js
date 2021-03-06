import React, { Component } from 'react';
import config from 'config';
import { center } from 'styles/style-utils';
import { SignupForm } from 'components/signup';
import { Logo } from 'components/base/ui';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import * as auth from 'store/modules/auth';
import { compose } from 'recompose';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
    background: #2f2f2f;    
    height:100vh;
    ${center}
`;

const StyledForm = styled.div`
    width:400px;
    margin:0 auto;
    background: white;
    border-radius: 3px;
    min-height: 300px;
    padding:10px;
`

const CenterLogo = styled(Logo)`
    display:block;
    margin:10px auto;
`
class SignupPage extends Component {

    componentDidMount() {
        const { AuthAction } = this.props;
        AuthAction.init();
    }

    submit = async form => {
        const { AuthAction, history } = this.props;
        const { email, password, username } = form.toJS();
        try {
            const data = await AuthAction.signup({ email, password, username});
            toast.success("🚀 Signup Success !", {
                position: toast.POSITION.RIGHT
            });
            history.push('/login');
        } catch(e) {

        }
    }

    onGithubLogin = () => {
        window.location.href = `${config.backendUrl}/auth/github`;
    }


    onGoogleLogin = () => {
        window.location.href = `${config.backendUrl}/auth/google`
    }

    render() {
        const { error } = this.props;
        return (
            <Wrapper>
                <StyledForm>
                    <div>
                        <CenterLogo
                            width='100%'
                            height='80px'
                            invert
                        />
                    </div>
                    <SignupForm
                        onSubmit={this.submit}
                        onGithubLogin={this.onGithubLogin}
                        onGoogleLogin={this.onGoogleLogin}
                        serverError={error}
                    />
                </StyledForm>
            </Wrapper>
        )
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
            error: state.auth.getIn(['error','message'])
        }),
        dispatch => ({
            AuthAction: bindActionCreators(auth, dispatch)
        })
    )
)(SignupPage);