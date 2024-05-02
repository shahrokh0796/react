import { useRef, useState } from 'react';


// Refrencing values with Refs 
// Refs: When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.


// export default function App() {
//   const ref = useRef(0);
//   function handleClick() {
//     const clicked = ref.current =ref.current+1;
//     alert('you clicked '+ clicked + " times");
//   }

//   return (
//     <button onClick={handleClick}>Click Me</button>
//   )
// }

// =========================================================

// export default function App () {
//   const [startTime, setStartTime] = useState(null);
//   const [now, setNow] = useState(null);

//   function handleStart() {
//     setStartTime(Date.now());
//     setNow(Date.now());

//     setInterval(() => {
//       setNow(Date.now());
//     }, 10);
//   }

//   let secondsPassed = 0;
//   if(startTime != null && now != null ) {
//     secondsPassed = (now - startTime)/ 1000;
//   }

//   return(
//     <>
//       <h1> Time passed:  {secondsPassed.toFixed(3)} </h1>
//       <button onClick={handleStart}>Start</button>
//     </>
//   )
// }
// ==================================================
// export default function App() {
//   const [startTime, setStartTime] = useState(null);
//   const [now, setNow] = useState(null);

//   function handleTime(){
//     setStartTime(Date.now());
//     setNow(Date.now());

//     setInterval(()=> {
//       setNow(Date.now());
//     }, 10);
//   }

//   let secondsPassed = (now - startTime) / 1000;

//   return (<>
//   <h1> Time passed: {secondsPassed.toFixed(3)} </h1>
//   <button onClick={handleTime}>Start</button>
//   </>)
// }
// ======================================================

// Here is a counter button that’s implemented with state:

// export default function App () {
//   const [counter, setCounter] = useState(0);

//   return <button onClick={()=> setCounter(counter + 1)}>You clicked {counter} times!</button>
// }

// Because the count value is displayed, it makes sense to use a state value for it. When the counter’s value is set with setCount(), React re-renders the component and the screen updates to reflect the new count.

// If you tried to implement this with a ref, React would never re-render the component, so you’d never see the count change! See how clicking this button does not update its text:


export default function App () {
  let count = useRef(0);
  console.log(count.current);
  function handleCount() {
    count.current = count.current +1
  }
  return <button onClick={handleCount}>you clicked {count.current} times</button>
}













