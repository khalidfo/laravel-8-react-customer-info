import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";

function Home() {
  return (
    <Container>
      <div className="card card-body">
        <h2>Welcome to Home Page</h2>        
      </div>
    </Container>
  );
}
export default Home;
