import React from 'react';
import './App.css';
import BillList from "./components/bills/list/BillList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navbar from "./components/NavigationBar";
import {NotFound} from "./components/NotFound";


const router = createBrowserRouter([
    {
        path: "/",
        element: <BillList/>,
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);


function App() {
  return (
      <>
          <Navbar/>
          <RouterProvider router={router} />
      </>
  );
}

export default App;
