"use client";

import {
  COUNTRY_CODE,
  CURRENCY,
  SQUARE_APPLICATION_ID,
  SQUARE_LOCATION_ID,
} from "../client-config";
import {
  PaymentForm,
  ApplePay,
  GooglePay,
  CreditCard,
} from "react-square-web-payments-sdk";
import React from "react";

interface PaymentProps {
  productAmounts: Record<string, number>;
}

interface PaymentState {
  curState: string;
  productAmounts: Record<string, number>;
  orderId?: string;
  orderPrice: number;
}

export class CardPayment extends React.Component<PaymentProps, PaymentState> {
  constructor(props: PaymentProps) {
    super(props);

    this.state = {
      curState: "start",
      productAmounts: props.productAmounts,
      orderPrice: 0,
    };
  }

  createOrder = async () => {
    const result = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        productAmounts: this.state.productAmounts,
      }),
    });
    const { data: order } = await result.json();
    this.setState({
      curState: "ordering",
      orderId: order.id,
      orderPrice: parseInt(order.price),
    });
  };

  renderButton() {
    return (
      <a
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        style={{ cursor: "pointer" }}
        onClick={this.createOrder}
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Create Order{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </a>
    );
  }

  calculateOrderAmount() {
    return (this.state.orderPrice / 100).toString();
  }

  renderPayment() {
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
                orderId: this.state.orderId,
              }),
            });
            if (response.status == 200) {
              this.setState({
                orderId: undefined,
                orderPrice: 0,
                curState: "success",
              });
            } else {
              this.setState({
                orderId: undefined,
                orderPrice: 0,
                curState: "error",
              });
            }
          }}
          createPaymentRequest={() => ({
            countryCode: COUNTRY_CODE,
            currencyCode: CURRENCY,
            total: {
              amount: this.calculateOrderAmount(),
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
  }

  render() {
    if (this.state.curState === "start") {
      return this.renderButton();
    } else if (this.state.curState == "ordering") {
      return this.renderPayment();
    } else if (this.state.curState == "success") {
      return <p>Success!</p>;
    } else {
      return <p>An Error has occurred</p>;
    }
  }
}
