import {getData} from './client';
import {GetOtherDocumentProps} from 'browse';
import {CardItemProps} from 'card';

export const getOtherDocuments = async (
  props: GetOtherDocumentProps,
): Promise<CardItemProps[]> => {
  const {id, cursor} = props;
  const query = `?id=${id}&cursor=${cursor}`;

  const callResults = await getData<CardItemProps[]>(`/browse${query}`);
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};
