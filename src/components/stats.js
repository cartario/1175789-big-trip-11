import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import {EVENT_TYPES} from "../const.js";
import moment from "moment";
// import flatpickr from "flatpickr";

const getUniqTypes = (points) => {
  let res = [];
  points.map((point) => {
    if (!res.includes(point.eventType.name)) {
      res.push(point.eventType.name);
    }
  });
  return res;
};

const spentMoneyByType = (points) => {
  const types = getUniqTypes(points);
  return types.map((type) => {
    let moneyByType = 0;
    points.forEach((point) => {
      if (type === point.eventType.name) {
        moneyByType += point.basePrice;
      }
    });
    return moneyByType;
  });
};

const getTransportTypes = () => {
  return EVENT_TYPES.slice(0, 7).map((point) => point.name);
};

const usedTransportType = (points) => {
  const types = getTransportTypes();
  return types.map((type) => {
    let count = 0;
    points.forEach((point) => {
      if (type === point.eventType.name) {
        count++;
      }
    });
    return count;
  });
};

const spentTimeDuration = (points) => {
  const types = getUniqTypes(points);
  return types.map((type) => {
    let typeTimeInMiliseconds = 0;
    points.forEach((point) => {
      if (type === point.eventType.name) {
        const dateFrom = moment(point.dateFrom);
        const dateTo = moment(point.dateTo);

        const ms = Math.abs(dateTo.diff(dateFrom));
        typeTimeInMiliseconds += ms;
      }
    });
    const duration = moment.duration(typeTimeInMiliseconds);
    return parseInt(duration.asHours(), 10);
  });
};

const renderMoneyChart = (moneyCtx, points) => {
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getUniqTypes(points),
      datasets: [{
        data: spentMoneyByType(points),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },

      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, points) => {
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getTransportTypes(),
      datasets: [{
        data: usedTransportType(points),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        },
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpentChart = (timeSpentCtx, points) => {
  return new Chart(timeSpentCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getUniqTypes(points),
      datasets: [{
        data: spentTimeDuration(points),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },

      title: {
        display: true,
        text: `SPENT TIME`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const createStatsTemplate = () => {
  return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};

export default class Stats extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
    this._renderCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  rerender(points) {
    this._points = points;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpentCtx = element.querySelector(`.statistics__chart--time`);

    const types = getUniqTypes(this._pointsModel.getPoints());
    const BAR_HEIGHT = 55;

    moneyCtx.height = BAR_HEIGHT * types.length;
    transportCtx.height = BAR_HEIGHT * getTransportTypes().length;
    timeSpentCtx.height = BAR_HEIGHT * types.length;

    renderMoneyChart(moneyCtx, this._pointsModel.getPoints());
    renderTransportChart(transportCtx, this._pointsModel.getPoints());
    renderTimeSpentChart(timeSpentCtx, this._pointsModel.getPoints());
  }

  recoveryListeners() {}

  show() {
    super.show();

    this.rerender(this._pointsModel);
  }
}
