import React from "react";

import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

import StepIndicator from "./StepIndicator";

import PhaseOneForm from "./PhaseOneForm";

import PhaseTwoForm from "./PhaseTwoForm";

import PhaseThreeForm from "./PhaseThreeForm";

export default function PetFormModal({
  visible,
  editingId,
  step,
  setStep,
  petData,
  setPetData,
  selectedImages,
  pickImages,
  removeImage, // NEW
  loading,
  styles,
  onClose,
  onSubmit,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.modalTitle}>
              {editingId ? "Update Pet" : "Add Pet"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <StepIndicator step={step} />

          {step === 1 && (
            <PhaseOneForm
              petData={petData}
              setPetData={setPetData}
              styles={styles}
              pickImages={pickImages}
              selectedImages={selectedImages}
              removeImage={removeImage}
            />
          )}

          {step === 2 && (
            <PhaseTwoForm
              petData={petData}
              setPetData={setPetData}
              styles={styles}
            />
          )}

          {step === 3 && (
            <PhaseThreeForm
              petData={petData}
              setPetData={setPetData}
              styles={styles}
            />
          )}

          {/* BUTTONS */}

          <View style={styles.stepButtonRow}>
            {step > 1 && (
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => setStep(step - 1)}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}

            {step < 3 ? (
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={() => setStep(step + 1)}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>
                    {editingId ? "Update Pet" : "Add Pet"}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* CLOSE BUTTON */}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
