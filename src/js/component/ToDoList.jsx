import React, { useState, useEffect } from "react";



function ToDoList() {
  const [userData, setUserData] = useState([]);
  const [chore, setChore] = useState('');
  const url = 'https://playground.4geeks.com/todo'



  useEffect(() => {
    addUser();
    getUserData();

  }, []);



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



  const handleSubmit = e => {
    e.preventDefault();
    createChore();
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
      const data = await response.json();
      getUserData()
      setChore('')
    } catch (error) {
      console.error(error)
    }
  }


  const handleDelete = async (id) => {
    try {
      const response = await fetch(url + '/todos/' + id, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Something went wrong...')
      getUserData();
    } catch (error) {
      console.log(error)
    }
  }


  console.log('user------>', userData);


  return (
    <div className="choreContainer">
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <input type="text" value={chore} onChange={e => setChore(e.target.value)} required />
        </form>
        <ul>
          {userData.todos?.map(el => <li key={el.id}>{el.label} <button className="deleteButton" onClick={e => handleDelete(el.id)}> Delete </button></li>)}
          <p>{userData.todos?.length} More to go!</p>
        </ul>
      </div>
    </div>
  );
}



export default ToDoList;
