import { decamelizeKeys } from 'humps';

export const createFavorite = messageId => (
  fetch('api/message_favs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(decamelizeKeys(messageId, { separator: '_' }))
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return json;
  }).catch(error => {
    throw error || ['Unknown message error!'];
  })
);

export const deleteFavorite = messageSlug => (
  fetch(`api/message_favs/${messageSlug}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return json;
  }).catch(error => {
    throw error || ['Unknown message error!'];
  })
);