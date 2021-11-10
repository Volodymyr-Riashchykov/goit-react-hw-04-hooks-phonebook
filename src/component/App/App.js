import { useState, useEffect } from "react";
import style from './App.module.css'
import AddContact from "../AddContact/AddContact";
import ContactList from "../ContactList/ContactList";
import { v4 as uuidv4 } from 'uuid';
import Filtr from "../Filter/Filter";


export default function App() {
  // state = {
  //   contacts: [],
  //   filter: "",
  // };

  // componentDidMount() {
  //   const contactsMem = JSON.parse(localStorage.getItem("contacts"));
  //   if(contactsMem) this.setState({ contacts: contactsMem });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  //   }
  // }
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    // const { contacts } = this.state;

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      // this.setState(({ contacts }) => ({
      //   contacts: [contact, ...contacts],
      // }));
      setContacts((contacts) => [contact, ...contacts]);
    }
  };

  const deleteContact = (id) => setContacts(contacts.filter((contact) => contact.id !== id));
    // this.setState(({ contacts }) => ({
    //   contacts: contacts.filter((contact) => contact.id !== id),
    // }));

  const changeFilter = (e) => {
    // this.setState({ filter: e.currentTarget.value });
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    // const { contacts, filter } = this.state;
    // const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // render() {
  //   const { contacts } = this.state;
    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <AddContact handleAddContact={handleAddContact} />
        <h2>Contacts</h2>
        {contacts.length > 0 ?
          <>
            <Filtr value={filter} onChange={changeFilter}/>
            <ContactList contacts={visibleContacts()} delet={deleteContact} />
          </>
        : (<h4>Your phonebook is empty</h4>)
        }
        
      </div>
    );
  // }
}
