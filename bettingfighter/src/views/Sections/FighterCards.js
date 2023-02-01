import React, { useState, useContext, useEffect, useRef } from 'react';
import { Select, Space } from 'antd';
import classnames from "classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import axios from 'axios';
import PropDrilling from "contexts/PropDrilling";


const FighterCards = () => {
    const { fighters } = useContext(PropDrilling);
    useEffect(() => {
        console.log('fighters are now', fighters)
        console.log(`age:${JSON.stringify(fighters[0])}}`)
        console.log('inside', fighters[0]?.global_id)
    },[fighters])   
    return(
        <>
          <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h6 className="text-primary text-uppercase">
                          { fighters.length < 2 ? null : fighters[0]?.name }
                        </h6>
                        <img src={ fighters.length < 2 ? "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg" : `https://raw.githubusercontent.com/EmmS21/SpringboardCapstoneBoxingPredictionWebApp/master/ml%20model/app/boxing/www/${fighters[0]?.global_id}.jpg`} alt="image not found" style={{'height': '50%', 'width': '50%', 'object-fit': 'contain'}}/>
                        <div>
                          <Badge color="primary" pill className="mr-1">
                            age: {fighters.length < 2 ? null : fighters[0]?.age}
                          </Badge>
                          <Badge color="primary" pill className="mr-1">
                            height: {fighters.length < 2 ? null : fighters[0]?.height}
                          </Badge>
                          <Badge color="primary" pill className="mr-1">
                            weight : {fighters.length < 2 ? null : fighters[0]?.weight}
                          </Badge>
                        </div>
                        <Button
                          className="mt-4"
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Bet
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                          <i className="ni ni-istanbul" />
                        </div>
                        <h6 className="text-success text-uppercase">
                          {fighters.length < 2 ? null : fighters[1].name}
                        </h6>
                        <img src={ fighters.length < 2 ? "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg" : `https://raw.githubusercontent.com/EmmS21/SpringboardCapstoneBoxingPredictionWebApp/master/ml%20model/app/boxing/www/${fighters[1]?.global_id}.jpg`} alt="image not found" style={{'height': '50%', 'width': '50%', 'object-fit': 'contain'}}/>
                        <div>
                          <Badge color="success" pill className="mr-1">
                            age: {fighters.length < 2 ? null : fighters[1]?.age}
                          </Badge>
                          <Badge color="success" pill className="mr-1">
                            height: {fighters.length < 2 ? null : fighters[1]?.height}
                          </Badge>
                          <Badge color="success" pill className="mr-1">
                            weight : {fighters.length < 2 ? null : fighters[1]?.weight}
                          </Badge>
                        </div>
                        <Button
                          className="mt-4"
                          color="success"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Bet
                        </Button>
                        <Button
                          className="mt-4"
                          color="success"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          More Info
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        </>
    )
}
export default FighterCards;