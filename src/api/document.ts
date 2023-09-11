import client from './client';
import {PageParams, DocumentPayload} from 'document';

export const getDocuments = async (
  pageParams: PageParams,
  sort: string,
  order: string,
) => {
  const {id, cursor} = pageParams;
  const query = `?id=${id}&sort=${sort}&order=${order}&cursor=${cursor}`;

  const results = await client.get(`/document${query}`);

  return results.data;
};

export const searchDocuments = async (
  pageParams: PageParams,
  keyword: string,
) => {
  const {id, cursor} = pageParams;
  const query = `?id=${id}&keyword=${keyword}&cursor=${cursor}`;

  const results = await client.get(`/document/search${query}`);

  return results.data;
};

export const writeDocument = async (payload: DocumentPayload) => {
  const results = await client.post('/document', payload);

  return results.data;
};

export const getDocument = async (id: string) => {
  const results = await client.get(`/document/${id}`);

  return results.data;
};

export const modifyDocument = async (id: string, payload: DocumentPayload) => {
  const results = await client.post(`/document/${id}`, payload);

  return results.data;
};

export const deleteDocument = async (id: string) => {
  const results = await client.delete(`/document/${id}`);

  return results.data;
};
