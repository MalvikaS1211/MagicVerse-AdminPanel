import React from "react";
import ReactApexChart from "react-apexcharts";
import { Graph } from "../../../../services/api_function";

class MarketChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          type: "area",
          height: 400,
          toolbar: {
            show: false,
          },
        },
        zoom: {
          enabled: false,
        },
        plotOptions: {},
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
          markers: {
            fillColors: ["var(--secondary)", "var(--primary)"],
            width: 3,
            height: 16,
            strokeWidth: 0,
            radius: 16,
          },
        },
        markers: {
          size: [8, 0],
          strokeWidth: [4, 0],
          strokeColors: ["#fff", "#fff"],
          border: 4,
          radius: 4,
          colors: ["#2A353A", "#2A353A", "#fff"],
          hover: {
            size: 10,
          },
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          labels: {
            style: {
              colors: "#3E4954",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: true,
            align: "right",
            minWidth: 15,
            offsetX: -16,
            style: {
              colors: "#666666",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
        },
        fill: {
          colors: ["#fff", "#FF9432"],
          type: "gradient",
          opacity: 1,
          gradient: {
            shade: "light",
            shadeIntensity: 1,
            colorStops: [
              [
                {
                  offset: 0,
                  color: "var(--secondary)",
                  opacity: 0.4,
                },
                {
                  offset: 0.6,
                  color: "var(--secondary)",
                  opacity: 0.25,
                },
                {
                  offset: 100,
                  color: "var(--secondary)",
                  opacity: 0,
                },
              ],
              [
                {
                  offset: 0,
                  color: "var(--primary)",
                  opacity: 0.4,
                },
                {
                  offset: 50,
                  color: "var(--primary)",
                  opacity: 0.25,
                },
                {
                  offset: 100,
                  color: "#fff",
                  opacity: 0,
                },
              ],
            ],
          },
        },
        colors: ["var(--secondary)", "var(--primary)"],
        stroke: {
          curve: "straight",
          width: 3,
        },
        grid: {
          borderColor: "#e1dede",
          strokeDashArray: 8,
          xaxis: {
            lines: {
              show: true,
              opacity: 0.5,
            },
          },
          yaxis: {
            lines: {
              show: true,
              opacity: 0.5,
            },
          },
          row: {
            colors: undefined,
            opacity: 0.5,
          },
          column: {
            colors: undefined,
            opacity: 0.5,
          },
        },
        responsive: [
          {
            breakpoint: 1602,
            options: {
              markers: {
                size: [6, 6, 4],
                hover: {
                  size: 7,
                },
              },
              chart: {
                height: 230,
              },
            },
          },
        ],
      },
    };
  }

  async componentDidMount() {
    try {
      const userDetails = localStorage.getItem("userDetails");
      const parsedDetails = JSON.parse(userDetails);
      const token = parsedDetails.token;
      const response = await Graph(token);

      const data = response.StakesPerDay;

      const daysOfWeekOrdered = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const seriesData = [
        {
          name: "Stake",
          data: daysOfWeekOrdered.map((day) => data[day] || 0),
        },
      ];

      this.setState({ series: seriesData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    return (
      <div id="activity1">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={400}
        />
      </div>
    );
  }
}

export default MarketChart;
