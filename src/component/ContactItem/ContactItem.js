import PropTypes from "prop-types";
import style from "./ContactItem.module.css";

export default function ContactItem({contact,delet}) {
    return (
        <li className={style.item}>
            <p>{contact.name}:</p>
            <p>{contact.number}</p>
            <button
                className={style.button}
                onClick={()=>delet(contact.id)}
            >delete</button>
        </li>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
    delet: PropTypes.func.isRequired,
}