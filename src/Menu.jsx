import { useState } from "react";

// Avoid duplication in state 
// This menu list component lets you choose a single travel snack out of several:

const initialItems = [
    { title: 'pretzels', id: 0 },
    { title: 'crispy seaweed', id: 1 },
    { title: 'granola bar', id: 2 },
];

// export default function Menu() {
//     const [items, setItems] = useState(initialItems);
//     const [selectedItem, setSelectedITem] = useState(items[0]);

//     return (<>
    
//     <h2>What&apos;s your travel snack?</h2>

//     <ul>
//         {items.map(item => (
//             <li key={item.id}>
//                 {item.title}
//                 <button onClick={() => {
//                     setSelectedITem(item);
//                 }}>Choose</button> {"  "}
//                 <br />
//             </li>
//         ))}
//     </ul>
//     <p> You picked {selectedItem.title} </p>
//     </>);
// }


// Currently, it stores the selected item as an object in 
// the selectedItem state variable. However, this is not 
// great: the contents of the selectedItem is the same 
// object as one of the items inside the items list. This 
// means that the information about the item itself is duplicated 
// in two places.

// Why is this a problem? Let’s make each item editable:



// export default function Menu() {
//     const [items, setItems] = useState(initialItems);
//     const [selectedItem, setSelectedItem ]= useState(items[0]);
    
//     function handleOnChange(id, e) {
//         setItems(items.map((item) => {
//             if (item.id === id) {
//                 return {
//                     ...item,
//                     title: e.target.value,
//                 };
//             } else {
//                 return item;
//             }
//         }))
//     }
    
//     return (<>
//     <h2>What&apos your favourite snace</h2>
//     <ul>
//         {items.map((item) => (
//            <>
//            <li key={item.id}>
//                 <input type="" 
//                 value={item.title} 
//                 onChange={(e)=> {handleOnChange(item.id, e)}} 
//                 />
//                 {'  '}
//                 <button onClick={() => {
//                     setSelectedItem(item);
//                 }}>Choose</button>
                
//             </li>
//             <br /> 
//             </> 
//         ))}
//         <p>You selected {selectedItem.title} </p>
//     </ul>
//     </>);
// }


// Notice how if you first click “Choose” on an item and then 
// edit it, the input updates but the label at the bottom 
// does not reflect the edits. This is because you have 
// duplicated state, and you forgot to update selectedItem.


// Although you could update selectedItem too, an easier 
// fix is to remove duplication. In this example, instead 
// of a selectedItem object (which creates a duplication with 
// objects inside items), you hold the selectedId in state, and then 
// get the selectedItem by searching the items array for an 
// item with that ID:


export default function Menu () {
    const [items, setITems] = useState(initialItems);
    const [selectedId, setSelectedId] = useState(0);

    const selectedItem = items.find(item => item.id === selectedId);

    function handleItemChange(id, e) {
        setITems(items.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    title: e.target.value,
                }
            } else {
                return item;
            }
        }))
    }

    return (<>
        <h2>What&apos;s your travel snack?</h2>
        <ul>
            <>
            {items.map((item) => (
                <li key={item.id}>
                    <input value={item.title} 
                    onChange={(e) => {handleItemChange(item.id, e);}} />
                    {" "}
                <button onClick={() =>{setSelectedId(item.id)}}>Choose</button>
                </li>
            ))}
            <br />
            </>
        </ul>
        <p>You choose {selectedItem.title}</p>
    </>);
}

