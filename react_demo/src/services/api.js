import { API_URL } from '../constants/config';

export const fetchData = async (page, pageSize, sortConfig, searchTerm) => {
  const params = new URLSearchParams({
    page,
    pageSize,
    sortBy: sortConfig.key,
    sortOrder: sortConfig.direction,
    ...(searchTerm && { search: searchTerm })
  });

  const response = await fetch(`${API_URL}/data?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`API错误: ${response.status}`);
  }

  return await response.json();
};

export const deleteData = async (id) => {
  const response = await fetch(`${API_URL}/data/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  return await response.json();
};

export const batchDeleteData = async (ids) => {
  const response = await fetch(`${API_URL}/data/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  });

  return await response.json();
};

export const updateData = async (id, data) => {
  const response = await fetch(`${API_URL}/data/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  return await response.json();
};

export const createData = async (data) => {
  const response = await fetch(`${API_URL}/data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  return await response.json();
};
