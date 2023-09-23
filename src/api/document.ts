import client from './client';
import {PageParams, DocumentPayload} from 'document';

import {getData, postData} from './client';
import {CardItemProps} from 'card';

export const getDocuments = async (
  pageParams: PageParams,
  sort: string,
  order: string,
): Promise<CardItemProps[]> => {
  const {id, cursor} = pageParams;
  const query = `?id=${id}&sort=${sort}&order=${order}&cursor=${cursor}`;

  const results = await client.get<CardItemProps[]>(`/document${query}`);

  return results.data;
};

export const searchDocuments = async (
  pageParams: PageParams,
  keyword: string,
): Promise<CardItemProps[]> => {
  const {id, cursor} = pageParams;
  const query = `?id=${id}&keyword=${keyword}&cursor=${cursor}`;

  const results = await client.get<CardItemProps[]>(`/document/search${query}`);

  return results.data;
};

export const getDocument = async (id: number): Promise<DocumentPayload> => {
  const results = await client.get<DocumentPayload>(`/document/${id}`);

  return results.data;
};

export const writeDocument = async (
  payload: DocumentPayload,
): Promise<boolean> => {
  const results = await client.post<boolean>('/document', payload);

  return results.data;
};

export interface ModifyDocument {
  id: number;
  payload: DocumentPayload;
}

export const modifyDocument = async ({
  id,
  payload,
}: ModifyDocument): Promise<boolean> => {
  const results = await client.post<boolean>(`/document/${id}`, payload);

  return results.data;
};

export const deleteDocument = async (id: number): Promise<boolean> => {
  const results = await client.delete<boolean>(`/document/${id}`);

  return results.data;
};
