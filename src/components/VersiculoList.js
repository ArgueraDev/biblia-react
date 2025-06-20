import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:4000');

function VersiculoList({ versiculos, Seleccion, handleVersiculoChange, handleLimpiar }) {
  const [storeV, setStoreV] = useState(false);

  useEffect(() => {

    socket.on("storedVerse", (msg) => {
      if (msg === "") {
        setStoreV(false);
        return;
      }
      setStoreV(true);
    });

  }, [storeV]);

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <h4 className='text-center '>
            {Seleccion ? Seleccion.libro : 'Selecciona un libro'}
            &nbsp;-&nbsp;
            {Seleccion ? Seleccion.capitulo : 'Selecciona un capítulo'}
          </h4>
        </div>
        {storeV ?
          <div className="p-2 ms-auto">
            <Button size="sm" variant="outline-light text-center" onClick={handleLimpiar} title='Detener'>
              <svg width="20" height="20" viewBox="0 0 16 18" fill="none">
                <rect x="3" y="3" width="3" height="12" fill="currentColor" />
                <rect x="9" y="3" width="3" height="12" fill="currentColor" />
              </svg>
            </Button>
          </div> : null}
      </Stack>
      <div className="versiculos-scroll">
        <ListGroup>
          {versiculos.map((dato, index) => (
            <ListGroup.Item key={"V" + index} action variant="dark" onDoubleClick={() => handleVersiculoChange(dato, index + 1)}>
              <b>{index + 1}.</b> {dato}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default VersiculoList;