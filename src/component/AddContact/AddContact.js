import { useState } from "react";
import AddContactInput from "../AddContactInput/AddContactInput";
import style from './AddContact.module.css'

export default function AddContact({ handleAddContact }) {
    // state = {
    //     name: "",
    //     number: ""
    // }
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const hahdleChange = e => {
        // this.setState({ [e.currentTarget.name]: e.currentTarget.value })
        if (e.currentTarget.name === "name") setName(e.currentTarget.value);
        if (e.currentTarget.name === "number") setNumber(e.currentTarget.value);
    }

    const handleSubmit = e => {
    e.preventDefault();
        // this.props.handleAddContact(this.state);
        handleAddContact(name, number);
        resetState();
    };

    const resetState = () => {
        setName("");
        setNumber("");
    }
        // this.setState({ name: "", number: "" });
// render(){
    return (
        <form className={style.inputForm} onSubmit={handleSubmit}>
            <AddContactInput
                type="text"
                name="Name"
                value={name}
                hahdleChange={hahdleChange}
                title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            />
            <AddContactInput
                type="tel"
                name="Number"
                value={number}
                hahdleChange={hahdleChange}
                title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            />
                
            
            <button type="submit" className={style.btn}>Add contact</button>
        </form>
    )
// }
} 