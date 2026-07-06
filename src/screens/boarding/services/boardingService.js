import { BOARDING_API_URL, AVAILABILITY_API_URL } from "../constants/api";
import { BOOKING_API_URL } from "../constants/api";

export const fetchBoardingCentersApi = async (city = "", type = "") => {
  const queryParams = new URLSearchParams();

  if (city) queryParams.append("city", city);
  if (type) queryParams.append("type", type);

  const response = await fetch(
    `${BOARDING_API_URL}/list?${queryParams.toString()}`,
  );
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

export const checkAvailabilityApi = async ({
  centerId,
  startDate,
  endDate,
}) => {
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

export const fetchBookedDatesApi = async (centerId, year, month) => {
  const response = await fetch(
    `${AVAILABILITY_API_URL}/booked-dates?center_id=${centerId}&year=${year}&month=${month}`,
  );

  const text = await response.text();

  if (!text || text.trim() === "") {
    return [];
  }

  const json = JSON.parse(text);
  let dates = [];

  if (Array.isArray(json)) {
    dates = json;
  } else if (Array.isArray(json.data)) {
    dates = json.data;
  } else if (Array.isArray(json.booked_dates)) {
    dates = json.booked_dates;
  } else if (Array.isArray(json.data?.booked_dates)) {
    dates = json.data.booked_dates;
  }

  return dates;
};

export const fetchPricingApi = async ({ centerId, petId, startDate, endDate, token }) => {
  try {
    const query = new URLSearchParams({
      center_id: String(centerId),
      pet_id: String(petId),
      start_date: startDate,
      end_date: endDate,
    });

    const response = await fetch(`${AVAILABILITY_API_URL}/pricing?${query.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    if (!text || text.trim() === "") {
      return null;
    }

    const json = JSON.parse(text);
    return json?.data ?? json?.pricing ?? json?.result ?? json ?? null;
  } catch (error) {
    console.log("PRICING FETCH FAILED:", error);
    return null;
  }
};

export const fetchMyBookingsApi = async (token) => {
  try {
    const response = await fetch(`${BOOKING_API_URL}/my-bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    const json = JSON.parse(text);

    return json?.data || [];
  } catch (error) {
    console.log("FETCH FAILED:", error);
    return [];
  }
};
