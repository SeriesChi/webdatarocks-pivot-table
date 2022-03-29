import "webdatarocks/webdatarocks.css";
import * as WebDataRocksReact from "react-webdatarocks";
import { useRef, useState } from "react";
import employee from "../Data/employee.json";

const jsonData = [
    {
        employee: {
            type: "string",
        },
        "date and time": {
            type: "string",
        },
        pizza: {
            type: "string",
        },
        transaction: {
            type: "number",
        },
    },
    ["Melissa", "2019/05/26 01:17PM", "Margherita", 6.03],
    ["Sylvia", "22019/05/27 01:19PM", "Quattro Stagioni", 6.74],
    ["Juliette", "2019/05/28 02:23PM", "Salami", 6.38],
    ["Melissa", "2019/05/29 02:36PM", "Tuna", 6.91],
    ["Sylvia", "2019/06/01 02:41PM", "Margherita", 6.03],
    ["Juliette", "2019/06/10 02:49PM", "Quattro Stagioni", 6.74],
    ["Melissa", "2019/06/11 02:57PM", "Salami", 6.38],
    ["Sylvia", "2019/06/12 03:01PM", "Tuna", 6.91],
    ["Juliette", "2019/06/26 03:02PM", "Margherita", 6.03],
    ["Sylvia", "2019/07/16 03:11PM", "Quattro Stagioni", 6.74],
    ["Juliette", "2019/07/17 03:26PM", "Salami", 6.38],
    ["Melissa", "2019/07/18 03:28PM", "Tuna", 6.91],
    ["Sylvia", "2019/07/19 03:31PM", "Quattro Stagioni", 6.74],
];

const data = {
    dataSource: {
        data: jsonData,
    },
    slice: {
        rows: [
            {
                uniqueName: "employee",
            },
            // {
            //   uniqueName: "date and time"
            // }
        ],
        columns: [
            {
                uniqueName: "pizza",
            },
        ],
        measures: [
            {
                uniqueName: "transaction",
                aggregation: "sum",
            },
        ],
    },
};

const PivotTable = () => {
    const [report, _] = useState(data);
    const [isReport, setisReport] = useState(false);
    const [isGoogleChart, setIsGoogleChart] = useState(false);
    const pivotRef: any = useRef(null);
    const chartRef: any = useRef(null);

    window.google.charts.load("current", {
        packages: ["corechart"],
    });
    window.google.charts.setOnLoadCallback(onGoogleChartsLoaded);

    function onGoogleChartsLoaded() {
        setIsGoogleChart(true);
        if (isReport) {
            createGoogleChart();
        }
    }

    const createGoogleChart = () => {
        if (isGoogleChart) {
            pivotRef?.current?.webdatarocks?.googlecharts?.getData(
                {
                    type: "pie",
                },
                drawChart,
                drawChart
            );
        }
    };

    const drawChart = (_data: any) => {
        const data = window.google.visualization.arrayToDataTable(_data.data);
        const options = {
            title: "Average Transaction Done By Employee",
            legend: {
                position: "top",
            },
            is3D: true,
        };

        const chart = new window.google.visualization.PieChart(
            chartRef?.current
        );
        chart.draw(data, options);
    };

    return (
        <>
            <WebDataRocksReact.Pivot
                ref={pivotRef}
                toolbar={true}
                width="100%"
                report={report}
                reportcomplete={function () {
                    pivotRef?.current?.webdatarocks?.off("reportcomplete");
                    setisReport(true);
                    createGoogleChart();
                }}
            />
            <div ref={chartRef} style={{ height: "500px", width: "900px" }} />
        </>
    );
};

export default PivotTable;
