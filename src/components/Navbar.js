import { Navbar, Nav, Container } from 'react-bootstrap';

function myNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Bouldering Comp Scoring</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Main Round</Nav.Link>
            <Nav.Link href="/finals">Finals Round</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default myNavbar;