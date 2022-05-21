import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { deleteExpense, updateExpenses, updateCoins } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      editButton: false,
      idToEdit: 0,
    };
    this.increaseId = this.increaseId.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.editButtonComplete = this.editButtonComplete.bind(this);
    this.selectIdToEdit = this.selectIdToEdit.bind(this);
  }

  componentDidMount() {
    const { dispatchCoins } = this.props;
    dispatchCoins();
  }

  increaseId() {
    const { id } = this.state;
    this.setState({ id: id + 1 });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  deleteButton(id) {
    const { expenses, replaceWalletExpenses } = this.props;
    const newExpense = expenses.filter((expense) => expense.id !== id);
    replaceWalletExpenses(newExpense);
  }

  editButtonComplete() {
    const {
      idToEdit, value, description, currency, method, tag,
    } = this.state;
    const { expenses, replaceWalletExpenses } = this.props;
    const oldPrices = expenses
      .filter((expense) => expense.id === idToEdit)[0].exchangeRates;
    const newExpense = {
      id: idToEdit, value, description, currency, method, tag, exchangeRates: oldPrices,
    };
    const newExpenses = expenses;
    const positionOfEdited = newExpenses
      .filter((eachExpense) => Number(eachExpense.id) < Number(idToEdit)).length;
    newExpenses[positionOfEdited] = newExpense;
    replaceWalletExpenses(newExpenses);
  }

  selectIdToEdit(id) {
    this.setState({ editButton: true, idToEdit: id });
  }

  renderTable() {
    const { expenses } = this.props;
    return expenses.map((expense) => {
      const {
        id, description, tag, method, currency, value,
      } = expense;
      const selectedCoin = expense.exchangeRates[currency];
      return (
        <tr key={id}>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{selectedCoin.name.split('/')[0]}</td>
          <td>{Number(selectedCoin.ask).toFixed(2)}</td>
          <td>{(Number(selectedCoin.ask) * Number(value)).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              onClick={() => this.selectIdToEdit(id)}
            >
              Editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={() => this.deleteButton(id)}
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { dispatchExpense, allCoins } = this.props;
    const {
      value, id, description, currency, method, tag, exchangeRates, editButton,
    } = this.state;

    return (
      <>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              id="value-input"
              name="value"
              value={value}
              data-testid="value-input"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              onChange={this.handleChange}
            >
              {allCoins.length !== 0 && allCoins.map((code) => (
                <option key={`currency-${code}`} data-testid={code}>{code}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              name="method"
              id="method-input"
              data-testid="method-input"
              onChange={this.handleChange}
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              onChange={this.handleChange}
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              id="description-input"
              name="description"
              data-testid="description-input"
              onChange={this.handleChange}
            />
          </label>
          {editButton
            ? (
              <button
                type="button"
                onClick={() => {
                  this.editButtonComplete();
                  this.setState({ value: 0, editButton: false });
                }}
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={() => {
                  dispatchExpense({
                    id, value, description, currency, method, tag, exchangeRates,
                  });
                  this.increaseId();
                  this.setState({ value: 0 });
                }}
              >
                Adicionar despesa
              </button>
            )}

        </form>
        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {this.renderTable()}
          </tbody>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  dispatchExpense: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.object),
  allCoins: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (value) => dispatch(updateExpenses(value)),
  replaceWalletExpenses: (value) => dispatch(deleteExpense(value)),
  dispatchCoins: () => dispatch((updateCoins())),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  allCoins: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
