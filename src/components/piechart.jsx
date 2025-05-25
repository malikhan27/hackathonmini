import * as React from 'react';
import { useContext, useMemo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { CompleteDataContext } from '../context/completeData';



export default function PieActiveArc() {
  const { completeData } = useContext(CompleteDataContext);
  


  const statusCounts = useMemo(() => {
    const counts = {
      approved: 0,
      pending: 0,
      rejected: 0,
    };

    completeData.forEach((item) => {
      if (item.STATUS === 'approved') counts.approved += 1;
      else if (item.STATUS === 'pending') counts.pending += 1;
      else if (item.STATUS === 'rejected') counts.rejected += 1;
    });

    return [
      { id: 0, value: counts.approved, label: 'Approved' },
      { id: 1, value: counts.pending, label: 'Pending' },
      { id: 2, value: counts.rejected, label: 'Rejected' },
    ];
  }, [completeData]);

  return (
    
    <PieChart
      series={[
        {
          data: statusCounts,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 60, additionalRadius: -30, color: 'gray' },
          innerRadius: 60,
        },
      ]}
      height={200}
      width={300}
    />
  );
}
