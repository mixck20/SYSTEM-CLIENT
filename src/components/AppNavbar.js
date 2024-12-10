import { useContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

    // Get the user context
    const { user, setUser } = useContext(UserContext);

    // Logout function to clear the user context
    const handleLogout = () => {
        setUser(null);  // This will reset the user context to null (logged out state)
        localStorage.removeItem('token');  // Optionally, remove the token from storage
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top shadow">
            <Container>
                <Navbar.Brand href="#home" className='fw-bold'>UA ENROLLMENT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>

                        {/* Conditionally render Profile Settings link */}
                        {user && user.id && (
                            <Nav.Link as={Link} to="/profile-settings">Profile Settings</Nav.Link>
                        )}

                        {/* Conditional links based on user status */}
                        {
                            user && user.id ? 
                                user.isAdmin === true ?
                                    <>
                                        <Nav.Link as={Link} to="/add-course">Add Course</Nav.Link>
                                        <Nav.Link as={Link} to="/logout" onClick={handleLogout}>Logout</Nav.Link>
                                    </>
                                    :
                                    <Nav.Link as={Link} to="/logout" onClick={handleLogout}>Logout</Nav.Link>
                            :
                            <>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
