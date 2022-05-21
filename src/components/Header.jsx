import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.calculateExpenses = this.calculateExpenses.bind(this);
  }

  calculateExpenses() {
    const { expenses } = this.props;
    const selectedCoinArray = expenses
      .map((expense) => Object.values(expense.exchangeRates)
        .filter((coin) => expense.currency === coin.code && coin.codein === 'BRL'));
    const multipliers = selectedCoinArray.map((coin) => coin[0].ask);
    let sum = 0;
    expenses.forEach((expense, i) => {
      sum += (Number(expense.value) * Number(multipliers[i]));
    });
    return sum;
  }

  render() {
    const { email } = this.props;

    return (
      <header data-testid="header-component">
        <div>
          <span>WALLET</span>
          <span data-testid="email-field">
            Email:
            {' '}
            {email}
          </span>
          <span data-testid="total-field">{this.calculateExpenses()}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
