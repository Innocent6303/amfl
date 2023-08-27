import React, { useState,useEffect } from "react";

import { Card, Typography, IconButton } from "@material-tailwind/react";

import { StarIcon , ShoppingCartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
const TABLE_HEAD = ["Name", "Price", "Rating", "Commpany",""];

const TABLE_ROWS = [
  {
    name: "Iphone 14",
    price: " 100,000",
    rating: "4.5",
    company:"Amazon",
  },
  {
    name: "Cycle black color",
    price: " 50,000",
    rating: "4.5",
    company:"Amazon",
  },
  {
    name: "Redmi Note 9A",
    price: " 50,000",
    rating: "4.5",
    company:"Amazon",
  },
  {
    name: "One plus Nord",
    price: " 90,000",
    rating: "4.5",
    company:"Amazon",
  },
  {
    name: "Jeans",
    price: " 1000",
    rating: "4.5",
    company:"Amazon",
  },
];

export function TableWithStripedColumns({ data }) {
  // const [searchQuery, setSearchQuery] = useState("");
  

// const [scrapedData, setScrapedData] = useState([]);
// const fetchData = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/data");
//     if (Array.isArray(response.data.flipkart_data)) {
//       setScrapedData(response.data.flipkart_data);
//     }else if(Array.isArray(response.data.amazon_data)) {
//       setScrapedData(response.data.amazon_data);}
//     else {
//       console.error("Response data is not an array:", response.data);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// useEffect(() => {
//   fetchData(); // Load data initially
// }, []);



  return (
    <Card className="mt-10 px-8 h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ name, price, rating, company }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  
                  <Typography variant="small" color="blue-gray" className="font-normal">
                  <span className="text-green-500 text-sm mr-1">₹</span>
                    {price}
                  </Typography>
                </td>
                <td className={classes}>
                <div className="flex items-center">
    <Typography variant="small" color="blue-gray" className="font-normal">
      {rating} / 5 
    </Typography>
    <StarIcon className="w-5 h-5 ml-1.5 text-yellow-500 mr-1" />
  </div>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {company}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography as="a" href="https://www.flipkart.com/checkout/init?otracker=hp_omu_Best%2Bof%2BElectronics_1_4.dealCard.OMU_ZIEW022R2RTS_3" variant="small" color="blue-gray" className="font-medium">
                  <IconButton variant="text" color="black">
              <ShoppingCartIcon className="h-6 w-10 mx-2" /></IconButton>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}