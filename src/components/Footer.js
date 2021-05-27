import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Footer(props) {
  return(
    <div class='footer'>
      <Card className="text-center">
      <Card.Body>
        <Card.Title>Valeriya Ilina</Card.Title>
        <a href="https://github.com/Valeriya-Ilina">GitHub</a>
      </Card.Body>
      <Card.Footer className="text-muted">June, 2021</Card.Footer>
      </Card>
    </div>
  )
}



export default Footer;
