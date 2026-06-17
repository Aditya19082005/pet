import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function LiveUpdates() {
  const statusUpdates = [
    { id: 1, petName: "Buddy", petEmoji: "🐕", isViewed: false },
    { id: 2, petName: "Luna", petEmoji: "🐱", isViewed: true },
    { id: 3, petName: "Max", petEmoji: "🐶", isViewed: false },
    { id: 4, petName: "Bella", petEmoji: "🐰", isViewed: true },
    { id: 5, petName: "Charlie", petEmoji: "🐹", isViewed: false },
  ];

  const feedUpdates = [
    {
      id: 1,
      petName: "Buddy",
      petEmoji: "🐕",
      caption: "Buddy had a blast playing in the yard! 🎾",
      timestamp: "2h ago",
      likes: 234,
      comments: 12,
      shares: 8,
      isVideo: false,
      color: "#8b5cf6",
    },
    {
      id: 2,
      petName: "Luna",
      petEmoji: "🐱",
      caption: "Nap time is the best time 😴💤",
      timestamp: "4h ago",
      likes: 456,
      comments: 28,
      shares: 15,
      isVideo: false,
      color: "#ec4899",
    },
    {
      id: 3,
      petName: "Max",
      petEmoji: "🐶",
      caption: "Lunch time 🍖",
      timestamp: "6h ago",
      likes: 567,
      comments: 34,
      shares: 22,
      isVideo: true,
      color: "#3b82f6",
    },
  ];

  return (
    <ScrollView style={styles.section}>
      {/* TITLE */}
      <Text style={styles.title}>
        Stay Connected With Your Pet 🐶❤️
      </Text>

      <Text style={styles.subtitle}>
        Real-time updates and daily moments
      </Text>

      {/* STORIES */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.storyRow}>
          {statusUpdates.map((item) => (
            <View key={item.id} style={styles.storyItem}>
              <View
                style={[
                  styles.storyCircle,
                  {
                    borderColor: item.isViewed ? "#ddd" : "#3b82f6",
                  },
                ]}
              >
                <Text style={styles.emoji}>{item.petEmoji}</Text>
              </View>
              <Text style={styles.storyName}>{item.petName}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FEED */}
      {feedUpdates.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* image placeholder */}
          <View
            style={[
              styles.imageBox,
              { backgroundColor: item.color },
            ]}
          >
            {item.isVideo && (
              <View style={styles.playBtn}>
                <MaterialCommunityIcons
                  name="play"
                  size={30}
                  color="white"
                />
              </View>
            )}

            <Text style={styles.bigEmoji}>{item.petEmoji}</Text>

            <Text style={styles.time}>{item.timestamp}</Text>
          </View>

          {/* content */}
          <View style={styles.content}>
            <Text style={styles.name}>{item.petName}</Text>
            <Text style={styles.caption}>{item.caption}</Text>

            {/* actions */}
            <View style={styles.actions}>
              <Text>❤️ {item.likes}</Text>
              <Text>💬 {item.comments}</Text>
              <Text>🔁 {item.shares}</Text>
            </View>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>View Full Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* bottom button */}
      <TouchableOpacity style={styles.bottomBtn}>
        <Text style={styles.bottomText}>View All Updates</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
  },

  storyRow: {
    flexDirection: "row",
    paddingVertical: 10,
    gap: 15,
  },

  storyItem: {
    alignItems: "center",
    marginRight: 15,
  },

  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  emoji: {
    fontSize: 28,
  },

  storyName: {
    fontSize: 12,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },

  imageBox: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  bigEmoji: {
    fontSize: 50,
  },

  playBtn: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  time: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    fontSize: 10,
  },

  content: {
    padding: 15,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },

  caption: {
    color: "#555",
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#6366f1",
    padding: 10,
    borderRadius: 12,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  bottomBtn: {
    backgroundColor: "#6b21a8",
    padding: 15,
    borderRadius: 15,
    marginVertical: 20,
  },

  bottomText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});