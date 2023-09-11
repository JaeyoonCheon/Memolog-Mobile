import client from './client';
import {GetOtherDocumentProps} from 'browse';

export const getOtherDocuments = async (props: GetOtherDocumentProps) => {
  const {id, cursor} = props;
  const query = `?id=${id}&cursor=${cursor}`;

  const results = await client.get(`/browse${query}`);

  return results.data;
};
