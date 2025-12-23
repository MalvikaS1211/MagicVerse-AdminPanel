import React, { Fragment, useState } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { getTransactionHash } from "../../../services/api_function";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export const TransactionHash = () => {
  const { address } = useAccount();
  const [TxHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleClick = async () => {
    if (!TxHash) {
      toast.error("Please enter a transaction hash");
      return;
    }

    try {
      setLoading(true);
      const res = await getTransactionHash(TxHash);
      setResult(res);

      if (res?.success === true) {
        toast.success(res?.message);
        setTxHash("");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Row className="">
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Get Transaction Hash</Card.Title>
            </Card.Header>

            <Card.Body>
              <div className="mb-3">
                <label >
                  Enter Transaction Hash
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={TxHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="0x..."
                />
              </div>

              <Button
                variant="success"
                className="w-100"
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Processing...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>

              {result?.message && (
                <div className="alert alert-info mt-4">
                  <strong>Note:</strong> {result.message}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TransactionHash;
