export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.eventType = {};
    this.eventType.name = data[`type`][0].toUpperCase() + data[`type`].slice(1);
    this.eventType.group = `Transfer`;
    this.dateFrom = data[`date_from`] ? new Date(data[`date_from`]) : null;
    this.dateTo = data[`date_to`] ? new Date(data[`date_to`]) : null;
    this.destination = data[`destination`];
    this.basePrice = data[`base_price`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.eventType.offers = data[`offers`];
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  toRAW() {
    return {
      "id": this.id,
      "type": this.eventType.name.toLowerCase(),
      "date_from": this.dateFrom ? this.dateFrom.toISOString() : null,
      "date_to": this.dateTo ? this.dateTo.toISOString() : null,
      "destination": this.destination,
      "base_price": this.basePrice,
      "is_favorite": this.isFavorite,
      "offers": this.eventType.offers,
    };
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
