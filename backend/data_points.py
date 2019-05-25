import json
import urllib.request
import objectpath

### To access data points
from flask import Flask
from flask_restful import Api, Resource, reqparse

class Data(Resource):
    def get(selt):
        return Data_points, 200

QUERY_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=D01PQMVRIUNEQYRW"
API_KEY = "D01PQMVRIUNEQYRW"
def _request(symbol):
    with urllib.request.urlopen(QUERY_URL.format(KEY=API_KEY, SYMBOL=symbol)) as req:
        data = req.read().decode("UTF-8")
    return data

c = json.loads(_request("GOOG"))["Time Series (5min)"]
json.dumps(c)

## 1. open values
tree = objectpath.Tree(c)
result = tree.execute("$..'1. open'")
values = list()
for i in result:
    values.append(i)

### time
times = list()
for i in c:
    times.append(i)

### data
Data_points = []
Data_points_len = len(times)
idx = 0
while idx != Data_points_len:
    Data_points.append({"time": times[idx],"value": values[idx]})
    idx = idx + 1

#### To access data points
app = Flask(__name__)
api = Api(app)

api.add_resource(Data, "/api/data")
app.run(debug=True)