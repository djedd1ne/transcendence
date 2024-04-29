
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function ActiveNavbar (props) { 

	function submitLogout(e) {
		e.preventDefault();
		props.client.get(
			"/api/logout",
		).then(function(res) {
			props.setCurrentUser(false);
		});
		props.setRegistrationToggle(false);
	}

	return (
			<div>
			<Navbar bg="dark" variant="dark">
			<Container>
			<Navbar.Brand>Authentication App</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
			<Navbar.Text>
			<form onSubmit={e => submitLogout(e)}>
			<Button type="submit" variant="light">Log out</Button>
			</form>
			</Navbar.Text>
			</Navbar.Collapse>
			</Container>
			</Navbar>
			<div className="center">
			<h2>You're logged in!</h2>
			</div>
			</div>
	);
}

export default ActiveNavbar;
