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
          strokeColors: ["#FF4560", "#00E396", "#008FFB"],
          border: 4,
          radius: 4,
          colors: ["#FF4560", "#00E396", "#008FFB"],
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
          //  type: "gradient",
          opacity: 1,
          gradient: {
            shade: "light",
            shadeIntensity: 1,
            // colorStops: [
            //   [
            //     {
            //       offset: 0,
            //       color: "var(--secondary)",
            //       opacity: 0.4,
            //     },
            //     {
            //       offset: 0.6,
            //       color: "var(--secondary)",
            //       opacity: 0.25,
            //     },
            //     {
            //       offset: 100,
            //       color: "var(--secondary)",
            //       opacity: 0,
            //     },
            //   ],
            //   [
            //     {
            //       offset: 0,
            //       color: "var(--primary)",
            //       opacity: 0.4,
            //     },
            //     {
            //       offset: 50,
            //       color: "var(--primary)",
            //       opacity: 0.25,
            //     },
            //     {
            //       offset: 100,
            //       color: "#fff",
            //       opacity: 0,
            //     },
            //   ],
            // ],
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

      const wyzStake = response?.Stakeswyz;
      const usdtStake = response?.Stakestusdt;
      const usdStake=response?.Stakeusdt
      const withdrawRoi = response?.withdrawRoi;
      const withdrawReferal = response?.refrealWithdraw;
      const topup=response?.Topusdata
      const daysOfWeekOrdered = this.getLast7Days();

      const seriesData = [
        {
          name: " WYZ",
          data: daysOfWeekOrdered.map((day) => (wyzStake[day] || 0).toFixed(2))

        },
        {
          name: "stUsdt",
          data: daysOfWeekOrdered.map((day) => (usdtStake[day] || 0).toFixed(2))

        },
        {
          name: "sUSDT",
          data: daysOfWeekOrdered.map((day) => (usdStake[day] || 0).toFixed(2))
        },
        {
          name: "topup",
          data: daysOfWeekOrdered.map((day) => (topup[day] || 0).toFixed(2))
        },
        {
          name: "ROI",
          data: daysOfWeekOrdered.map((day) => (withdrawRoi[day] || 0).toFixed(2))

        },
        {
          name: "Referral ",
          data: daysOfWeekOrdered.map((day) => (withdrawReferal[day] || 0).toFixed(2))
        },
        
      ];

      this.setState((prevState) => ({
        series: seriesData,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: daysOfWeekOrdered.map((day) => day.slice(0, 3)),
          },
        },
      }));

      if (response && response.status == 404) {
        localStorage.removeItem("userDetails");
        window.location.href = "/logout";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  getLast7Days() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const result = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );
      result.push(daysOfWeek[day.getDay()]);
    }
    return result;
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
