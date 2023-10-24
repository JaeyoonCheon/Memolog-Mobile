import {deleteData, getData, postData} from './client';
import {PageParams, DocumentPayload, Document, DocumentDetail} from 'document';
import {CardItemProps} from 'card';

export const getDocuments = async (
  pageParams: PageParams,
  sort: string,
  order: string,
): Promise<CardItemProps[]> => {
  const {id, cursor} = pageParams;
  const query = `?id=${id}&sort=${sort}&order=${order}&cursor=${cursor}`;

  const callResults = await getData<CardItemProps[]>(`/document${query}`);
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const searchDocuments = async (
  pageParams: PageParams,
  keyword: string,
): Promise<CardItemProps[]> => {
  const {id, cursor} = pageParams;
  const query = `?id=${id}&keyword=${keyword}&cursor=${cursor}`;

  const callResults = await getData<CardItemProps[]>(
    `/document/search${query}`,
  );
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const getDocument = async (id: number): Promise<DocumentDetail> => {
  const callResults = await getData<DocumentDetail>(`/document/${id}`);
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const writeDocument = async (
  payload: DocumentPayload,
): Promise<void> => {
  await postData<void>('/document', payload);
};

export interface ModifyDocument {
  id: number;
  payload: DocumentPayload;
}

export const modifyDocument = async ({
  id,
  payload,
}: ModifyDocument): Promise<boolean> => {
  const callResults = await postData<boolean>(`/document/${id}`, payload);
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const deleteDocument = async (id: number): Promise<void> => {
  await deleteData<void>(`/document/${id}`);
};
