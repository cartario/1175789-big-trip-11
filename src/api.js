import Point from "./models/point.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getEvents() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(Point.parsePoints);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json());
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json());
  }

  updateEvent(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`}),
    })
    .then((response) => response.json())
    .then(Point.parsePoint);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
