// Import the useContext Hook from React and your context:
import { useContext } from "react";
import { LevelContext } from "./LevelContext.jsx";


// Currently, the Heading component reads level from props:

// export default function Heading ({level, children}) {
// }

// Instead, remove the level prop and read the value from the context you just imported, LevelContext:

// export default function Heading ({children}) {
//     const level = useContext(LevelContext);
// }

// useContext is a Hook. Just like useState and useReducer, you can only 
// call a Hook immediately inside a React component (not inside loops or conditions). 
// useContext tells React that the Heading component wants to read the 
// LevelContext.

// Now that the Heading component doesn’t have a level prop, you don’t need 
// to pass the level prop to Heading in your JSX like this anymore:

{/* <Section>
  <Heading level={4}>Sub-sub-heading</Heading>
  <Heading level={4}>Sub-sub-heading</Heading>
  <Heading level={4}>Sub-sub-heading</Heading>
</Section> */}

// Update the JSX so that it’s the Section that receives it instead:

{/* <Section level={4}>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
</Section> */}

// As a reminder, this is the markup that you were trying to get working:

// export default function Heading ({ children }) {
//     const level = useContext(LevelContext);

//     switch(level) {
//         case 1: 
//         return <h1>{children}</h1>
        
//         case 2: 
//         return <h2>{children}</h2>
    
//         case 3:
//             return <h3>{children}</h3>
    
//         case 4:
//         return <h4>{children}</h4>
    
//         case 5:
//         return <h5>{children}</h5>
    
//         case 6:
//         return <h6>{children}</h6>
//     }
// }

// export default function Heading({ children }) {
//   const level = useContext(LevelContext);
//   switch (level) {
//     case 1:
//       return <h1>{children}</h1>;
//     case 2:
//       return <h2>{children}</h2>;
//     case 3:
//       return <h3>{children}</h3>;
//     case 4:
//       return <h4>{children}</h4>;
//     case 5:
//       return <h5>{children}</h5>;
//     case 6:
//       return <h6>{children}</h6>;
//     default:
//       throw Error('Unknown level: ' + level);
//   }
// }

// ==========================================================

export default function Heading({children}) {
  const level = useContext(LevelContext);
  
  switch(level) {
   case 0: {
    throw Error("Heading must be inside a section!");
   } 

   case 1: {
    return <h1> {children} </h1>
   }
   case 2: {
    return <h2> {children} </h2>
   }
   case 3: {
    return <h3> {children} </h3>
   }
   case 4: {
    return <h4> {children} </h4>
   }
   case 5: {
    return <h5> {children} </h5>
   }
   case 6: {
    return <h6> {children} </h6>
   } 

   default : throw Error("Unknown Level "+ level);
  }
}


