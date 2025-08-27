import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { verifyPayment } from "../utils/api_payment";

const PaymentVerify = () => {
  //call search params hook
  const [searchParams] = useSearchParams(); //extract values from url string

  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");

  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    )
      .then((updatedOrder) => {
        localStorage.removeItem("cart");
        navigate("/orders");
      })
      .catch((error) => {
        console.log(error);
        setError("An error occured. We apologise for the inconvenience.");
      });
  });

  return (
    <>
      We are verifying your transaction. Please keep your browser open.
      <br /> {error}
    </>
  );
};

export default PaymentVerify;
