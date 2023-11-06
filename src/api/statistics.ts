import {getData} from './client';
import {TagList} from 'chart';

export const getHashtagFrequency = async (): Promise<TagList[]> => {
  const callResults = await getData<TagList[]>('/stat/frequency');

  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const getHashtagTrends = async (): Promise<TagList[]> => {
  const callResults = await getData<TagList[]>('/stat/tag-trends');

  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};
