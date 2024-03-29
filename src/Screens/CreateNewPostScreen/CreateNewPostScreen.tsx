import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import icons from "../../Assets/icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CreatePostFrom from "../../Module/CreateModule/CreatePostFrom";

const CreateNewPostScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={styles.iconsStyle} source={icons.arrowBack} />
        </Pressable>
        <Text style={styles.header}>Create New Post</Text>
        <View />
      </View>
      <View style={{ marginHorizontal: 16 }}></View>
      <CreatePostFrom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  headerContainer: {
    backgroundColor: "#D3D3D3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  iconsStyle: { height: 24, width: 24 },
});

export default CreateNewPostScreen;
