// Manipulating the DOM with Refs

// Example Focusing a text
// In this example, clicking the button will focus the input:

// import {useRef, useState } from 'react';

// export default function App() {
//     const inputRef = useRef(null);

//     console.log(inputRef);

//     function handleClick() {
//         inputRef.current.focus();
//     }

//     return (
//         <>
//         <input ref={inputRef} />
//             <button onClick={handleClick}>
//                 Focus the input
//             </button>
//         </>
//     );
// }

// =====================================================================

// Example: Scrolling to an element
// You can have more than a single ref in a component. In this example, there is a carousel of three images. Each button centers an image by calling the browser scrollIntoView() method on the corresponding DOM node:

// export default function App() {
//     const firstCatRef = useRef(null);
//     const secondCatRef = useRef(null);
//     const thirdCatRef = useRef(null);    

//     function handleScrollToFifstCat() {
//         firstCatRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'nearest',
//             inline: 'center'
//         });
//     }

//     function handleScrollToSecondCat() {
//         secondCatRef.current.scrollIntoView({
//             behaviour: 'smooth',
//             block: 'nearest',
//             inline: 'center'
//         });
//     }

//     function handleScrollToThirdCat() {
//         thirdCatRef.current.scrollIntoView({
//             behaviour: 'smooth',
//             block: 'nearest',
//             inline: 'center'
//         });
//     }


//     return (<>

//     <nav>
//         <button onClick={handleScrollToFifstCat}>
//             Tom
//         </button>

//         <button onClick={handleScrollToSecondCat}>
//             Maru
//         </button>

//         <button onClick={handleScrollToThirdCat}>
//             Maru
//         </button>
//     </nav>
//     <div>
//         <ul>
//             <li>
//                 <img src="https://placekitten.com/g/200/200"
//                  alt="Tom" 
//                  ref={firstCatRef} />
//             </li>

//             <li>
//                 <img src="https://placekitten.com/g/300/200"
//                 alt="Maru" 
//                 ref={secondCatRef} />
//             </li>

//             <li>
//                 <img src="https://placekitten.com/g/250/200" alt="Jellylorum" 
//                 ref={thirdCatRef} />
//             </li>
//         </ul>
//     </div>
//     </>);
// }
// ===============================================================

// How to manage a list of refs using a ref callback 
// This example shows how you can use this approach to scroll to an arbitrary node in a long list:
// import { useRef, useState } from 'react';

// export default function App() {
//     let itemsRef = useRef(null);
//     const [catList, setCatList] = useState(setupCatList);

//     function scrollToCat(cat) {
//         const  map = getMap();
//         const node = map.get(cat);
        
//         node.scrollIntoView({
//             behavior: 'smooth',
//             block: 'nearest',
//             inline : 'center' ,
//         });
//     }

//     function getMap() {
//         if(!itemsRef.current) {
//             itemsRef.current = new Map();
//         }
//         return itemsRef.current;
//     }
    
//     return (
//         <>
//         <nav>
//             <button onClick={()=>scrollToCat(catList[0])}>
//                 Tom
//             </button>

//             <button onClick={()=> scrollToCat(catList[5])}>
//                 Maru                
//             </button>

//             <button onClick={()=> scrollToCat(catList[9])}>
//                 Jellylorum
//             </button>
//         </nav>

//         <div>
//             {
//                 catList.map((cat) => (
//                     <li key={cat}
//                     ref={(node) => {
//                         const map = getMap();
//                         if(node) {
//                             map.set(cat, node);
//                         } else {
//                             map.delete(cat);
//                         }
//                     }} >
//                     <img src={cat} />
//                     </li>
//                 ))
//             }
//         </div>
//         </>
//     );
// }


// function setupCatList() {
//     let catList = [];
//     for(let i=0; i< 11; i+=1) {
//         catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
//     }
//     return catList;
// }
// =====================================================

// Accessing another component’s DOM nodes 

// When you put a ref on a built-in component that outputs a browser element like <input />, React will set that ref’s current property to the corresponding DOM node (such as the actual <input /> in the browser).

// However, if you try to put a ref on your own component, like <MyInput />, by default you will get null. Here is an example demonstrating it. Notice how clicking the button does not focus the input:

// import { useRef } from 'react';

// export default function App() {
//     return <MyForm />
// }


// function MyInput(props) {
//     return <input {...props} />
// }


// export function MyForm() {
//     const inputRef = useRef(null);

//     function handleClick() {
//         inputRef.current.focus();
//     }
//     return (
//         <>
//         <MyInput ref={inputRef} />
//         <button onClick={handleClick}>
//             Focus the input
//         </button>
//         </>
//     );
// }

// To help you notice the issue, React also prints an error to the console:

// This happens because by default React does not let a component access the DOM nodes of other components. Not even for its own children! This is intentional. Refs are an escape hatch that should be used sparingly. Manually manipulating another component’s DOM nodes makes your code even more fragile.

// Instead, components that want to expose their DOM nodes have to opt in to that behavior. A component can specify that it “forwards” its ref to one of its children. Here’s how MyInput can use the forwardRef API:


// import { useRef, forwardRef } from 'react';

// export default function App() {
//     return <MyForm />
// }


// const MyInput = forwardRef(
//     (props, ref) => {
//     return <input {...props} ref={ref} />;
//   }
// );
// export function MyForm() {
//     const inputRef = useRef(null);

//     function handleClick() {
//         inputRef.current.focus();
//     }
//     return (
//         <>
//         <MyInput ref={inputRef} />
//         <button onClick={handleClick}>
//             Focus the input
//         </button>
//         </>
//     );
// }

// This is how it works:

// 1-> <MyInput ref={inputRef} /> tells React to put the corresponding DOM node into inputRef.current. However, it’s up to the MyInput component to opt into that—by default, it doesn’t.
// 2-> The MyInput component is declared using forwardRef. This opts it into receiving the inputRef from above as the second ref argument which is declared after props.
// 2-> MyInput itself passes the ref it received to the <input> inside of it.

// In design systems, it is a common pattern for low-level components like buttons, inputs, and so on, to forward their refs to their DOM nodes. On the other hand, high-level components like forms, lists, or page sections usually won’t expose their DOM nodes to avoid accidental dependencies on the DOM structure.

// ============================================================================

// Exposing a subset of the API with an imperative handle

// In the above example, MyInput exposes the original DOM input element. This lets the parent component call focus() on it. However, this also lets the parent component do something else—for example, change its CSS styles. In uncommon cases, you may want to restrict the exposed functionality. You can do that with useImperativeHandle:

// import { 
//     forwardRef, 
//     useRef, 
//     useImperativeHandle 
// } from "react";

// const MyInput = forwardRef((props, ref) => {
//         const realInputRef = useRef(null);
//         useImperativeHandle(ref, () => ({
//             focus() {
//                 realInputRef.current.focus();
//             }
//         }));
//         return <input {...props} ref={realInputRef} />
//     });


// export default function Form() {
//     const inputRef = useRef(null);

//     function handleClick() {
//         inputRef.current.focus();
//     }

//     return (
//         <>
//         <MyInput ref={inputRef} />
//         <button onClick={handleClick}>
//             Focus the input
//         </button>
//         </>
//     );
// }

// Here, realInputRef inside MyInput holds the actual input DOM node. However, useImperativeHandle instructs React to provide your own special object as the value of a ref to the parent component. So inputRef.current inside the Form component will only have the focus method. In this case, the ref “handle” is not the DOM node, but the custom object you create inside useImperativeHandle call.
// ===================================================================================

// When React attaches the refs

// In React, every update is split in two phases:

// . During render, React calls your components to figure out what should be on the screen.
// . During commit, React applies changes to the DOM.

// In general, you don’t want to access refs during rendering. That goes for refs holding DOM nodes as well. During the first render, the DOM nodes have not yet been created, so ref.current will be null. And during the rendering of updates, the DOM nodes haven’t been updated yet. So it’s too early to read them.

// React sets ref.current during the commit. Before updating the DOM, React sets the affected ref.current values to null. After updating the DOM, React immediately sets them to the corresponding DOM nodes.

// Usually, you will access refs from event handlers. If you want to do something with a ref, but there is no particular event to do it in, you might need an Effect. We will discuss Effects on the next pages.

// DEEP DIVE
// Flushing state updates synchronously with flushSync

// Consider code like this, which adds a new todo and scrolls the screen down to the last child of the list. Notice how, for some reason, it always scrolls to the todo that was just before the last added one:

// import { useState , useRef } from 'react';
// export default function App() {
//     return <TodoList />
// }
// export function TodoList() {
//     const listRef = useRef(null);
//     const [text, setText] = useState('');
//     const [todos, setTodos] = useState(initialTodos);

//     function handleAdd() {
//         const newTodo = { id: nextId++, text: text};
//         setText('');
//         setTodos([...todos, newTodo]);
//         listRef.current.lastChild.scrollIntoView({
//             behavior: 'smooth',
//             block: 'nearest'
//         });
//     }

//     return (<>
//     <button onClick={handleAdd}>Add</button>
//     <input value={text} onChange={e => setText(e.target.value)} />
//     <ul ref={listRef}>
//         {todos.map(todo => (
//             <li key={todo.id}> {todo.text} </li>
//         ))}
//     </ul>
//     </>);
// }

// let nextId = 0;
// let initialTodos = [];
// for(let i=0; i< 20; i+=1) {
//     initialTodos.push({id: nextId++,
//         text: 'Todo #' + (i + 1)
//     });
// }

// The issue is with these two lines:

// setTodos([ ...todos, newTodo]);
// listRef.current.lastChild.scrollIntoView();

// In React, state updates are queued. Usually, this is what you want. However, here it causes a problem because setTodos does not immediately update the DOM. So the time you scroll the list to its last element, the todo has not yet been added. This is why scrolling always “lags behind” by one item.
// To fix this issue, you can force React to update (“flush”) the DOM synchronously. To do this, import flushSync from react-dom and wrap the state update into a flushSync call:

// flushSync(() => {
//     setTodos([ ...todos, newTodo]);
//   });
//   listRef.current.lastChild.scrollIntoView();

// This will instruct React to update the DOM synchronously right after the code wrapped in flushSync executes. As a result, the last todo will already be in the DOM by the time you try to scroll to it:

// import { useState, useRef } from 'react';
// import { flushSync } from 'react-dom';

// export default function TodoList() {
//   const listRef = useRef(null);
//   const [text, setText] = useState('');
//   const [todos, setTodos] = useState(
//     initialTodos
//   );

//   function handleAdd() {
//     const newTodo = { id: nextId++, text: text };
//     flushSync(() => {
//       setText('');
//       setTodos([ ...todos, newTodo]);      
//     });
//     listRef.current.lastChild.scrollIntoView({
//       behavior: 'smooth',
//       block: 'nearest'
//     });
//   }

//   return (
//     <>
//       <button onClick={handleAdd}>
//         Add
//       </button>
//       <input
//         value={text}
//         onChange={e => setText(e.target.value)}
//       />
//       <ul ref={listRef}>
//         {todos.map(todo => (
//           <li key={todo.id}>{todo.text}</li>
//         ))}
//       </ul>
//     </>
//   );
// }

// let nextId = 0;
// let initialTodos = [];
// for (let i = 0; i < 40; i++) {
//   initialTodos.push({
//     id: nextId++,
//     text: 'Todo #' + (i + 1)
//   });
// }

// ==================================================

// Best practices for DOM manipulation with refs

// Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.

// If you stick to non-destructive actions like focusing and scrolling, you shouldn’t encounter any problems. However, if you try to modify the DOM manually, you can risk conflicting with the changes React is making.

// To illustrate this problem, this example includes a welcome message and two buttons. The first button toggles its presence using conditional rendering and state, as you would usually do in React. The second button uses the remove() DOM API to forcefully remove it from the DOM outside of React’s control.

// Try pressing “Toggle with setState” a few times. The message should disappear and appear again. Then press “Remove from the DOM”. This will forcefully remove it. Finally, press “Toggle with setState”:



import { useState, useRef } from 'react';

export default function Counter() {
    const [show, setShow] = useState(true);
    const ref = useRef(null);

    return (
        <div>
            <button onClick={() => setShow(!show)}>
                Toggle with setState
            </button>
            <button onClick={() => {ref.current.remove();}}>
                Remove from DOM
            </button>

            {show && <p ref={ref}>Hello word</p>}
        </div>
    );
}

// After you’ve manually removed the DOM element, trying to use setState to show it again will lead to a crash. This is because you’ve changed the DOM, and React doesn’t know how to continue managing it correctly.

// Avoid changing DOM nodes managed by React. Modifying, adding children to, or removing children from elements that are managed by React can lead to inconsistent visual results or crashes like above.

// However, this doesn’t mean that you can’t do it at all. It requires caution. You can safely modify parts of the DOM that React has no reason to update. For example, if some <div> is always empty in the JSX, React won’t have a reason to touch its children list. Therefore, it is safe to manually add or remove elements there.

// RECAP
// .Refs are a generic concept, but most often you’ll use them to hold DOM elements.
// .You instruct React to put a DOM node into myRef.current by passing <div ref={myRef}>.
// .Usually, you will use refs for non-destructive actions like focusing, scrolling, or measuring DOM elements.
// .A component doesn’t expose its DOM nodes by default. You can opt into exposing a DOM node by using forwardRef and passing the second ref argument down to a specific node.
// .Avoid changing DOM nodes managed by React.
// .If you do modify DOM nodes managed by React, modify parts that React has no reason to update.














