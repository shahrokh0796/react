import { LevelContext } from "./LevelContext";
import { useContext } from "react";
// export default function Section ({level, children}) {
//     return (
//         <section>
//             {children}
//         </section>
//     );
// }



// export default function Section({ level, children }) {
//     return (
//         <section className='section'>
//             <LevelContext.Provider value={level}>
//                 {children}
//             </LevelContext.Provider>
//         </section>
//     );
// }

// Wrap them with a context provider to provide the LevelContext to them:

// export default function Section ({level, children}) {
//     return (
//         <section>
//             <LevelContext.Provider vaue={level+1}>
//                 {children}
//             </LevelContext.Provider>
//         </section>
//     );
// }

// With this change, you don’t need to pass the level prop either to 
// the <Section> or to the <Heading>:
// ====================================================================

export default function Section({children, isFancy}) {
    const level = useContext(LevelContext);
    return(
        <section className={"section "+ isFancy ? 'fancy': ''}>
            <LevelContext.Provider value={level+1}>
                {children}
            </LevelContext.Provider>
        </section>
    );
}