import googleTrends from 'google-trends-api';

export const fetchTrendData = async (keyword: string) => {
  try {
    const result = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)), // Last 30 days
    });

    const data = JSON.parse(result);
    const timelineData = data.default.timelineData;

    // Calculate trend score (0-100) based on recent interest
    const trendScore = timelineData.length > 0 
      ? Math.round(timelineData[timelineData.length - 1].value[0])
      : 0;

    // Estimate search volume (mock data as Google Trends doesn't provide actual search volume)
    const searchVolume = Math.round(trendScore * 1000 + Math.random() * 5000);

    return {
      trendScore,
      searchVolume,
      timelineData: timelineData.map((point: any) => ({
        time: point.time,
        value: point.value[0]
      }))
    };
  } catch (error) {
    console.error('Error fetching trend data:', error);
    throw error;
  }
};