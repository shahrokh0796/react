import { useState } from "react";

// Sharing State Between Components
// Sometimes, you want the state of two components to always 
// change together. To do it, remove state from both of them, 
// move it to their closest common parent, and then pass it 
// down to them via props. This is known as lifting state up, 
// and it’s one of the most common things you will do writing 
// React code.

// Lifting state up by example 
// In this example, a parent Accordion component renders two separate 
// Panels:

// export function Panel ({title, children}) {
//     let [isActive, setIsActive] = useState(false);
//     return (
//         <section>
//             <h3>{title}</h3>
//             { isActive ? (
//                 <p>{children}</p>
//             ) : (
//                 <button onClick={() => setIsActive(true)}>
//                     Show
//                 </button>
//             )}
//         </section>
//     );
// }

// export default function Accordian() {
//     return (<>
//     <Panel title="About">
//         With a population of about 2 million, Almaty is Kazakhstan&apos;s largest city. From 1929 to 1997, it was its capital city.
//     </Panel>

//     <Panel title="Etymology">
//         With a population of about 2 million, Almaty is Kazakhstan&apos;s largest city. From 1929 to 1997, it was its capital city.
//     </Panel>
//     </>);
// }

// Notice how pressing one panel’s button does not affect the other panel—they are independent.

// Initially, each Panel’s isActive state is false, so they both appear collapsed
// Clicking either Panel’s button will only update that Panel’s isActive state alone


// But now let’s say you want to change it so that only one panel 
// is expanded at any given time. With that design, expanding 
// the second panel should collapse the first one. How would 
// you do that?

// To coordinate these two panels, you need to “lift their state 
// up” to a parent component in three steps:

// 1-> Remove state from the child components.
// 2-> Pass hardcoded data from the common parent.
// 3-> Add state to the common parent and pass it down together with the event handlers.

// This will allow the Accordion component to coordinate both 
// Panels and only expand one at a time.

// Step 1: Remove state from the child components

// You will give control of the Panel’s isActive to its parent 
// component. This means that the parent component will pass 
// isActive to Panel as a prop instead. Start by removing this 
// line from the Panel component:

// const [isActive, setIsActive] = useState(false);

// And instead, add isActive to the Panel’s list of props:

// function Panel({ title, children, isActive }) {}

// Now the Panel’s parent component can control isActive by passing 
// it down as a prop. Conversely, the Panel component now has 
// no control over the value of isActive—it’s now up to the 
// parent component!

// Step 2: Pass hardcoded data from the common parent

// To lift state up, you must locate the closest common parent 
// component of both of the child components that you want to 
// coordinate:

// Accordion (closest common parent)
// .Panel
// .Panel

// In this example, it’s the Accordion component. Since it’s 
// above both panels and can control their props, it will 
// become the “source of truth” for which panel is currently 
// active. Make the Accordion component pass a hardcoded 
// value of isActive (for example, true) to both panels:


// export default function Accordian() {
    
//     return (
//         <>
//         <h2>Almaty, Kazakhstan</h2>
//             <Panel title="About" isActive={true}>
//                 With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
//             </Panel>

//             <Panel title="Etymology" isActive={true}>
//                 The name comes from алма, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild Malus sieversii is considered a likely candidate for the ancestor of the modern domestic apple.
//             </Panel>
//         </>
//     );
// }

// export function Panel ({title, children, isActive}) {
//     return (
//         <section>
//             <h3>{title}</h3>
//             {isActive ? (
//                 <p> {children} </p>
//             ) : (
//                 <button onClick={() => setIsActive(true)}>Show</button>
//             )}
//         </section>
//     );
// }

// Try editing the hardcoded isActive values in the Accordion 
// component and see the result on the screen.

// -> Step 3:  Add state to the common parent

// Lifting state up often changes the nature of what you’re storing 
// as state.

// In this case, only one panel should be active at a time. 
// This means that the Accordion common parent component needs 
// to keep track of which panel is the active one. Instead of a 
// boolean value, it could use a number as the index of the 
// active Panel for the state variable:

// When the activeIndex is 0, the first panel is active, and 
// when it’s 1, it’s the second one.

// Clicking the “Show” button in either Panel needs to change the 
// active index in Accordion. A Panel can’t set the activeIndex 
// state directly because it’s defined inside the Accordion. 
// The Accordion component needs to explicitly allow the Panel 
// component to change its state by passing an event handler 
// down as a prop:

// The <button> inside the Panel will now use the onShow prop 
// as its click event handler:

export default function Accordian() {
    let [activeIndex, setActiveIndex] = useState(0);

    return (<>
    <h2>Some example text</h2>
    <Panel title='About' isActive={activeIndex === 0} 
    onShow={() => setActiveIndex(0)} >
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
    </Panel>

    <Panel title='About' isActive={activeIndex === 1} 
    onShow={() => setActiveIndex(1)} >
        The name comes from алма, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild Malus sieversii is considered a likely candidate for the ancestor of the modern domestic apple.
    </Panel>
    </>);
}

export function Panel({isActive, onShow, children, title}) {
    return (
    <section>
    <h2>{title}</h2>
    {isActive ? (<p>{children}</p>) 
    : (<button onClick={onShow}>Show</button>)}
    
    </section>
    );
}


// This completes lifting state up! Moving state into the common 
// parent component allowed you to coordinate the two panels. 
// Using the active index instead of two “is shown” flags ensured 
// that only one panel is active at a given time. And passing down 
// the event handler to the child allowed the child to change 
// the parent’s state.
