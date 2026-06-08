import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 4,
    backgroundColor: "#fffaf7",
    borderBottomWidth: 1,
    borderBottomColor: "#fed7aa",
  },

  closeIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    paddingHorizontal: 5,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f97316",
    marginLeft: 2,
  },

  addBtn: {
    backgroundColor: "#f97316",
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fb923c",
    elevation: 4,
    shadowColor: "#f97316",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#f8fafc",
    flexGrow: 1,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#f97316",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  rightSection: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },

  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },

  previewImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },

  imageThumbWrapper: {
    marginRight: 12,
    position: "relative",
    paddingTop: 6,
    paddingRight: 6,
  },

  imageThumb: {
    width: 104,
    height: 104,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  removeImageBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 2,
  },

  removeImageText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
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

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 26,
    maxHeight: "92%",
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
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 15,
    color: "#111827",
  },

  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fff1f2",
  },

  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  dateInputText: {
    flex: 1,
    color: "#111827",
    fontSize: 15,
  },

  fieldLabel: {
    marginBottom: 6,
    fontWeight: "700",
    color: "#374151",
    fontSize: 14,
  },

  fieldLabelError: {
    color: "#dc2626",
  },

  requiredHint: {
    color: "#dc2626",
    fontWeight: "800",
  },

  helperText: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 8,
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
    flex: 1,
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  nextBtn: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  backBtn: {
    flex: 1,
    backgroundColor: "#6b7280",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  stepButtonRow: {
    flexDirection: "row",
    marginTop: 20,
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

export default styles;
