import { useState, useEffect } from "react";
import type { Sample } from "../types";

const Samples = () => {
  const [samples, setSamples] = useState<Sample[]>([
  {
    id: 1,
    clientName: "Shejal Beauty Parlour",
    clientCity: "Jaipur",
    productName: "Aloe Vera Gel",
    quantity: 5
  }
]);
useEffect(()=>{
  localStorage.setItem("samples",JSON.stringify(samples))
},[samples])
  return <div>
  </div>;
};

export default Samples;
