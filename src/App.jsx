import "./App.css";
// import { useImmer } from 'use-immer';
import { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm.jsx";

let statuses = [
  'empty',
  'typing',
  'submitting',
  'success',
  'error',
];


export default function App() {

  return (
  <>
    <FeedbackForm />
  </>
  );
}



