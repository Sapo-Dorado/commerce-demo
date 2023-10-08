"use client";

import {
  COUNTRY_CODE,
  CURRENCY,
  SQUARE_APPLICATION_ID,
  SQUARE_LOCATION_ID,
} from "@/lib/client-config";
import {
  PaymentForm,
  ApplePay,
  GooglePay,
  CreditCard,
} from "react-square-web-payments-sdk";
import { useState } from "react";
import { OrderData } from "@/lib/models";

interface IProps {
  order: OrderData;
}

interface PaymentState {
  completed: boolean;
  errors: string[];
}

export default function CardPayment({ order }: IProps) {
  const [payState, setPayState] = useState<PaymentState>({
    completed: false,
    errors: [],
  });

  const calculateOrderPrice = () => {
    return (order.price / 100).toString();
  };

  const Card = () => {
    return (
      <div className="container mx-auto content-center">
        <PaymentForm
          applicationId={SQUARE_APPLICATION_ID}
          cardTokenizeResponseReceived={async (
            token: { token: any },
            verifiedBuyer: any
          ) => {
            const response = await fetch("/api/pay", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                sourceId: token.token,
                orderId: order.id,
              }),
            });
            if (response.status == 200) {
              setPayState({ ...payState, completed: true });
            } else {
              const { errors } = await response.json();
              setPayState({ ...payState, errors: errors });
            }
          }}
          createPaymentRequest={() => ({
            countryCode: COUNTRY_CODE,
            currencyCode: CURRENCY,
            total: {
              amount: calculateOrderPrice(),
              label: "Total",
            },
          })}
          locationId={SQUARE_LOCATION_ID}
        >
          <ApplePay />
          <GooglePay />
          <br />
          <CreditCard />
        </PaymentForm>
      </div>
    );
  };

  return (
    <>
      {payState.completed ? <p>Success!</p> : <Card /> }
      {payState.errors.map((error,idx) => <p key={idx}>{error}</p>)}
    </>
  );
}
