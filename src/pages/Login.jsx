import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.canLogin = this.canLogin.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  canLogin() {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;

    if (!(email.includes('@'))) return false;
    if (!(email.includes('.com'))) return false;
    if (password.length < MIN_PASSWORD_LENGTH) return false;

    return true;
  }

  render() {
    const { history, dispatchState } = this.props;

    return (
      <>
        <div>WALLET</div>
        <form>
          <label htmlFor="email-input">
            Email
            <input
              type="text"
              id="email-input"
              name="email"
              data-testid="email-input"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              type="text"
              id="password-input"
              name="password"
              data-testid="password-input"
              onChange={this.handleChange}
            />
          </label>
          <button
            type="button"
            disabled={!this.canLogin()}
            onClick={() => {
              dispatchState(this.state);
              history.push('/carteira');
            }}
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatchState: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchState: (value) => dispatch(updateLogin(value)),
});

export default connect(null, mapDispatchToProps)(Login);
