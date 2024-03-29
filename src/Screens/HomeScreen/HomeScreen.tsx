import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import icons from "../../Assets/icons";
import FeedListItem from "../../Module/FeedModule/FeedListItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LIST_API_URL } from "../../Helper/Constant";
import { POST_ITEM_RESPONSE } from "../../Types/ResponseTypes";

const HomeScreen = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const renderItem = ({ item }) => <FeedListItem item={item} />;
  const navigation = useNavigation<NavigationProp<any>>();
  const [postList, setPostList] = useState<Array<POST_ITEM_RESPONSE>>([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    fetchData();
  }, [refetch]);
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setPostList(jsonData?.data?.posts?.docs ?? []);
    } catch (error) {
      console.error("Error-0---------sd- a:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.iconsStyle} source={icons.homeMenu} />
        <Text style={styles.header}>Feed</Text>
        <Pressable onPress={() => navigation.navigate("CreateNewPost")}>
          <Image style={styles.iconsStyle} source={icons.createNew} />
        </Pressable>
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <FlatList
          contentContainerStyle={{ padding: 1 }}
          ItemSeparatorComponent={() => <View style={styles.lineStyle} />}
          ListFooterComponent={<View style={{ height: 80 }} />}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
          data={postList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No Post Available</Text>
            </View>
          }
          refreshing={refetch}
          onRefresh={() => setRefetch(refetch)}
        />
      </View>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
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
  lineStyle: { height: 1, marginVertical: 10 },
  emptyContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
