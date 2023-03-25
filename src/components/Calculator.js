import React, { useState } from "react";
import Display from "./Display";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [display, setDisplay] = useState(0);
  const [result, setResult] = useState("");
  const [isLastOperator, setIsLastOperator] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const handleNumberClick = (e) => {
    setIsLastOperator(false);

    const { value } = e.target;
    if (shouldClear) {
      value === "0" ? setDisplay(0) : setDisplay(value);
      setShouldClear(false);
    } else if (display === 0) {
      value === "0" ? setDisplay(0) : setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const handleDecimalClick = () => {
    const displayString = display.toString();
    if (displayString.indexOf(".") === -1) {
      setDisplay(displayString + ".");
    } else {
      return;
    }
  };

  const handlePlusMinusClick = () => {
    setDisplay(display * -1);
  };

  const handlePercentClick = () => {
    setDisplay(display / 100);
  };

  const handleClearClick = () => {
    if (display === 0) {
      setResult("");
    } else {
      setDisplay(0);
    }
    setIsLastOperator(false);
  };

  const handleOperatorClick = (newOperator) => {
    if (!testMode) {
      if (isLastOperator) {
        setResult(result.slice(0, -1) + newOperator);
      } else if (result) {
        setResult(result + display + newOperator);
        setDisplay(0);
        setIsLastOperator(true);
      } else {
        setResult(display + newOperator);
        setDisplay(0);
        setIsLastOperator(true);
      }
    } else {
      if (isLastOperator) {
        newOperator === "-"
          ? /-$/.test(result)
            ? setResult(result.slice(0, -1))
            : setResult(result + newOperator)
          : setResult(result.replace(/(?<=\d)\W+$/, newOperator));
      } else if (result) {
        setResult(result + display + newOperator);
        setDisplay(0);
        setIsLastOperator(true);
      } else {
        setResult(display + newOperator);
        setDisplay(0);
        setIsLastOperator(true);
      }
    }
  };

  const handleEqualsClick = () => {
    try {
      if (isLastOperator) {
        setDisplay(evaluate(result.slice(0, -1)));
      }

      if (result) {
        const resultString = result + display;
        const resultValue = evaluate(resultString);
        setResult("");
        setDisplay(resultValue);
      }
      setShouldClear(true);
    } catch {
      setResult("");
      setDisplay("Error");
    }
  };

  const handleTestModeClick = () => {
    setTestMode(!testMode);
    setDisplay(0);
    setResult("");
    setIsLastOperator(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center border border-dark  rounded position-relative"
      style={{
        height: "26rem",
        width: "20rem",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Form.Check
        type="switch"
        className="position-absolute top-0 end-0 "
        checked={testMode}
        onChange={handleTestModeClick}
      />

      <Container
        className="
     justify-content-center align-items-center
      "
      >
        <Row className="my-3">
          <Col>
            <Display value={display} result={result} />
          </Col>
        </Row>
        <Row>
          <Col className={`${testMode ? "col-6" : ""}`}>
            <Button
              id="clear"
              className={`btn-danger`}
              onClick={handleClearClick}
              size="lg"
            >
              {display === 0 ? "AC" : "C"}
            </Button>
          </Col>
          <Col>
            <Button
              id="plus-minus"
              className={`btn-warning ${testMode ? "d-none" : ""}`}
              onClick={handlePlusMinusClick}
              size="lg"
            >
              +/-
            </Button>
          </Col>
          <Col className={`${testMode ? "col-3" : ""}`}>
            <Button
              id="percent"
              className="btn-warning"
              onClick={handlePercentClick}
              size="lg"
            >
              %
            </Button>
          </Col>
          <Col className={`${testMode ? "col-3" : ""}`}>
            <Button
              size="lg"
              id="divide"
              className="btn-warning"
              onClick={() => handleOperatorClick("/")}
            >
              /
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              id="seven"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={7}
            >
              7
            </Button>
          </Col>
          <Col>
            <Button
              id="eight"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={8}
            >
              8
            </Button>
          </Col>
          <Col>
            <Button
              id="nine"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={9}
            >
              9
            </Button>
          </Col>
          <Col>
            <Button
              size="lg"
              id="multiply"
              className="btn-warning"
              onClick={() => handleOperatorClick("*")}
            >
              *
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              id="four"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={4}
            >
              4
            </Button>
          </Col>
          <Col>
            <Button
              id="five"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={5}
            >
              5
            </Button>
          </Col>
          <Col>
            <Button
              id="six"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={6}
            >
              6
            </Button>
          </Col>
          <Col>
            <Button
              size="lg"
              id="subtract"
              className="btn-warning"
              onClick={() => handleOperatorClick("-")}
            >
              -
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              id="one"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={1}
            >
              1
            </Button>
          </Col>
          <Col>
            <Button
              id="two"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={2}
            >
              2
            </Button>
          </Col>
          <Col>
            <Button
              id="three"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={3}
            >
              3
            </Button>
          </Col>
          <Col>
            <Button
              id="add"
              size="lg"
              className="btn-warning"
              onClick={() => handleOperatorClick("+")}
            >
              +
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col-3">
            <Button
              id="zero"
              className="btn-light"
              onClick={handleNumberClick}
              size="lg"
              value={0}
            >
              0
            </Button>
          </Col>
          <Col className="col-3">
            <Button
              id="decimal"
              className="btn-light"
              onClick={handleDecimalClick}
              size="lg"
            >
              .
            </Button>
          </Col>
          <Col className="col-6">
            <Button
              size="lg"
              id="equals"
              className="btn-success"
              onClick={handleEqualsClick}
            >
              =
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Calculator;
