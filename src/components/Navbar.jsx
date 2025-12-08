// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";

// function AppNavbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           📓 BuJo Companion
//         </Navbar.Brand>

//         <Navbar.Toggle />

//         <Navbar.Collapse>
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link as={Link} to="/scan">Scan Page</Nav.Link>
//             <Nav.Link as={Link} to="/search">Search</Nav.Link>
//           </Nav>

//           <Nav>
//             {!user ? (
//               <>
//                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                 <Nav.Link as={Link} to="/register">Register</Nav.Link>
//               </>
//             ) : (
//               <Button variant="outline-light" onClick={logout}>
//                 Logout
//               </Button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default AppNavbar;
import React from "react";
import "./Navbar.css";

export default function AppNavbar() {
  return (
    <div className="topnav shadow-sm">
      <h4>Bullet Journal Companion</h4>
    </div>
  );
}
