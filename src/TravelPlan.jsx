import { useState } from "react";
import { initialTravelPlan } from "./Places";

// Avoid deeply nested state

// Imagine a travel plan consisting of planets, continents, and 
// countries. You might be tempted to structure its state using 
// nested objects and arrays, like in this example:


// function PlaceTree({ place }) {
//   const childPlaces = place.childPlaces;
//   return (
//     <li>
//       {place.title} 
//       {childPlaces.length > 0 && (
//         <ol>
//           {childPlaces.map(place => (
//             <PlaceTree key={place.id} place={place} />
//           ))}
//         </ol>
//       )}
//     </li>
//   );
// }

// export default function TravelPlace() {
//   const [plan, setPlan] = useState(initialTravelPlan);
//   const planets = plan.childPlaces;
//   return (
//     <>
//     <h2>Places to visit</h2>
//     <ol>
//       {planets.map(place => (
//         <PlaceTree key={place.id} place={place} />
//       ))}
//     </ol>
//     </>
//   );
// }



// Now let’s say you want to add a button to delete a place 
// you’ve already visited. How would you go about it? Updating 
// nested state involves making copies of objects all the way 
// up from the part that changed. Deleting a deeply nested place 
// would involve copying its entire parent place chain. Such 
// code can be very verbose.

// If the state is too nested to update easily, consider making 
// it “flat”. Here is one way you can restructure this data. 
// Instead of a tree-like structure where each place has an 
// array of its child places, you can have each place hold an 
// array of its child place IDs. Then store a mapping from each 
// place ID to the corresponding place.

// This data restructuring might remind you of seeing a database table:


// function PlaceTree({ id, placesById}) {
//   const place = placesById[id];
//   const childIds = place.childIds;
//   return (
//     <li>
//       {place.title}
//       {childIds.length > 0 && (
//         <ol>
//           {childIds.map(childId => (
//             <PlaceTree key={childId} id={childId}
//           placesById={placesById} />
//           ))}
//         </ol>
//       )}
//     </li>
//   );
// }


// export default function TravelPlan() {
//   const [plan, setPlan] = useState(initialTravelPlan);
//   const root = plan[0];
//   const planetIds = root.childIds;
//   return (<>
//   <h2>Places to visit</h2>
//   <ol>
//     {planetIds.map(id => (
//       <PlaceTree key={id} id={id} 
//       placesById={plan} />
//     ))}
//   </ol>
//   </>);
// }


// Now that the state is “flat” (also known as “normalized”), 
// updating nested items becomes easier.

// In order to remove a place now, you only need to update two 
// levels of state:

// -> The updated version of its parent place should exclude the removed ID from its childIds array.

// -> The updated version of the root “table” object should include the updated version of the parent place.

// Here is an example of how you could go about it:


export default function TravelPlan() {
    const [plan, setPlan] = useState(initialTravelPlan);

    function handleComplete(parentId, childId) {
        const parent = plan[parentId];
        // Create a new version of the parent place
        // that doesn't include this child ID.
        const nextParent = {
            ...parent,
            childIds: parent.childIds.filter(id => id !== childId)
        };
        setPlan({
            ...plan,
            // ...so that it has the updated parent
            [parentId]: nextParent
        });
    }

    const root = plan[0];
    const planetIds = root.childIds;
    return (<>
    <h2>Places to visit</h2>
    <ol>
        {planetIds.map(id => (
            <PlaceTree key={id} id={id} 
            parentId={0} placesById={plan}
            onComplete={handleComplete} />
        ))}
    </ol>
    </>);
}

export function PlaceTree({ id, parentId, placesById, onComplete}) {
    const place = placesById[id];
    const childIds = place.childIds;
    return (
        <li>
            {place.title} &nbsp;
            <button onClick={()=> {
                onComplete(parentId, id);
            }}>Complete</button>
            <br /><br />
            <ol>
                {childIds.map(childId => (
                    <PlaceTree key={childId}
                    id={childId} parentId={id}
                    placesById={placesById} 
                    onComplete={onComplete}
                    />
                ))}
            </ol>
        </li>
    );
}