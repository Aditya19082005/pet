import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Modal,
  ScrollView,
  Image,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

const BASE_URL = "https://www.cgpisoftware.com/cheerytail";

const API_URL = `${BASE_URL}/api/pets`;

const IMAGE_API_URL = `${BASE_URL}/api/pet-images`;

export default function PetScreen() {
  const [pets, setPets] = useState([]);

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);

  const [petImages, setPetImages] = useState({});

  const [petData, setPetData] = useState({
    pet_name: "",
    pet_type: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
  });

  useEffect(() => {
    fetchPets();
  }, []);

  // =========================
  // PICK IMAGES
  // =========================
  const pickImages = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission Required", "Please allow gallery access");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImages(result.assets);
      }
    } catch (error) {
      console.log("IMAGE PICK ERROR =>", error);
    }
  };

  // =========================
  // FETCH PET IMAGES
  // GET /api/pet-images/13
  // =========================
  const fetchPetImages = async (petId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${IMAGE_API_URL}/${petId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const text = await response.text();

      console.log("PET IMAGES RESPONSE =>", text);

      if (!text || text.trim() === "") {
        return;
      }

      let json = {};

      try {
        json = JSON.parse(text);
      } catch (e) {
        console.log("JSON PARSE ERROR =>", e);
        return;
      }

      let images = [];

      if (Array.isArray(json)) {
        images = json;
      } else if (Array.isArray(json.data)) {
        images = json.data;
      } else if (Array.isArray(json.images)) {
        images = json.images;
      }

      const updatedImages = images.map((img) => {
        let imageUrl = "";

        // FULL URL FROM API
        if (img.image_url) {
          imageUrl = img.image_url;
        }

        // ONLY IMAGE NAME
        else if (img.image) {
          imageUrl = `${BASE_URL}/uploads/pets/${img.image}`;
        }

        // IMAGE PATH
        else if (img.image_path) {
          imageUrl = `${BASE_URL}/${img.image_path}`;
        }

        console.log("FINAL IMAGE URL =>", imageUrl);

        return {
          ...img,
          image_url: imageUrl,
        };
      });

      setPetImages((prev) => ({
        ...prev,
        [petId]: updatedImages,
      }));
    } catch (error) {
      console.log("FETCH IMAGE ERROR =>", error);
    }
  };

  // =========================
  // UPLOAD PET IMAGES
  // POST /api/pet-images/add
  // =========================
  const uploadPetImages = async (petId) => {
    try {
      if (selectedImages.length === 0) return;

      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();

      formData.append("pet_id", String(petId));

      selectedImages.forEach((img, index) => {
        const fileExtension = img.uri.split(".").pop();

        formData.append("images[]", {
          uri: Platform.OS === "ios" ? img.uri.replace("file://", "") : img.uri,

          name: `pet_image_${index}.${fileExtension || "jpg"}`,

          type: img.mimeType || "image/jpeg",
        });
      });

      const response = await fetch(`${IMAGE_API_URL}/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const text = await response.text();

      console.log("UPLOAD RESPONSE =>", text);

      if (response.ok) {
        Alert.alert("Success", "Images uploaded successfully");

        setSelectedImages([]);

        await fetchPetImages(petId);
      } else {
        Alert.alert("Upload Error", text);
      }
    } catch (error) {
      console.log("UPLOAD ERROR =>", error);

      Alert.alert("Error", "Image upload failed");
    }
  };

  // =========================
  // UPDATE PET IMAGE
  // =========================
  const updatePetImage = async (imageId) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) return;

      const image = result.assets[0];

      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();

      formData.append("image_id", String(imageId));

      formData.append("image", {
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,

        name: "updated.jpg",

        type: "image/jpeg",
      });

      const response = await fetch(`${IMAGE_API_URL}/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const text = await response.text();

      console.log("UPDATE IMAGE RESPONSE =>", text);

      if (response.ok) {
        Alert.alert("Success", "Image updated successfully");

        fetchPets();
      } else {
        Alert.alert("Error", text);
      }
    } catch (error) {
      console.log("UPDATE IMAGE ERROR =>", error);
    }
  };

  // =========================
  // FETCH PETS
  // =========================
  const fetchPets = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const text = await response.text();

      console.log("FETCH RESPONSE =>", text);

      if (!text || text.trim() === "") {
        setPets([]);
        return;
      }

      let data = {};

      try {
        data = JSON.parse(text);
      } catch (e) {
        console.log("PET JSON ERROR =>", e);
        return;
      }

      const petList = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : [];

      setPets(petList);

      for (const pet of petList) {
        await fetchPetImages(pet.pet_id || pet.id);
      }
    } catch (error) {
      console.log("FETCH ERROR =>", error);

      Alert.alert("Error", "Failed to fetch pets");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================
  // ADD PET
  // =========================
  const addPet = async () => {
    if (!petData.pet_name) {
      Alert.alert("Validation", "Pet name is required");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const payload = {
        pet_name: petData.pet_name,
        pet_type: petData.pet_type,
        species: petData.species,
        breed: petData.breed,
        age: Number(petData.age),
        weight: Number(petData.weight),
      };

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

      console.log("ADD RESPONSE =>", text);

      if (response.ok) {
        let petId = null;

        try {
          const json = JSON.parse(text);

          petId = json?.data?.pet_id || json?.data?.id || json?.pet_id;
        } catch (e) {
          console.log("PARSE ERROR =>", e);
        }

        if (petId) {
          await uploadPetImages(petId);
        }

        Alert.alert("Success", "Pet added successfully");

        clearForm();

        setShowForm(false);

        fetchPets();
      } else {
        Alert.alert("Error", text || "Failed to add pet");
      }
    } catch (error) {
      console.log("ADD ERROR =>", error);

      Alert.alert("Error", "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE PET
  // =========================
  const updatePet = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const payload = {
        pet_id: Number(editingId),
        pet_name: String(petData.pet_name),
        pet_type: String(petData.pet_type),
        species: String(petData.species),
        breed: String(petData.breed),
        age: Number(petData.age),
        weight: Number(petData.weight),
      };

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

      console.log("UPDATE RESPONSE =>", text);

      if (response.ok) {
        if (selectedImages.length > 0) {
          await uploadPetImages(editingId);
        }

        Alert.alert("Success", "Pet updated successfully");

        clearForm();

        setShowForm(false);

        fetchPets();
      } else {
        Alert.alert("Error", text);
      }
    } catch (error) {
      console.log("UPDATE ERROR =>", error);

      Alert.alert("Error", "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE PET
  // =========================
  const deletePet = async (id) => {
    Alert.alert("Delete Pet", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Delete",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("token");

            const response = await fetch(`${API_URL}/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const text = await response.text();

            console.log("DELETE RESPONSE =>", text);

            if (response.ok) {
              Alert.alert("Success", "Pet deleted successfully");

              fetchPets();
            } else {
              Alert.alert("Error", text || "Delete failed");
            }
          } catch (error) {
            console.log("DELETE ERROR =>", error);

            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
  };

  // =========================
  // EDIT PET
  // =========================
  const editPet = (pet) => {
    const id = pet.pet_id || pet.id;

    setEditingId(id);

    setPetData({
      pet_name: pet.pet_name || "",
      pet_type: pet.pet_type || "",
      species: pet.species || "",
      breed: pet.breed || "",
      age: pet.age ? String(pet.age) : "",
      weight: pet.weight ? String(pet.weight) : "",
    });

    setShowForm(true);
  };

  // =========================
  // CLEAR FORM
  // =========================
  const clearForm = () => {
    setPetData({
      pet_name: "",
      pet_type: "",
      species: "",
      breed: "",
      age: "",
      weight: "",
    });

    setSelectedImages([]);

    setEditingId(null);
  };

  if (loading && pets.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Pets 🐾</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            clearForm();
            setShowForm(true);
          }}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item, index) => String(item.pet_id || item.id || index)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchPets();
            }}
          />
        }
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          !loading && <Text style={styles.emptyText}>No Pets Found</Text>
        }
        renderItem={({ item }) => {
          const petId = item.pet_id || item.id;

          return (
            <View style={styles.card}>
              <Text style={styles.petName}>{item.pet_name}</Text>

              <Text>Type: {item.pet_type}</Text>

              <Text>Species: {item.species}</Text>

              <Text>Breed: {item.breed}</Text>

              <Text>Age: {item.age}</Text>

              <Text>Weight: {item.weight}</Text>

              {petImages[petId]?.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginTop: 10 }}
                >
                  {petImages[petId]?.map((img, index) => (
                    <TouchableOpacity
                      key={img.id || index}
                      onPress={() => updatePetImage(img.id)}
                    >
                      <Image
                        source={{
                          uri: img.image_url,
                        }}
                        style={styles.petImage}
                        resizeMode="cover"
                        onError={(e) =>
                          console.log(
                            "IMAGE LOAD ERROR =>",
                            JSON.stringify(e.nativeEvent),
                          )
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <Text style={{ marginTop: 10, color: "#666" }}>No Images</Text>
              )}

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => editPet(item)}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => deletePet(petId)}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>
              {editingId ? "Update Pet" : "Add Pet"}
            </Text>

            <TextInput
              placeholder="Pet Name"
              style={styles.input}
              value={petData.pet_name}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  pet_name: text,
                })
              }
            />

            <TextInput
              placeholder="Pet Type"
              style={styles.input}
              value={petData.pet_type}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  pet_type: text,
                })
              }
            />

            <TextInput
              placeholder="Species"
              style={styles.input}
              value={petData.species}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  species: text,
                })
              }
            />

            <TextInput
              placeholder="Breed"
              style={styles.input}
              value={petData.breed}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  breed: text,
                })
              }
            />

            <TextInput
              placeholder="Age"
              keyboardType="numeric"
              style={styles.input}
              value={petData.age}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  age: text,
                })
              }
            />

            <TextInput
              placeholder="Weight"
              keyboardType="numeric"
              style={styles.input}
              value={petData.weight}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  weight: text,
                })
              }
            />

            <TouchableOpacity style={styles.imageBtn} onPress={pickImages}>
              <Text style={styles.imageBtnText}>Pick Images</Text>
            </TouchableOpacity>

            <ScrollView horizontal>
              {selectedImages.map((img, index) => (
                <Image
                  key={index}
                  source={{
                    uri: img.uri,
                  }}
                  style={styles.previewImage}
                />
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.button}
              onPress={editingId ? updatePet : addPet}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {editingId ? "Update Pet" : "Add Pet"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                clearForm();
                setShowForm(false);
              }}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f97316",
  },

  addBtn: {
    backgroundColor: "#f97316",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    padding: 15,
    paddingBottom: 100,
    backgroundColor: "#fff",
    flexGrow: 1,
  },

  card: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },

  petName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },

  petImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },

  previewImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  editBtn: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: "90%",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#f97316",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  imageBtn: {
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  imageBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#f97316",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  closeBtn: {
    marginTop: 15,
    alignItems: "center",
  },

  closeText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16,
  },
});
