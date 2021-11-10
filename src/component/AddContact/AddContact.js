import { Component } from "react";
import AddContactInput from "../AddContactInput/AddContactInput";
import style from './AddContact.module.css'

export default class AddContact extends Component {
    state = {
        name: "",
        number: ""
    }
    hahdleChange = e => {
    this.setState({[e.currentTarget.name]:e.currentTarget.value})
    }
    handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddContact(this.state);
    this.resetState();
  };

  resetState = () => this.setState({ name: "", number: "" });
render(){
    return (
        <form className={style.inputForm} onSubmit={this.handleSubmit}>
            <AddContactInput
                type="text"
                name="Name"
                value={this.state.name}
                hahdleChange={this.hahdleChange}
                title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            />
            <AddContactInput
                type="tel"
                name="Number"
                value={this.state.number}
                hahdleChange={this.hahdleChange}
                title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            />
                
            
            <button type="submit" className={style.btn}>Add contact</button>
        </form>
    )
}
} 