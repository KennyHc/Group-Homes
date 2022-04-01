import React from "react";
import { Carousel, Container, Row, Image, Card } from "react-bootstrap";

function HomePage(props) {
  const images = ["/1.png", "/2.png", "/3.png"];
  const text = [
    "Welcoming community",
    "We promote diversity",
    "Various facilities",
  ];

  return (
    <Carousel className="d-flex customHeight">
      {text.map((e, i) => (
        <Carousel.Item key={i}>
          <Image
            fluid
            className="d-block w-100"
            src={images[i]}
            alt="Missing img"
          />
          <Carousel.Caption>
            <h1>{e}</h1>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomePage;
