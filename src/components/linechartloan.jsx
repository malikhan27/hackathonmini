// import * as React from 'react';
// import { useContext, useEffect, useState } from 'react';
// import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
// import { CompleteDataContext } from '../context/completeData';
// import { format } from 'date-fns';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Loader from './loader';

// const margin = { right: 24 };

// export default function SimpleLineChart() {
//   const { completeData } = useContext(CompleteDataContext);
//   const [monthlyData, setMonthlyData] = useState({ months: [], totals: [] });
 

//   useEffect(() => {
    
//     const approvedLoans = completeData.filter((item) => item.STATUS === 'approved');

//     const monthlyTotals = {};

//     approvedLoans.forEach((item) => {
//       const month = format(new Date(item.created_at), 'MMM yyyy');
//       if (!monthlyTotals[month]) {
//         monthlyTotals[month] = 0;
//       }
//       monthlyTotals[month] += Number(item.loanAmount);
//     });

//     const sortedMonths = Object.keys(monthlyTotals).sort(
//       (a, b) => new Date(a) - new Date(b)
//     );

//     const totals = sortedMonths.map((month) => monthlyTotals[month]);

//     setMonthlyData({ months: sortedMonths, totals });
//   }, [completeData]);

  

//   const totalApproved = monthlyData.totals.reduce((sum, val) => sum + val, 0);
//   const isLoading = !monthlyData 

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         flexDirection: { xs: 'column', lg: 'row' },
//       }}
//     >
//       {isLoading ? (
//         <Box
//           sx={{
//             width: '100%',
//             paddingX: { xs: 2 },
//             height: '100%',
//             marginY: '10%',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Loader size={50} />
//         </Box>
//       ) : (
//         <Box sx={{ width: '100%', padding: 2 }}>
//           <Typography sx={{ textAlign: 'center', marginY: 2 }}>
//             Total Approved Event: ${totalApproved.toLocaleString()}
//           </Typography>
//           <LineChart
//             height={300}
//             series={[
//               {
//                 data: monthlyData.totals,
//                 label: 'Approved Loan Amount',
//                 area: true,
//                 showMark: false,
//                 color: 'red',
//               },
//             ]}
//             xAxis={[{ scaleType: 'point', data: monthlyData.months }]}
//             sx={{
//               [`& .${lineElementClasses.root}`]: {
//                 display: 'none',
//               },
//             }}
//             margin={margin}
//           />
//         </Box>
//       )}
//     </Box>
//   );
// }
