
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function LibroSelector({ biblia, handleLibroChange }) {
  return (
    <Row className="g-1">
      <h6>Libros</h6>
      {biblia.testaments[0].books.map((datos, index) => (
        <Col xs="auto" key={`L0-${index}`} style={{ paddingLeft: '2px', paddingRight: '2px' }}>
          <Button
            className="btn-fixed-width"
            variant="primary"
            size="sm"
            onClick={() => handleLibroChange(0, index)}
          >
            {datos.abbreviation}
          </Button>
        </Col>
      ))}
      {biblia.testaments[1].books.map((datos, index) => (
        <Col xs="auto" key={`L1-${index}`} style={{ paddingLeft: '2px', paddingRight: '2px' }}>
          <Button
            className="btn-fixed-width"
            variant="secondary"
            size="sm"
            onClick={() => handleLibroChange(1, index)}
          >
            {datos.abbreviation}
          </Button>
        </Col>
      ))}
    </Row>
  );
}

export default LibroSelector;