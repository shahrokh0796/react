import { useState } from "react";

// Avoide redundant state
// If you can calculate some information from the component’s 
// props or its existing state variables during rendering, 
// you should not put that information into that component’s state.
// For example, take this form. It works, but can you find 
// any redundant state in it?

// export default function Form () {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [fullName, setFullName] = useState("");

//     function handleFirstNameChange(e) {
//         setFirstName(e.target.value);
//         setFullName(e.target.value+" "+ lastName);
//     }

//     function handleLastNameChange(e) {
//         setLastName(e.target.value);
//         setFullName( firstName +" "+ e.target.value);
//     }

//     return (<>
//     <h1>Let&apos;s check you in</h1>
//     <form>
//         <label>
//             FirstName:
//             <input value={firstName} 
//             onChange={handleFirstNameChange} />
//         </label>
//         <br /><br />
//         <label>
//             LastName:
//             <input value={lastName} 
//             onChange={handleLastNameChange} />
//         </label>
//         <br />

//         <p>Your ticket will be issued <strong> {fullName} </strong> </p>
//     </form>
//     </>);
// }


// This form has three state variables: firstName, lastName, 
// and fullName. However, fullName is redundant. You can 
// always calculate fullName from firstName and lastName 
// during render, so remove it from state.

// This is how you can do it:


export default function Form () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const fullName = firstName + ' ' + lastName; 
    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }

    return (<>
    <h1>Let&apos;s check you in</h1>
    <form>
        <label>
            FirstName:
            <input value={firstName} 
            onChange={handleFirstNameChange} />
        </label>
        <br /><br />
        <label>
            LastName:
            <input value={lastName} 
            onChange={handleLastNameChange} />
        </label>
        <br />

        <p>Your ticket will be issued <strong> {fullName}  </strong> </p>
    </form>
    </>);
}

// Here, fullName is not a state variable. Instead, it’s calculated during render:

// const fullName = firstName + ' ' + lastName;

// As a result, the change handlers don’t need to do anything 
// special to update it. When you call setFirstName or setLastName, 
// you trigger a re-render, and then the next fullName 
// will be calculated from the fresh data.
