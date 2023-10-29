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
import { IOrderData, IOrderState } from "@/lib/models";
import useCart from "../../Cart/useCart";
import ReturnToShopButton from "../../ReturnToShopButton";
import ErrorDisplay from "../../ErrorDisplay/ErrorDisplay";

interface IProps {
  order: IOrderData;
  setOrder: (order: IOrderData) => void;
}

export default function CardPayment({ order, setOrder }: IProps) {
  const [completed, setCompleted] = useState<boolean>(
    order.state === IOrderState.Completed
  );
  const [errors, setErrors] = useState<string[]>([]);

  const clearCart = useCart((state) => state.clearCart);
  const calculateOrderPrice = () => (order.price / 100).toString();

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
            setCompleted(true);
            setErrors([]);
          } else {
            const { errors, info: order } = await response.json();
            setErrors(errors);
            setOrder(order);
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
    <div className="flex flex-col items-center pt-14 lg:px-14">
      {completed ? (
        <>
          <p className="text-3xl font-semibold text-center pb-8">Success!</p>
          <ReturnToShopButton />
        </>
      ) : (
        <>
          <Card />
          <div className="flex justify-center max-w-[50%]">
            <ErrorDisplay errors={errors} />
          </div>
        </>
      )}
    </div>
  );
}
