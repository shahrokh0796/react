import { useState } from "react";

export default function Form () {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <h1>That&apos;s right</h1>
  }

  async function receiveFormSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      await formSubmit(answer);
      setStatus("success");
    } catch (error) {
      setStatus("typing");
      setError(error);
    }
  }

  function handleOnTextareaChange (e) {
    setAnswer(e.target.value);
  }


  return (<> 
    <h2> City quiz</h2>
    <p>In which city is there a billboard that turns air into drinkable water?</p>
    <form onSubmit={receiveFormSubmit}>
      <textarea value={answer} onChange={handleOnTextareaChange} 
      disabled={status === "submitting"} />
      <br />
    <button disabled={
      answer.length === 0 || status === "submitting"
    }>Submit</button>

    { error !== null && <p>{error.message}</p>}
    </form>
   </>);


}


function formSubmit (answer) {
  return new Promise((resolve,reject) => {
    let shouldError = answer.toLowerCase() !== 'lima';
    setTimeout(() => {
      if (shouldError) {
        reject(new Error("Good guess but wrong answer try again!"));
      } else {
        resolve();
      }
    }, 1000);
  });
} 
