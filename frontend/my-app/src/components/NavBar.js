import React, { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BuildingStorefrontIcon, Cog6ToothIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export function NavbarDark({ onSearch, onPieChartToggle }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrapedData, setScrapedData] = useState([]);

  const handleInputKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleSearchClick();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/scrape", {
        params: {
          query: searchQuery,
        },
      });

      if (response.data.hasOwnProperty("amazon_data")) {
        setScrapedData(response.data.amazon_data);
      } else if (response.data.hasOwnProperty("flipkart_data")) {
        setScrapedData(response.data.flipkart_data);
      } else {
        console.error("No valid data found in the response:", response.data);
      }
      onSearch();
      onPieChartToggle();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchClick =async () => {
    await handleSearch();
    setTimeout(() =>{
      onPieChartToggle();
    },1000);
    
  };

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="mt-3 mx-auto max-w-screen-xl from-customSky to-customLight px-4 py-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-black">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          PRODUCT RECOMMENDATION
        </Typography>
        <div className="ml-auto flex gap-1 md:mr-4">
          <IconButton variant="text" color="white">
            <Cog6ToothIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="text" color="white">
            <ShoppingBagIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="text" color="white">
            <BuildingStorefrontIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="white"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleInputKeyPress}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded bg-gradient-to-r from-customBlue to-customSky hover:from-customSky hover:to-customBlue transition-all duration-300"
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
