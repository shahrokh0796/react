import { useState } from "react";

// export default function FeedbackForm () {
//   const [text, setText] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const [isSent, setIsSent] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setIsSending(true);
//     await sendMessage(text);
//     setIsSent(true);
//     setIsSending(true);
//   }

//   if (isSent) {
//     return <h1>Thanks for Feedback!</h1>
//   }

//   return (<>
//   <form onSubmit={handleSubmit}>
//     <p>How was your stay at The Prancing Pony?</p>
//     <textarea disabled={isSending} value={text}
//     onChange={e => setText(e.target.value)} />
//     <br />
//     <button disabled={isSending} type="submit">Send</button>
//     {isSending && <p> Sending...</p>}
//   </form>
//   </>)
// }  

// function sendMessage(text) {
//   return new Promise(resolve => {
//     setTimeout(resolve, 2000)
// });
// }

// Better approach below



export default function FeedbackForm () {
  const [text, setText] = useState("");
  const [status, setStatus] = useState('typing');
 

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === "sending";
  const isSent = status === "sent";

  if (isSent) {
    return <h1>Thanks for Feedback!</h1>
  }

  return (<>
  <form onSubmit={handleSubmit}>
    <p>How was your stay at The Prancing Pony?</p>
    <textarea value={text} 
    onChange={e => setText(e.target.value)} 
    disabled={isSending}  />
    <br />
    <button type='submit' disabled={isSending}>Send</button>
    {isSending && <p>Sending...</p>}
  </form>
  </>)
}  

function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000)
});
}