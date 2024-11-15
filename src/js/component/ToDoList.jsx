import React, { useState, useEffect } from "react";
import { library } from "webpack";

const url = 'https://playground.4geeks.com/todo'

function ToDoList() {
  const [userData, setUserData] = useState([]);
  const [chore, setChore] = useState('');
  


  // ________________________________________________________


  useEffect(() => {
    addUser();
    getUserData();

  }, []);


  // ________________________________________________________


  // Creación de usuario ---------->

  const addUser = async () => {
    try {
      const response = await fetch(url + '/users/Rello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Something went wrong...')
      const data = await response.json()
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  // Adqusición de datos del usuario ---------->

  const getUserData = async () => {
    try {
      const response = await fetch(url + '/users/Rello');
      if (!response.ok) throw new Error('Something went wrong...')
      const data = await response.json()
      setUserData(data);
    } catch (error) {
      console.log(error)
    }
  }


  const createChore = async () => {
    try {
      const payload = {
        label: chore,
        is_done: false
      }
      const response = await fetch(url + '/todos/Rello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new error('Something went wrong...');
      const data = response.json();
    } catch (error) {
      console.error(error)
    }
  }



  console.log('user------>', userData);


// ----- HTML ---------->

return (
  <div className="text-center">

    <ul>
      {userData.todos?.map(el=> <li key={el.id}>{el.label}</li>)}
    </ul>


  </div>
);

}


// // ___________________________________________________

export default ToDoList;
