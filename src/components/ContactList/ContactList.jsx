import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import useContacts from 'hooks/useContacts';
import { useGetAllContactsQuery } from 'redux/contacts';
import ContactItem from './ContactItem/ContactItem';
import Spinner from 'components/Spinner/Spinner';
import style from './ContactList.module.css';

export default function ContactList() {
  const { data: contacts = [], isError, isLoading } = useGetAllContactsQuery();
  const { filter } = useContacts();

  useEffect(() => {
    if (isError) {
      toast.error(
        'Oops! Something went wrong. Please reload the page and try again'
      );
    }
  }, [isError]);

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  const showContacts = contacts.length > 0;

  return (
    <>
      {showContacts && (
        <ul className={style.list}>
          {filteredContacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
      {isLoading && <Spinner size={80} />}
      {!isLoading && !isError && contacts.length === 0 && (
        <h4>The phone book is currently empty</h4>
      )}
    </>
  );
}
