
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function InactiveNavbar (props) {
	return (
		<Navbar bg="dark" variant="dark">
		<Container>
		<Navbar.Brand>Authentication App</Navbar.Brand>
		<Navbar.Toggle />
		<Navbar.Collapse className="justify-content-end">
		<Navbar.Text>
		<Button id="form_btn" onClick={props.update_form_btn} variant="light">Register</Button>
		</Navbar.Text>
		</Navbar.Collapse>
		</Container>
		</Navbar>
	);
}

export default InactiveNavbar;
