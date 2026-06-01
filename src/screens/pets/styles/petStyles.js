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
    marginBottom: 15,
  },

  closeIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    paddingHorizontal: 5,
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
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
    flex: 1,
    backgroundColor: "#f97316",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  nextBtn: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  backBtn: {
    flex: 1,
    backgroundColor: "#6b7280",
    padding: 15,
    borderRadius: 10,
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
