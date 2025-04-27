import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import Sizebar from './Components/SizeBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employees from './Page/Employees';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inventory from './Page/Inventory';
function App() {
  return (
    <BrowserRouter>
      <Container fluid className='p-0'>
        <Row className="app-row w-100">
          <Col xs={2} className="sidebar pe-0">
            <Sizebar />
          </Col>
          <Col md={10} className=" p-3 ps-0 pe-5">
            <Routes>
              <Route path="/" element={<Employees />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
