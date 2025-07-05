import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import "../styles/BookingPage.css";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    service: "",
    technician: "",
    date: "",
    time: "",
    urgency: "normal",
    description: "",
    agreeTerms: false,
  });

  const [showAlert, setShowAlert] = useState(false);

  const services = [
    "Computer Repair & Maintenance",
    "Mobile Device Repair",
    "Network Setup & Configuration",
    "Smart Home Installation",
    "Printer & Scanner Service",
    "Security Camera Installation",
    "Gaming Console Repair",
    "Data Recovery & Backup",
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, technicianId: formData.technician };
      delete payload.technician;

      const response = await fetch(
        "http://localhost:5000/api/worker-bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          zipCode: "",
          service: "",
          technician: "",
          date: "",
          time: "",
          urgency: "normal",
          description: "",
          agreeTerms: false,
        });
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error.");
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <Container style={{ paddingTop: "100px", paddingBottom: "50px" }}>
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-4 fw-bold mb-3">Book Your Service</h1>
          <p className="lead text-muted">
            Schedule your appointment with our expert technicians
          </p>
        </Col>
      </Row>

      <Row>
        {/* Booking Form */}
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Service Booking Form</h4>
            </Card.Header>
            <Card.Body className="p-4">
              {showAlert && (
                <div className="alert alert-success">
                  Your booking has been submitted!
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      <FaEnvelope className="me-1" /> Email *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      <FaPhone className="me-1" /> Phone *
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={8} className="mb-3">
                    <Form.Label>City *</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label>PIN Code *</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Select Service *</Form.Label>
                    <Form.Select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a service...</option>
                      {services.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Preferred Technician</Form.Label>
                    <Form.Select
                      name="technician"
                      value={formData.technician}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose an available technician</option>
                      <option value="1">Ram Roy — Computer Hardware</option>
                      <option value="2">Saym Sekhar — Plumber</option>
                      <option value="3">Modhu Banerjee — Smart House</option>
                      <option value="4">
                        Amit Kumar — Computer Technician
                      </option>
                      <option value="5">Priya Singh — Mobile Repair</option>
                      <option value="6">Ravi Verma — Network Engineer</option>
                      <option value="7">Kavita Joshi — Smart Home</option>
                      <option value="8">Sandeep Das — Printer</option>
                      <option value="9">Neha Sharma — Security</option>
                      <option value="10">Anjal Mehra — AC</option>
                      <option value="11">GTechnician — General</option>
                    </Form.Select>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getTomorrowDate()}
                      max={getMaxDate()}
                      required
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Time *</Form.Label>
                    <Form.Select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select time...</option>
                      {timeSlots.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Urgency</Form.Label>
                  <Form.Select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                  >
                    <option value="normal">Normal (1–3 Days)</option>
                    <option value="urgent">Urgent (Same Day)</option>
                    <option value="emergency">Emergency (ASAP)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  size="lg"
                  className="w-100 btn-custom btn-primary-custom"
                >
                  Book Service
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

{/* Sidebar */}
<Col lg={4}>
  <Card className="shadow h-100" style={{ height: '100%' }}>
    <Card.Header className="bg-info text-white">
      <h4 className="mb-0">Need Help? We've Got You Covered</h4>
    </Card.Header>
    <Card.Body style={{ height: '100%' }}>
      <div>
        {/* Availability */}
        <h5 className="mb-3 text-dark">🕒 Technician Availability</h5>
        <p className="mb-2"><strong>Monday – Friday:</strong><br />9:00 AM – 6:00 PM</p>
        <p className="mb-4"><strong>Saturday – Sunday:</strong><br />10:00 AM – 4:00 PM</p>

        <hr />

        {/* Why Us */}
        <h5 className="mt-4 mb-3 text-dark">🌟 Why Choose Us?</h5>
        <ul className="ps-3 mb-4">
          <li className="mb-2">✅ Verified Technicians</li>
          <li className="mb-2">✅ Affordable, Fast & Trusted</li>
          <li className="mb-2">✅ Emergency Options Available</li>
        </ul>

        <hr />

        {/* Services */}
        <h5 className="mt-4 mb-3 text-dark">🛠️ Services Covered</h5>
        <ul className="ps-3 mb-4">
          <li className="mb-2">💻 PC / Mobile / Printer Repair</li>
          <li className="mb-2">🏠 Smart Home Setup</li>
          <li className="mb-2">📡 Network / Security Systems</li>
        </ul>

        <hr />

        {/* Contact Info */}
        <h5 className="mt-4 mb-3 text-dark">📞 Support</h5>
        <p className="mb-1"><strong>Phone:</strong> +91-9876543210</p>
        <p className="mb-1"><strong>Email:</strong> techservice@gmail.com</p>
        <p><strong>Working Days:</strong> All Days | 9 AM – 7 PM</p>
      </div>
    </Card.Body>
  </Card>
</Col>


      </Row>
    </Container>
  );
};

export default BookingPage;
