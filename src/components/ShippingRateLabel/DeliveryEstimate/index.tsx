import Stripe from "stripe";

type UnitString = {
  single: string;
  plural: string;
};

const units: Record<
  | Stripe.ShippingRate.DeliveryEstimate.Minimum.Unit
  | Stripe.ShippingRate.DeliveryEstimate.Maximum.Unit,
  UnitString
> = {
  hour: { single: "time", plural: "timer" },
  day: { single: "dag", plural: "dager" },
  business_day: { single: "arbeidsdag", plural: "arbeidsdager" },
  week: { single: "uke", plural: "uker" },
  month: { single: "måned", plural: "måneder" },
};

const DeliveryEstimateItem = ({
  estimate,
}: {
  estimate:
    | Stripe.ShippingRate.DeliveryEstimate.Minimum
    | Stripe.ShippingRate.DeliveryEstimate.Maximum;
}) => {
  return (
    <span>{`${estimate.value} ${
      estimate.value === 1
        ? units[estimate.unit].single
        : units[estimate.unit].plural
    }`}</span>
  );
};

export const DeliveryEstimate = (props: {
  deliveryEstimate: Stripe.ShippingRate.DeliveryEstimate;
}) => {
  const { minimum, maximum } = props.deliveryEstimate;

  return (
    <div>
      {minimum && <DeliveryEstimateItem estimate={minimum} />}
      {minimum && maximum && <span> - </span>}
      {maximum && <DeliveryEstimateItem estimate={maximum} />}
    </div>
  );
};
