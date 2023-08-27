import requests
from bs4 import BeautifulSoup
import json
import os
import time

def scrape_flipkart(query):
    url = f"https://www.flipkart.com/search?q={query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    html_content = response.content
    soup = BeautifulSoup(html_content, "html.parser")

    products = []
    prices = []
    ratings = []

    for a in soup.findAll('a', href=True, attrs={'class': ['_1fQZEK','s1Q9rs']}):
        name = a.find('div', attrs={'class': '_4rR01T'})
        price = a.find('div', attrs={'class': '_30jeq3 _1_WHN1'})
        rating = a.find('div', attrs={'class': '_3LWZlK'})

        if name is not None and price is not None and rating is not None:
            products.append(name.text.strip())
            prices.append(price.text.strip())
            ratings.append(rating.text.strip())

    data = []
    for i in range(len(products)):
        product_data = {
            'name': products[i],
            'price': prices[i],
            'rating': ratings[i],
            'company':'Flipkart'
        }
        data.append(product_data)

    
        


   # Create a folder to store the data if it doesn't exist
    folder_name = "data"  
    os.makedirs(folder_name, exist_ok=True)

    # Store the data in a JSON file within the folder
    file_path = os.path.join(folder_name, "flipkart_data.json")
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)
        file.flush()

    print("Data scraped and stored in flipkart_data.json")

if __name__ == "__main__":
    user_query = input("Enter your search query: ")
    scrape_flipkart(user_query)
