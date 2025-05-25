import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

export default function SimpleCharts({ pendingData, totalData, approvedData }) {
  return (
    <Box sx={{ width: '100%', paddingX: { xs: 2 }, display: 'flex', flexDirection: 'column' }}>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['PENDING', 'TOTAL', 'APPROVED'],
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: [pendingData, totalData, approvedData],
            itemStyle: (_, index) => ({
              fill: ['#fbc02d', '#64b5f6', '#4caf50'][index], // Yellow, Blue, Green
            }),
          },
        ]}
        height={300}
      />
    </Box>
  );
}
