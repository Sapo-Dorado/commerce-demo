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
import { OrderData, OrderState } from "@/lib/models";
import useCart from "../Cart/useCart";
import ReturnToShopButton from "../ReturnToShopButton";

interface IProps {
  order: OrderData;
}

interface PaymentState {
  completed: boolean;
  errors: string[];
}

export default function CardPayment({ order }: IProps) {
  const [payState, setPayState] = useState<PaymentState>({
    completed: order.state === OrderState.Completed,
    errors: [],
  });

  const clearCart = useCart((state) => state.clearCart);

  const calculateOrderPrice = () => {
    return (order.price / 100).toString();
  };

  const Card = () => {
    return (
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
            clearCart();
            setPayState({ ...payState, completed: true, errors: [] });
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
    );
  };

  return (
    <div className="flex flex-col justify-start pt-14 lg:px-14">
      {payState.completed ? (
        <>
          <p className="text-3xl font-semibold text-center pb-8">Success!</p>
          <ReturnToShopButton />
        </>
      ) : (
        <Card />
      )}
      {payState.errors.map((error, idx) => (
        <p className="text-sm text-red-500 pt-2" key={idx}>
          {error}
        </p>
      ))}
    </div>
  );
}
