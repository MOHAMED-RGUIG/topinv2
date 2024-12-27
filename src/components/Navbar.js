import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { Link } from "react-router-dom";

function Navbar() {
  const cartstate = useSelector(state => state.cartReducer);
  const userstate = useSelector(state => state.loginUserReducer);
  const [pageTitle, setPageTitle] = useState(
    localStorage.getItem("pageTitle") || "Acceuil"
  );  
  const { currentUser } = userstate;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("pageTitle", pageTitle);
  }, [pageTitle]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="d-flex text-start sticky">
        <div
          ref={sidebarRef}
          className={`sidebar p-4 side-light border-end ${sidebarOpen ? 'open' : ''}`}
          style={{
            position: "fixed", // Ensure the sidebar stays fixed
            top: 0,
            left: sidebarOpen ? "0" : "-100%", // Sidebar slides in from the left, full width
            width: "100%", // Full width when open
            height: "100%", // Full height sidebar
            transition: "left 0.3s ease-in-out", // Smooth transition effect for sliding in
            backgroundColor: "#f8f9fa", // Background color of sidebar
            zIndex: 1040, // Ensure it stays above other elements
          }}
        >

            <span className="bi bi-x-lg x-mark-menu" onClick={toggleSidebar}></span>

          <div className="list-group list-group-flush p-1">

            {currentUser ? (
              <>
                <div className="nav-link pb-5">
                  {currentUser.NOMUSR}
                  <p style={{ fontSize: "13px", color: "#183F7F" }}>
                    {currentUser.EMAILUSR}
                  </p>
                </div>
                <Link
                  to="/menu"
                  className="list-group-item list-group-item-action bg-light"
                  onClick={() => {setPageTitle("Acceuil");
                  setSidebarOpen(false);}}
                >
                  <i className="bi bi-house-door p-2"></i>Acceuil
                </Link>
                <Link
                  to="/homescreen"
                  className="list-group-item list-group-item-action bg-light"
                  onClick={() => {setPageTitle("Liste des Inventaires");
                  setSidebarOpen(false);}}
                >
                  <i className="bi bi-list p-2"></i>Liste des Inventaires
                </Link>
                <Link
                  to="/cart"
                  className="list-group-item list-group-item-action bg-light"
                  onClick={() => {setPageTitle("Création Inventaire");
                  setSidebarOpen(false);}}
                >
                  <i className="bi bi-heart p-2"></i>Création Inventaire
                </Link>
                <Link
                  to="/validinv"
                  className="list-group-item list-group-item-action bg-light"
                  onClick={() => {setPageTitle("Validation Inventaire");
                  setSidebarOpen(false);}}
                >
                  <i className="bi bi-grid p-2"></i>Validation Inventaire
                </Link>
                <Link
                  to="/"
                  className="list-group-item list-group-item-action bg-light"
                  onClick={() => {
                    // Clear localStorage
                    localStorage.clear();
                    
                    // Dispatch logout action
                    dispatch(logoutUser());
                  }}
                >
                  <i className="bi bi-box-arrow-right p-2"></i>Déconnexion
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/cart"
                  className="list-group-item list-group-item-action bg-light"
                >
                  <i className="bi bi-house-door p-2"></i>Acceuil
                </Link>
                <Link to="/" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-person p-2"></i>Connexion
                </Link>
              </>
            )}

          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow-1">
          <nav className="navbar navbar-expand-lg bg-body" style={{
            padding: "15px 10px 10px", 
            borderBottomRightRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}>
            <div className="container-fluid">
              {/* Hamburger Menu */}
              <div className='row'>
                <div className='col-md-3'>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleSidebar}
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "2px solid white",
                      borderRadius: "50%",
                      padding: "10px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span style={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}>
                      &#9776;
                    </span>
                  </button>
                </div>
                <div className='col-md-9'>
                  {/* Logo */}
                  <a className="navbar-brand mx-auto" href="/menu">
                    <img src="https://qrcode.topclassapp.ma/logo_white.jpg" alt="TopClass Logo" style={{ height: "90px", paddingLeft: "5px" }} />
                  </a>
                </div>
              </div>
            </div>
            {/* Dynamic Title */}
            <div className="row text-start ms-0">
            {currentUser ? (
              pageTitle === "Acceuil" ? (
                <h1 className="home-heading">
                  Bonjour,<br />
                  {currentUser.NOMUSR}
                </h1>
              ) : (
                <h1>{pageTitle}</h1>
              )
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
