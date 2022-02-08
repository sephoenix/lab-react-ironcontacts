import { useState } from "react";
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  const [contacts, setContact] = useState(contactsData.slice(0, 5));

  const randomContact = () => {
    const newContact =
      contactsData[Math.floor(Math.random() * contactsData.length-1)];
    
    const isIncluded = contacts.includes(newContact)

    if (!isIncluded) {
      setContact([newContact, ...contacts]);
    } else {
      randomContact();
    }
  };

  const sortByName = () => {
    setContact((contacts) => [
      ...contacts.sort((a, b) => a.name.localeCompare(b.name)),
    ]);
  };

  const sortByPopularity = () => {
    setContact((contacts) => [
      ...contacts.sort((a, b) => b.popularity - a.popularity),
    ]);
  };

  const deleteContact = (id) => {
/*     const filteredContacts = contacts.filter(cont=>{
      return cont.id !== id;
    })
    setContact(filteredContacts); */
    setContact(contacts.filter((cont) => cont.id !== id));
  };

  return (
    <div className="table">
      <h1>Ironcontacts</h1>
      <button onClick={randomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        {contacts.map((cont) => {
          return (
            <tbody>
              <tr>
                <td>
                  <img src={cont.pictureUrl} alt="" />
                </td>
                <td>{cont.picture}</td>
                <td>{cont.name}</td>
                <td>{cont.popularity.toFixed(2)}</td>
                <td>{cont.wonOscar === true ? "🏆" : ""}</td>
                <td>{cont.wonEmmy === true ? "🏆" : ""}</td>
                <td>
                  <button onClick={() => deleteContact(cont.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default App;
