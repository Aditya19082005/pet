import { BOARDING_API_URL, AVAILABILITY_API_URL } from "../constants/api";

export const fetchBoardingCentersApi = async (city = "", type = "") => {
  const queryParams = new URLSearchParams();

  if (city) queryParams.append("city", city);
  if (type) queryParams.append("type", type);

  const response = await fetch(`${BOARDING_API_URL}/list?${queryParams.toString()}`);
  const text = await response.text();

  if (!text || text.trim() === "") {
    return [];
  }

  const data = JSON.parse(text);

  return data?.status === "success" ? data.data || [] : [];
};

export const fetchBoardingCenterByIdApi = async (centerId) => {
  const response = await fetch(`${BOARDING_API_URL}/${centerId}`);
  const text = await response.text();

  if (!text || text.trim() === "") {
    return null;
  }

  const data = JSON.parse(text);

  return data?.status === "success" ? data.data || null : null;
};

export const fetchCapacityApi = async (centerId) => {
  const response = await fetch(
    `${AVAILABILITY_API_URL}/capacity?center_id=${centerId}`,
  );
  const text = await response.text();

  if (!text || text.trim() === "") {
    return null;
  }

  return JSON.parse(text);
};

export const checkAvailabilityApi = async ({ centerId, startDate, endDate }) => {
  const response = await fetch(`${AVAILABILITY_API_URL}/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center_id: centerId,
      start_date: startDate,
      end_date: endDate,
    }),
  });

  const text = await response.text();

  if (!text || text.trim() === "") {
    return null;
  }

  return JSON.parse(text);
};
