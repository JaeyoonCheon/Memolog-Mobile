import client from './client';

export const getHashtagFrequency = async () => {
  const results = await client.get('/stat/frequency');

  return results.data;
};

export const getHashtagTrends = async () => {
  const results = await client.get('/stat/tag-trends');

  return results.data;
};
