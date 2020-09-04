import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDocumentUpload, defaultValue } from 'app/shared/model/document-upload.model';

export const ACTION_TYPES = {
  FETCH_DOCUMENTUPLOAD_LIST: 'uploadDocument/FETCH_DOCUMENTUPLOAD_LIST',
  FETCH_DOCUMENTUPLOAD_LIST_ALL: 'uploadDocument/DOCUMENTUPLOAD_LIST_ALL',
  FETCH_DOCUMENTUPLOAD: 'uploadDocument/FETCH_DOCUMENTUPLOAD',
  CREATE_DOCUMENTUPLOAD: 'uploadDocument/CREATE_DOCUMENTUPLOAD',
  UPDATE_DOCUMENTUPLOAD: 'uploadDocument/UPDATE_DOCUMENTUPLOAD',
  DELETE_DOCUMENTUPLOAD: 'uploadDocument/DELETE_DOCUMENTUPLOAD',
  RESET: 'uploadDocument/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDocumentUpload>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DocumentUploadState = Readonly<typeof initialState>;

export default (state: DocumentUploadState = initialState, action): DocumentUploadState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTUPLOAD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTUPLOAD_LIST_ALL):
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTUPLOAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DOCUMENTUPLOAD):
    case REQUEST(ACTION_TYPES.UPDATE_DOCUMENTUPLOAD):
    case REQUEST(ACTION_TYPES.DELETE_DOCUMENTUPLOAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTUPLOAD):
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTUPLOAD_LIST_ALL):
    case FAILURE(ACTION_TYPES.CREATE_DOCUMENTUPLOAD):
    case FAILURE(ACTION_TYPES.UPDATE_DOCUMENTUPLOAD):
    case FAILURE(ACTION_TYPES.DELETE_DOCUMENTUPLOAD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTUPLOAD_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTUPLOAD_LIST_ALL): {
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTUPLOAD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOCUMENTUPLOAD):
    case SUCCESS(ACTION_TYPES.UPDATE_DOCUMENTUPLOAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOCUMENTUPLOAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/file/upload';

const apiAllUrl = 'api/files/upload';

// Actions
const getAllEntities: ICrudGetAllAction<IDocumentUpload> = () => {
  const requestUrl = `${apiAllUrl}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENTUPLOAD_LIST_ALL,
    payload: axios.get<IDocumentUpload>(`${requestUrl}?cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntities: ICrudGetAllAction<IDocumentUpload> = (page, size, sort) => {
  if (!sort) {
    return getAllEntities();
  }
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENTUPLOAD_LIST,
    payload: axios.get<IDocumentUpload>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDocumentUpload> = id => {
  const uploadUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENTUPLOAD,
    payload: axios.get<IDocumentUpload>(uploadUrl)
  };
};

export const createEntity: ICrudPutAction<IDocumentUpload> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOCUMENTUPLOAD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IDocumentUpload> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOCUMENTUPLOAD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDocumentUpload> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCUMENTUPLOAD,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
