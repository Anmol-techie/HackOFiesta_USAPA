import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveLine } from "@nivo/line";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  titleStyle: {
    fontWeight: 600,
  },
  overlineStyle: {
    letterSpacing: 1,
    fontWeight: 400,
    fontSize: 14,
  },
  miniCard: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: 10,
    padding: theme.spacing(2),
  },
  miniCard2: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const styles = useStyles();

  return (
    <Box display="flex" flexDirection="column" padding={4} paddingTop={3}>
      <Typography variant="h4" className={styles.titleStyle}>
        Dashboard
      </Typography>
      <Typography variant="overline" className={styles.overlineStyle}>
        Products
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <Box style={{ height: 400 }} paddingTop={2}>
              <ResponsiveLine
                data={[
                  {
                    id: "November",
                    color: "hsl(234, 70%, 50%)",
                    data: [
                      {
                        x: "Laptops",
                        y: 48,
                      },
                      {
                        x: "Home Appliances",
                        y: 65,
                      },
                      {
                        x: "TV",
                        y: 168,
                      },
                      {
                        x: "Mobile",
                        y: 267,
                      },
                      {
                        x: "Cameras",
                        y: 6,
                      },
                    ],
                  },
                  {
                    id: "December",
                    color: "hsl(202, 70%, 50%)",
                    data: [
                      {
                        x: "Laptops",
                        y: 155,
                      },
                      {
                        x: "Home Appliances",
                        y: 254,
                      },
                      {
                        x: "TV",
                        y: 197,
                      },
                      {
                        x: "Mobile",
                        y: 56,
                      },
                      {
                        x: "Cameras",
                        y: 24,
                      },
                    ],
                  },
                  {
                    id: "January",
                    color: "hsl(229, 70%, 50%)",
                    data: [
                      {
                        x: "Laptops",
                        y: 278,
                      },
                      {
                        x: "Home Appliances",
                        y: 169,
                      },
                      {
                        x: "TV",
                        y: 109,
                      },
                      {
                        x: "Mobile",
                        y: 104,
                      },
                      {
                        x: "Cameras",
                        y: 192,
                      },
                    ],
                  },
                  {
                    id: "February",
                    color: "hsl(71, 70%, 50%)",
                    data: [
                      {
                        x: "Laptops",
                        y: 107,
                      },
                      {
                        x: "Home Appliances",
                        y: 135,
                      },
                      {
                        x: "TV",
                        y: 61,
                      },
                      {
                        x: "Mobile",
                        y: 49,
                      },
                      {
                        x: "Cameras",
                        y: 286,
                      },
                    ],
                  },
                  {
                    id: "March",
                    color: "hsl(25, 70%, 50%)",
                    data: [
                      {
                        x: "Laptops",
                        y: 107,
                      },
                      {
                        x: "Home Appliances",
                        y: 85,
                      },
                      {
                        x: "TV",
                        y: 202,
                      },
                      {
                        x: "Mobile",
                        y: 296,
                      },
                      {
                        x: "Cameras",
                        y: 135,
                      },
                    ],
                  },
                ]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "transportation",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "count",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="overline" className={styles.overlineStyle}>
        Sales
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper>
            <Box style={{ height: 400 }} paddingTop={2}>
              <Typography
                variant="h6"
                style={{ fontWeight: 700, marginLeft: 16, marginBottom: -32 }}
              >
                Category Wise Insights
              </Typography>
              <ResponsiveBar
                data={[
                  {
                    category: "LP",
                    Samsung: 122,
                    SamsungColor: "hsl(66, 70%, 50%)",
                    Mi: 74,
                    MiColor: "hsl(87, 70%, 50%)",
                    OnePlus: 98,
                    OnePlusColor: "hsl(2, 70%, 50%)",
                    Philips: 108,
                    PhilipsColor: "hsl(82, 70%, 50%)",
                  },
                  {
                    category: "MO",
                    Samsung: 66,
                    SamsungColor: "hsl(61, 70%, 50%)",
                    Mi: 101,
                    MiColor: "hsl(194, 70%, 50%)",
                    OnePlus: 140,
                    OnePlusColor: "hsl(282, 70%, 50%)",
                    Philips: 128,
                    PhilipsColor: "hsl(78, 70%, 50%)",
                  },
                  {
                    category: "TV",
                    Samsung: 110,
                    SamsungColor: "hsl(269, 70%, 50%)",
                    Mi: 192,
                    MiColor: "hsl(183, 70%, 50%)",
                    OnePlus: 94,
                    OnePlusColor: "hsl(184, 70%, 50%)",
                    Philips: 36,
                    PhilipsColor: "hsl(130, 70%, 50%)",
                  },
                  {
                    category: "CM",
                    Samsung: 95,
                    SamsungColor: "hsl(279, 70%, 50%)",
                    Mi: 158,
                    MiColor: "hsl(327, 70%, 50%)",
                    OnePlus: 102,
                    OnePlusColor: "hsl(37, 70%, 50%)",
                    Philips: 88,
                    PhilipsColor: "hsl(131, 70%, 50%)",
                  },
                  {
                    category: "HA",
                    Samsung: 94,
                    SamsungColor: "hsl(109, 70%, 50%)",
                    Mi: 104,
                    MiColor: "hsl(102, 70%, 50%)",
                    OnePlus: 109,
                    OnePlusColor: "hsl(256, 70%, 50%)",
                    Philips: 23,
                    PhilipsColor: "hsl(144, 70%, 50%)",
                  },
                  {
                    category: "AL",
                    Samsung: 82,
                    SamsungColor: "hsl(45, 70%, 50%)",
                    Mi: 154,
                    MiColor: "hsl(148, 70%, 50%)",
                    OnePlus: 116,
                    OnePlusColor: "hsl(17, 70%, 50%)",
                    Philips: 76,
                    PhilipsColor: "hsl(69, 70%, 50%)",
                  },
                  {
                    category: "AM",
                    Samsung: 40,
                    SamsungColor: "hsl(334, 70%, 50%)",
                    Mi: 175,
                    MiColor: "hsl(143, 70%, 50%)",
                    OnePlus: 103,
                    OnePlusColor: "hsl(137, 70%, 50%)",
                    Philips: 160,
                    PhilipsColor: "hsl(175, 70%, 50%)",
                  },
                ]}
                keys={["Samsung", "Mi", "OnePlus", "Philips"]}
                indexBy="category"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "nivo" }}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: "fries",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "OnePlus",
                    },
                    id: "lines",
                  },
                ]}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Category",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Products",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper>
            <Box style={{ height: 400 }} paddingTop={2}>
              <Typography
                variant="h6"
                style={{ fontWeight: 700, marginLeft: 16, marginBottom: -32 }}
              >
                Date Wise Insights
              </Typography>
              <ResponsiveCalendar
                data={[
                  {
                    day: "2016-07-01",
                    value: 35,
                  },
                  {
                    day: "2015-12-23",
                    value: 192,
                  },
                  {
                    day: "2016-07-08",
                    value: 61,
                  },
                  {
                    day: "2015-12-07",
                    value: 379,
                  },
                  {
                    day: "2015-10-15",
                    value: 327,
                  },
                  {
                    day: "2017-11-14",
                    value: 225,
                  },
                  {
                    day: "2016-06-21",
                    value: 153,
                  },
                  {
                    day: "2015-11-10",
                    value: 354,
                  },
                  {
                    day: "2015-08-08",
                    value: 185,
                  },
                  {
                    day: "2016-12-18",
                    value: 308,
                  },
                  {
                    day: "2015-05-06",
                    value: 185,
                  },
                  {
                    day: "2016-09-14",
                    value: 36,
                  },
                  {
                    day: "2016-12-10",
                    value: 391,
                  },
                  {
                    day: "2018-02-14",
                    value: 286,
                  },
                  {
                    day: "2016-12-03",
                    value: 194,
                  },
                  {
                    day: "2017-01-28",
                    value: 155,
                  },
                  {
                    day: "2017-04-02",
                    value: 278,
                  },
                  {
                    day: "2016-12-12",
                    value: 302,
                  },
                  {
                    day: "2017-02-12",
                    value: 7,
                  },
                  {
                    day: "2015-09-05",
                    value: 61,
                  },
                  {
                    day: "2018-01-15",
                    value: 88,
                  },
                  {
                    day: "2017-11-08",
                    value: 339,
                  },
                  {
                    day: "2017-05-28",
                    value: 106,
                  },
                  {
                    day: "2016-11-30",
                    value: 212,
                  },
                  {
                    day: "2016-07-16",
                    value: 244,
                  },
                  {
                    day: "2016-11-08",
                    value: 310,
                  },
                  {
                    day: "2016-04-26",
                    value: 394,
                  },
                  {
                    day: "2015-11-29",
                    value: 139,
                  },
                  {
                    day: "2016-10-18",
                    value: 6,
                  },
                  {
                    day: "2015-11-02",
                    value: 269,
                  },
                  {
                    day: "2017-12-29",
                    value: 305,
                  },
                  {
                    day: "2017-07-11",
                    value: 62,
                  },
                  {
                    day: "2018-03-28",
                    value: 264,
                  },
                  {
                    day: "2017-07-05",
                    value: 179,
                  },
                  {
                    day: "2017-02-28",
                    value: 132,
                  },
                  {
                    day: "2016-07-15",
                    value: 238,
                  },
                  {
                    day: "2017-11-29",
                    value: 185,
                  },
                  {
                    day: "2018-02-20",
                    value: 56,
                  },
                  {
                    day: "2018-04-08",
                    value: 91,
                  },
                  {
                    day: "2016-04-03",
                    value: 148,
                  },
                  {
                    day: "2015-07-18",
                    value: 398,
                  },
                  {
                    day: "2016-03-12",
                    value: 110,
                  },
                  {
                    day: "2015-11-04",
                    value: 174,
                  },
                  {
                    day: "2018-05-07",
                    value: 264,
                  },
                  {
                    day: "2015-05-16",
                    value: 170,
                  },
                  {
                    day: "2017-10-01",
                    value: 342,
                  },
                  {
                    day: "2015-05-12",
                    value: 218,
                  },
                  {
                    day: "2017-10-11",
                    value: 262,
                  },
                  {
                    day: "2017-02-05",
                    value: 342,
                  },
                  {
                    day: "2015-06-14",
                    value: 167,
                  },
                  {
                    day: "2015-07-01",
                    value: 357,
                  },
                  {
                    day: "2015-08-20",
                    value: 102,
                  },
                  {
                    day: "2017-05-12",
                    value: 1,
                  },
                  {
                    day: "2015-11-12",
                    value: 235,
                  },
                  {
                    day: "2015-12-26",
                    value: 377,
                  },
                  {
                    day: "2017-04-05",
                    value: 35,
                  },
                  {
                    day: "2016-03-09",
                    value: 140,
                  },
                  {
                    day: "2016-10-21",
                    value: 216,
                  },
                  {
                    day: "2016-11-05",
                    value: 286,
                  },
                  {
                    day: "2016-08-04",
                    value: 253,
                  },
                  {
                    day: "2017-08-29",
                    value: 53,
                  },
                  {
                    day: "2017-08-02",
                    value: 115,
                  },
                  {
                    day: "2015-12-06",
                    value: 111,
                  },
                  {
                    day: "2015-05-24",
                    value: 378,
                  },
                  {
                    day: "2015-12-31",
                    value: 371,
                  },
                  {
                    day: "2017-02-26",
                    value: 241,
                  },
                  {
                    day: "2017-02-19",
                    value: 253,
                  },
                  {
                    day: "2015-08-21",
                    value: 390,
                  },
                  {
                    day: "2016-03-21",
                    value: 2,
                  },
                  {
                    day: "2015-06-04",
                    value: 171,
                  },
                  {
                    day: "2016-05-25",
                    value: 251,
                  },
                ]}
                from="2015-03-01"
                to="2016-07-12"
                emptyColor="#eeeeee"
                colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "row",
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: "right-to-left",
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
