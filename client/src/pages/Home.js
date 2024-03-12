import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../components/Header";
import NotesListPage from "./NotesListPage";
import NotePage from "./NotePage";
import Login from "./Login";
import { useContext, useEffect, useState } from "react";
import App, { AuthContext } from "../App";
import NotFound from "./NotFound";




function Home() {
   
  const {cookie} =  useContext(AuthContext);
  return (
    // <Router>
      <div className="container dark">
        <div className="app">
        {cookie.token ? <Header />:"" }
        <Routes>
          <Route path="/" exact element={cookie.token? <NotesListPage/>: <Login/>}/>
          <Route path="/notes"  element={<NotesListPage/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/note/:id"  element={<NotePage/>}/>
          <Route path="*"  element={<NotFound/>}/>
        </Routes>
        </div>
      </div>
    //   </Router>
  );
}

export default Home;
