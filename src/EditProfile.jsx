import { useState } from "react";

export default function EditProfile() {
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLasttName] = useState("Jacobs");
  const [isEditing, setIsEditing] = useState(true);

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLasttName(e.target.value);
  }
  let profileContent;
  
  if (isEditing) {
    profileContent = (<>
        First name:{' '}
        <b> {firstName} </b>
        <br /><br />
        Last name:{' '}
        <b> {lastName} </b>
        
        <br /><br />
    </>);
  } else {
    profileContent =(<>
    <label>
        First name:{' '}
        <input value={firstName} 
        onChange={handleFirstNameChange}  />
      </label>

      <br /><br />

      <label>
      Last name:{' '}
        <input value={lastName} 
        onChange={handleLastNameChange} />
      </label>

      <br /><br />
      
    </>);
  }

  

  return (
    <form onSubmit={handleFormSubmit}>
      {profileContent}
      <button type="submit" 
      onClick={() => setIsEditing(e => !e)}>
        {isEditing ? "Edit Profile" : "Save Profile" }
      </button>
      <p><i>Hello, {firstName} {lastName}!</i></p>

    </form>
  );
}
