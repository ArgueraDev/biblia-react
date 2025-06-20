import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import biblia from './biblia/rvr.json';
import LibroSelector from './components/LibroSelector';
import CapituloSelector from './components/CapituloSelector';
import VersiculoList from './components/VersiculoList';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [Libro, setLibro] = useState(0);
  const [Testamento, setTestamento] = useState(0);
  const [Capitulo, setCapitulo] = useState(0);
  const [versiculos, setVersiculos] = useState([]);
  const [Seleccion, setSeleccion] = useState();


  const handleLibroChange = (test, libro) => {
    setTestamento(test);
    setLibro(libro);
  };

  const handleCapituloChange = (capitulo) => {
    setCapitulo(capitulo);
    const nuevosVersiculos = Object.values(
      biblia.testaments[Testamento].books[Libro].chapters[capitulo].verses
    );

    setSeleccion({ libro: biblia.testaments[Testamento].books[Libro].name, capitulo: capitulo + 1 });
    setVersiculos(nuevosVersiculos);
  };

  const handleVersiculoChange = (texto, verso) => {
    const mensaje = {
      cita: Seleccion.libro + " " + Seleccion.capitulo + ":" + verso,
      texto: texto
    };
    socket.emit("versiculo", mensaje);
  };

  const handleLimpiar = () => {
    socket.emit("versiculo", "");
  };

  useEffect(() => {
    if (biblia && biblia.testaments?.[Testamento]?.books?.[Libro]) {
      setVersiculos(
        Object.values(
          biblia.testaments[Testamento].books[Libro].chapters[Capitulo].verses
        )
      );
      setSeleccion({
        libro: biblia.testaments[Testamento].books[Libro].name,
        capitulo: Capitulo + 1
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid style={{ height: '100dvh' }}>
      <Row>
        <Col md={7} className="text-center mt-1 d-flex flex-column" style={{ paddingLeft: '8px', paddingRight: '8px' }}>
          <LibroSelector biblia={biblia} handleLibroChange={handleLibroChange} />
          <CapituloSelector
            capitulos={biblia.testaments[Testamento].books[Libro].chapters}
            handleCapituloChange={handleCapituloChange}
          />
        </Col>
        <Col md={5} className="mt-1 d-flex flex-column col-versiculos" style={{ height: '90dvh', paddingLeft: '8px', paddingRight: '8px' }}>
          <VersiculoList
            versiculos={versiculos}
            Seleccion={Seleccion}
            handleVersiculoChange={handleVersiculoChange}
            handleLimpiar={handleLimpiar}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
