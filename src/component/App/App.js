import { Component } from "react";
import style from './App.module.css'
import AddContact from "../AddContact/AddContact";
import ContactList from "../ContactList/ContactList";
import { v4 as uuidv4 } from 'uuid';
import Filtr from "../Filter/Filter";


export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contactsMem = JSON.parse(localStorage.getItem("contacts"));
    if(contactsMem) this.setState({ contacts: contactsMem });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    const { contacts } = this.state;

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = (id) =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    // const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <AddContact handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        {contacts.length > 0 ?
          <>
            <Filtr value={this.state.filter} onChange={this.changeFilter}/>
            <ContactList contacts={this.visibleContacts()} delet={this.deleteContact} />
          </>
        : (<h4>Your phonebook is empty</h4>)
        }
        
      </div>
    );
  }
}
