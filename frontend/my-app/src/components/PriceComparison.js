// PriceComparisonTable.js

import React from "react";
import { Card, Typography } from "@material-tailwind/react";

function PriceComparisonTable({ data }) {
  const findProductWithHigherRatingAndLowerPrice = () => {
    let bestProduct = null;

    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        const productA = data[i];
        const productB = data[j];

        const priceA = parseInt(productA.price.replace("₹", "").replace(",", ""));
        const priceB = parseInt(productB.price.replace("₹", "").replace(",", ""));
        const ratingA = parseFloat(productA.rating);
        const ratingB = parseFloat(productB.rating);

        if (ratingA > ratingB && priceA < priceB) {
          bestProduct = productA;
          break;
        } else if (ratingB > ratingA && priceB < priceA) {
          bestProduct = productB;
          break;
        }
      }

      if (bestProduct) {
        break;
      }
    }

    return bestProduct;
  };

  const bestProduct = findProductWithHigherRatingAndLowerPrice();

  return (
    <Card className="mt-10 px-8 h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Product Comparison
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">
              {bestProduct
                ? `${bestProduct.company} has higher rating and lower price compared to the other product`
                : "No product found"}
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

export default PriceComparisonTable;
