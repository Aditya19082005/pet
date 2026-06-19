import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import petDetailsScreenStyles from "../styles/PetDetailsScreenStyles";

import { fetchPetByIdApi } from "../services/petService";
import { fetchPetImagesApi } from "../services/imageService";

const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === "string") return image;
  return (
    image.image_url ||
    image.url ||
    image.image ||
    image.pet_image ||
    image.profile_image ||
    image.image_path ||
    null
  );
};

const formatSubtitle = (type, breed) => {
  if (!type && !breed) return "";
  const base = type ? `${type.charAt(0).toUpperCase()}${type.slice(1)}` : "";
  return breed ? `${base}${base ? " • " : ""}${breed}` : base;
};

export default function PetDetailsScreen({ route }) {
  const { petId } = route.params;

  const [petData, setPetData] = useState(null);
  const [petImages, setPetImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [details, images] = await Promise.all([
          fetchPetByIdApi(petId),
          fetchPetImagesApi(petId),
        ]);

        setPetData(details);
        setPetImages(Array.isArray(images) ? images : []);
      } catch (error) {
        console.log("PET DETAILS ERROR =>", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [petId]);

  if (loading) {
    return (
      <View style={petDetailsScreenStyles.detailsLoader}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  if (!petData) {
    return (
      <View style={petDetailsScreenStyles.loaderContainer}>
        <Text style={petDetailsScreenStyles.emptyText}>Pet details are unavailable.</Text>
      </View>
    );
  }

  const owner = petData.owner || {};
  const pet = petData.pet || {};
  const rawHealth = petData.health || {};
  const health = {
    ...rawHealth,
    deworming_date:
      rawHealth.deworming_date || petData.deworming_date || null,
    flea_tick_treatment_date:
      rawHealth.flea_tick_treatment_date || petData.flea_tick_treatment_date || null,
  };
  const behavior = petData.behavior_feeding || {};

  const galleryImages = petImages
    .map(getImageUrl)
    .filter((uri) => Boolean(uri));

  const profileImage =
    getImageUrl(petData) ||
    getImageUrl(pet) ||
    galleryImages[0] ||
    "https://via.placeholder.com/300";

  const openUrl = async (url) => {
    if (!url) {
      Alert.alert("File unavailable", "No vaccination certificate link is available.");
      return;
    }

    const normalizedUrl = String(url).trim();
    const link = normalizedUrl.startsWith("http")
      ? normalizedUrl
      : `https://{YOUR_BASE_URL}/${normalizedUrl}`;

    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert("Cannot open file", "This certificate link cannot be opened.");
    }
  };

  const getCertificateUrl = (certificate) => {
    if (!certificate) return null;

    if (typeof certificate === "string") {
      return certificate.trim();
    }

    return (
      certificate.uri ||
      certificate.url ||
      certificate.path ||
      certificate.file?.uri ||
      certificate.file?.url ||
      certificate.file?.path ||
      null
    );
  };

  const formatCertificateLabel = (certificate) => {
    const raw =
      certificate?.name ||
      certificate?.file?.name ||
      certificate?.uri ||
      certificate?.url ||
      certificate?.path ||
      certificate ||
      "Vaccination Certificate";

    if (typeof raw !== "string") return "Vaccination Certificate";

    const filename = raw.split("/").pop();
    if (!filename) return "Vaccination Certificate";
    if (filename.toLowerCase().endsWith(".pdf")) return filename;
    if (filename.includes(".")) return filename;
    return `${filename}.pdf`;
  };

  const DetailRow = ({ label, value, onPress, isLink, displayValue }) => (
    <View style={petDetailsScreenStyles.row}>
      <Text style={petDetailsScreenStyles.label}>{label}</Text>
      {isLink ? (
        <TouchableOpacity onPress={onPress} style={petDetailsScreenStyles.pdfLinkRow}>
          <View style={petDetailsScreenStyles.pdfLinkInner}>
            <View style={petDetailsScreenStyles.pdfIconWrapper}>
              <Ionicons name="document-text-outline" size={18} color="#fff" />
            </View>
            <Text style={petDetailsScreenStyles.pdfLinkText}>
              {displayValue || String(value) || "Vaccination Certificate"}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Text style={petDetailsScreenStyles.value}>
          {value === null || value === undefined || value === ""
            ? "-"
            : String(value)}
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView
      style={petDetailsScreenStyles.detailsContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={petDetailsScreenStyles.detailsHero}>
        <Image source={{ uri: profileImage }} style={petDetailsScreenStyles.detailPetImage} />
        <View style={petDetailsScreenStyles.heroText}>
          <Text style={petDetailsScreenStyles.detailsHeading}>
            {pet.pet_name || "Pet Details"}
          </Text>
          <Text style={petDetailsScreenStyles.petSubtitle}>
            {formatSubtitle(pet.pet_type, pet.breed)}
          </Text>
        </View>
      </View>

      <Text style={petDetailsScreenStyles.section}>Pet Information</Text>

      <DetailRow label="Gender" value={pet.gender} />
      <DetailRow label="Age" value={pet.age} />
      <DetailRow label="Date Of Birth" value={pet.date_of_birth} />
      <DetailRow label="Weight" value={pet.weight} />
      <DetailRow
        label="Color Identification Marks"
        value={pet.color_identification_marks}
      />
      <DetailRow label="Microchip ID" value={pet.microchip_id} />
      <DetailRow label="Registration Number" value={pet.registration_number} />
      <DetailRow label="Additional Details" value={pet.additional_details} />

      {galleryImages.length > 0 && (
        <View style={petDetailsScreenStyles.galleryContainer}>
          <Text style={petDetailsScreenStyles.section}>Photo Gallery</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={petDetailsScreenStyles.thumbnailScroll}
          >
            {galleryImages.map((uri, index) => (
              <Image
                key={`${uri}-${index}`}
                source={{ uri }}
                style={petDetailsScreenStyles.thumbnailImage}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <Text style={petDetailsScreenStyles.section}>Family Details</Text>

      <DetailRow label="Mother Name" value={pet.mother_name} />
      <DetailRow label="Father Name" value={pet.father_name} />
      <DetailRow label="Breeding Line" value={pet.breeding_line} />

      <Text style={petDetailsScreenStyles.section}>Health Details</Text>

      <DetailRow label="Vaccination Status" value={health.vaccination_status} />
      <DetailRow
        label="Vaccination Details"
        value={health.vaccination_details}
      />
      <DetailRow label="Vaccination Notes" value={health.vaccination_notes} />
      <DetailRow
        label="Vaccination Certificate"
        value={formatCertificateLabel(health.vaccination_certificate)}
        displayValue={formatCertificateLabel(health.vaccination_certificate)}
        isLink={Boolean(getCertificateUrl(health.vaccination_certificate))}
        onPress={() =>
          openUrl(getCertificateUrl(health.vaccination_certificate))
        }
      />
      <DetailRow label="Deworming Date" value={health.deworming_date} />
      <DetailRow
        label="Flea Tick Treatment Date"
        value={health.flea_tick_treatment_date}
      />
      <DetailRow label="Medical History" value={health.medical_history} />
      <DetailRow label="Allergies" value={health.allergies} />
      <DetailRow label="Medical Conditions" value={health.medical_conditions} />
      <DetailRow
        label="Current Medications"
        value={health.current_medications}
      />
      <DetailRow label="Surgery History" value={health.surgery_history} />
      <DetailRow
        label="Neutered / Spayed"
        value={health.neutered_spayed === "1" ? "Yes" : "No"}
      />

      <Text style={petDetailsScreenStyles.section}>Veterinarian Details</Text>

      <DetailRow label="Vet Name" value={health.vet_name} />
      <DetailRow label="Vet Clinic Name" value={health.vet_clinic_name} />
      <DetailRow label="Vet Contact" value={health.vet_contact} />
      <DetailRow
        label="Special Care Required"
        value={health.special_care_required}
      />

      <Text style={petDetailsScreenStyles.section}>Behavior & Feeding</Text>

      <DetailRow label="Eating Habit" value={behavior.eating_habit} />
      <DetailRow
        label="Water Intake Habit"
        value={behavior.water_intake_habit}
      />
      <DetailRow
        label="Friendly With Humans"
        value={behavior.friendly_with_humans === "1" ? "Yes" : "No"}
      />
      <DetailRow
        label="Friendly With Dogs"
        value={behavior.friendly_with_dogs === "1" ? "Yes" : "No"}
      />
      <DetailRow
        label="Aggressive Behavior"
        value={behavior.aggressive_behavior === "1" ? "Yes" : "No"}
      />
      <DetailRow label="Anxiety Issues" value={behavior.anxiety_issues} />
      <DetailRow label="Biting History" value={behavior.biting_history} />
      <DetailRow label="Food Type" value={behavior.food_type} />
      <DetailRow label="Food Brand" value={behavior.food_brand} />
      <DetailRow label="Feeding Schedule" value={behavior.feeding_schedule} />
      <DetailRow label="Quantity Per Meal" value={behavior.quantity_per_meal} />
      <DetailRow
        label="Treats Allowed"
        value={behavior.treats_allowed === "1" ? "Yes" : "No"}
      />
      <DetailRow
        label="Food Allergies"
        value={behavior.food_allergies === "1" ? "Yes" : "No"}
      />
      <DetailRow
        label="Food Allergy Details"
        value={behavior.food_allergy_details}
      />

      <View style={petDetailsScreenStyles.spacer} />
    </ScrollView>
  );
}
