import "./App.css";
// import { useImmer } from 'use-immer';
import { useEffect, useState } from "react";
import MovingDot from "./MovingDot.jsx";

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
    <MovingDot />
  </>
  );
}



