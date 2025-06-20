import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function CapituloSelector({ capitulos, handleCapituloChange }) {
  return (
    <Row className="g-1 mt-1">
      <h6>Capitulos</h6>
      {capitulos.map((datos, index) => (
        <Col
          xs="auto"
          key={"C" + index}
          style={{ paddingLeft: "2px", paddingRight: "2px" }}
        >
          <Button
            className="btnum-fixed-width"
            variant="primary"
            size="sm"
            onClick={() => handleCapituloChange(index)}
          >
            {datos.number}
          </Button>
        </Col>
      ))}
    </Row>
  );
}

export default CapituloSelector;
