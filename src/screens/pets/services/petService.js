import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../constants/api";

// FETCH SINGLE PET DETAILS
export const fetchPetByIdApi = async (id) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const text = await response.text();

  if (!text || text.trim() === "") {
    return null;
  }

  const data = JSON.parse(text);

  return data?.data || data;
};

// FETCH PETS
export const fetchPetsApi = async () => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const text = await response.text();

  if (!text || text.trim() === "") {
    return [];
  }

  const data = JSON.parse(text);

  return Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
};

// ADD PET
export const addPetApi = async (payload) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  return {
    ok: response.ok,
    data: text,
  };
};

// UPDATE PET
export const updatePetApi = async (payload) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  return {
    ok: response.ok,
    data: text,
  };
};

// DELETE PET
export const deletePetApi = async (id) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok;
};
