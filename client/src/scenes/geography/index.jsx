import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useGetGeographyQuery } from "state/api";
import { geoData } from "state/geoData";
import { ResponsiveChoropleth } from "@nivo/geo";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  return (
    <Box margin="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Below is your customers location" />
      <Box
        marginTop="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
            features={geoData.features}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={0.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -50,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "black",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Is Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
