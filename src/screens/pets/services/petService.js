import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

import { API_URL } from "../constants/api";

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

export const updatePetApi = async (petId, payload) => {
  const token = await AsyncStorage.getItem("token");

  const hasFileUpload =
    payload?.vaccination_certificate &&
    typeof payload.vaccination_certificate === "object" &&
    (payload.vaccination_certificate.uri ||
      payload.vaccination_certificate.name ||
      payload.vaccination_certificate.type);

  let body;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  if (hasFileUpload) {
    const formData = new FormData();

    formData.append("pet_id", String(petId));

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "pet_id") {
        return;
      }

      if (value === undefined || value === null || value === "") {
        return;
      }

      if (key === "vaccination_certificate") {
        const fileUri = value.uri || value.path || value.file?.uri || "";

        const safePetName = String(
          payload.pet_name ||
            payload.petName ||
            payload.name ||
            "pet",
        )
          .trim()
          .replace(/[^a-zA-Z0-9-_]/g, "_")
          .replace(/_+/g, "_") || "pet";

        const fileName = `${safePetName}_vaccination_certificate.pdf`;
        const mimeType =
          value.type ||
          value.mimeType ||
          value.contentType ||
          "application/pdf";

        const normalizedFile = {
          uri:
            Platform.OS === "ios" && fileUri.startsWith("file://")
              ? fileUri.replace("file://", "")
              : fileUri,
          name: fileName,
          type: mimeType,
        };

        console.log("NORMALIZED CERT FILE =>", normalizedFile);
        formData.append(key, normalizedFile, fileName);
        return;
      }

      if (typeof value === "boolean" || typeof value === "number") {
        formData.append(key, String(value));
        return;
      }

      if (typeof value === "object" && !Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
        return;
      }

      formData.append(key, String(value));
    });

    body = formData;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }

  console.log("UPDATE PET FILE PAYLOAD =>", payload.vaccination_certificate);
  console.log(
    "UPDATE PET FILE TYPE =>",
    typeof payload.vaccination_certificate,
  );
  console.log("UPDATE PET FILE NAME =>", payload.pet_name || "pet");
  console.log("UPDATE PET URL =>", `${API_URL}/update/${petId}`);

  const response = await fetch(`${API_URL}/update/${petId}`, {
    method: "POST",
    headers,
    body,
  });

  const text = await response.text();

  console.log("UPDATE PET STATUS =>", response.status);
  console.log("UPDATE PET RESPONSE =>", text);

  return {
    ok: response.ok,
    data: text,
  };
};

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

