import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CREATE_API_URL } from "../../Helper/Constant";

const CreatePostFrom = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation<NavigationProp<any>>();
  const [image, setImage] = useState("");

  const onSubmit = async (data) => {
    try {
      const formData: any = new FormData();

      formData.append("image", {
        uri: image,
        name: "image.jpg",
        type: "image/jpg",
      });
      formData.append("title", data.title);
      formData.append("description", data.description);
      console.log(formData, "FORMDATA");
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Success", "Post submitted successfully");
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      } else {
        Alert.alert("Error", "Failed to submit post");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while submitting the post");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
    }
  };
  const { width } = useWindowDimensions();
  console.log(image);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        {!image && (
          <View style={[styles.imageContainer, { width: width - 32 }]}>
            <Text>Upload Image</Text>
          </View>
        )}
        {image && (
          <Image
            borderRadius={10}
            height={200}
            resizeMode="cover"
            width={width - 32}
            source={{ uri: image }}
          />
        )}
      </View>

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <View style={{ height: 10 }} />
      <Button
        disabled={image === ""}
        title="REMOVE IMAGE"
        onPress={() => {
          setImage("");
        }}
      />

      {/* Form */}
      <View style={styles.form}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
          defaultValue=""
        />
      </View>

      <Button
        disabled={image === ""}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  form: {
    width: "100%",
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderRadius: 10,
    height: 200,

    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default CreatePostFrom;
