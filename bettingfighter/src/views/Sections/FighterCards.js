import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import axios from 'axios';
import PropDrilling from "contexts/PropDrilling";
import { Col as AntCol, InputNumber, Row as AntRod, Slider, Space } from 'antd';

const FighterCards = () => {
    const { fighters } = useContext(PropDrilling);
    const [outcome, setOutcome] = useState('')
    const [aBet, setABet] = useState(1);

    const changeABet = (newValue) => {
      setABet(newValue);
    };

    function getPrediction(data) {
      const sending  = {}
      sending['challenge'] = fighters
      axios.post('http://127.0.0.1:5000/predict', sending, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((res) => {
          const outcomes = ["userAW", "userBW", "Draw", "Draw", "userAL", "userBL"]
          const poss = [res.data[0][0]*100, res.data[0][1]*100, res.data[1][0]*100, res.data[1][1]*100, res.data[2][0]*100, res.data[2][1]*100]
          let randomVal = Math.random() * 100;
          let runningSum = 0
          for(let i = 0; i < poss.length; i++){
            runningSum += poss[i];
            if(randomVal <= runningSum){
              setOutcome(outcomes[i])
              break
            }
          }
        })
    }
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
                          {
                            outcome === 'userAW' || outcome === 'userBL' ?
                              'Won'
                            : outcome === 'Draw' ?
                              'Drew'
                            : outcome === 'userBW' || outcome === 'userAL' ?
                              'Lost'
                            :
                            null
                          }
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
                        <h5>Bet:</h5>
                        <Row>
                          <AntCol span={12}>
                            <Slider
                              min={100}
                              max={1000}
                              onChange={changeABet}
                              value={typeof aBet === 'number' ? aBet : 0}
                            />
                          </AntCol>
                          <AntCol span={100}>
                            <InputNumber
                              min={100}
                              max={1000}
                              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={value => value.replace(/\$\s?|(,*)/g, '')}
                              style={{ margin: '0 16px' }}
                              value={aBet}
                              onChange={changeABet}
                            />
                          </AntCol>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                          {
                            outcome === 'userBW' || outcome === 'userAL' ?
                             'Won'
                             : outcome === 'Draw' ?
                             'Drew'
                             : outcome === 'userAW' || outcome === 'userBL' ? 
                             'Lost'
                             :
                             null
                          }
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
            <Button onClick={() => getPrediction(fighters)} disabled={fighters.length < 2}>Predict</Button>
          </Container>
        </section>
        </>
    )
}
export default FighterCards;