import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const StorePage = () => {
  const { addToCart } = useContext(CartContext);
  const [message, setMessage] = useState('');

  const products = [
  { id: 1, name: 'Mobile Screen Guard Pack', price: 120 },
  { id: 2, name: 'Phone Repair Toolkit', price: 750 },
  { id: 3, name: 'AC Gas Refill Canister (R32)', price: 850 },
  { id: 4, name: 'Split AC Bracket Set', price: 480 },
  { id: 5, name: 'Printer Ink Refill Kit', price: 400 },
  { id: 6, name: 'Toner Cartridge - HP Compatible', price: 950 },
  { id: 7, name: 'Smart Wi-Fi Plug (16A)', price: 1199 },
  { id: 8, name: 'Smart Door Sensor', price: 899 },
  { id: 9, name: 'Wall Mount Screw Kit', price: 180 },
  { id: 10, name: 'CCTV BNC Cable Roll (20m)', price: 520 },
  { id: 11, name: 'Fan Regulator Module', price: 250 },
  { id: 12, name: 'Universal Remote for Smart TV/AC', price: 399 },
  { id: 13, name: 'Ethernet Cable (Cat6, 10m)', price: 300 },
  { id: 14, name: 'Soldering Iron Set (with stand)', price: 650 },
  { id: 15, name: 'Heat Gun for Phone Repair', price: 1400 },
  { id: 16, name: 'Printer Cleaning Sheets (Pack of 5)', price: 150 },
  { id: 17, name: 'Smart Bulb (RGB Wi-Fi)', price: 499 },
  { id: 18, name: 'AC Remote (Universal)', price: 220 },
  { id: 19, name: 'Mobile Battery Replacement Kit', price: 780 },
  { id: 20, name: 'Digital Laser Thermometer (AC/CPU)', price: 990 },
];

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 2000);
  };
  return (
    <Container style={{ paddingTop: '100px' }}>
      <h1>Buy Components</h1>
      {message && <Alert variant="success">{message}</Alert>}
      <Row>
        {products.map((p) => (
          <Col md={4} key={p.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>₹ {p.price}</Card.Text>
                <Button onClick={() => handleAddToCart(p)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StorePage;
