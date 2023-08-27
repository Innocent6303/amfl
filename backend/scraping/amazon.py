import os
import requests
from bs4 import BeautifulSoup
import json

def scrape_amazon(query):
    url = f"https://www.amazon.in/s?k={query}"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.content, "html.parser")
    except requests.Timeout:
        return []

    products = []
    prices = []
    ratings = []

    for item in soup.select(".sg-col-inner"):
        title_elem = item.find("span", class_="a-size-medium a-color-base a-text-normal")
        price_elem = item.find("span", class_="a-price-whole")
        rating_elem = item.find("span", class_="a-icon-alt")

        if title_elem and price_elem and rating_elem:
            title = title_elem.get_text(strip=True)
            price = price_elem.get_text(strip=True)
            rating = rating_elem.get_text(strip=True)

            products.append(title)
            prices.append(price)
            ratings.append(rating)

    data = []
    for i in range(len(products)):
        product_data = {
            'name': products[i],
            'price': prices[i],
            'rating': ratings[i],
            'company': 'Amazon'
        }
        data.append(product_data)

    # Create a folder to store the data if it doesn't exist
    folder_name = "data"
    os.makedirs(folder_name, exist_ok=True)

    # Store the data in the JSON file
    file_path = os.path.join(folder_name, "amazon_data.json")
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

    print("Data scraped and stored in amazon_data.json")

if __name__ == "__main__":
    user_query = input("Enter your search query: ")
    scrape_amazon(user_query)
