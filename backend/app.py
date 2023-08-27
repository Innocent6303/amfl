from flask import Flask, jsonify, request
from scraping import flipkart 
from scraping import amazon
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

script_dir = os.path.dirname(os.path.abspath(__file__))
data_folder = os.path.join(script_dir, "data")
flipkart_file_path = os.path.join(data_folder, "flipkart_data.json")
amazon_file_path = os.path.join(data_folder, "amazon_data.json")

# Define a function to load data from a JSON file
def load_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

@app.route('/api/data', methods=['GET'])
def get_data():
    flipkart_data = load_json_file(flipkart_file_path)
    amazon_data = load_json_file(amazon_file_path)
    
    # Combine the data from both source
    combined_data = {"flipkart_data": flipkart_data, "amazon_data": amazon_data}
    return jsonify(combined_data)

@app.route('/api/scrape', methods=['GET'])
def scrape_data():
    query = request.args.get('query')
    print("Received query:",query)
    if query:
        flipkart_data = flipkart.scrape_flipkart(query)
        amazon_data = amazon.scrape_amazon(query)
        return jsonify({"message": "Scraping completed for both Flipkart and Amazon", 
                        "flipkart_data": flipkart_data,
                        "amazon_data": amazon_data})
    else:
        return jsonify({"error": "No query provided"})



if __name__ == '__main__':
    app.run(debug=True)
