import moment from "moment";
import React, { Fragment } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import { POST_ITEM_RESPONSE } from "../../Types/ResponseTypes";

type FeedListItemProps = {
  item: POST_ITEM_RESPONSE;
};

function FeedListItem(props: FeedListItemProps) {
  const { width } = useWindowDimensions();
  const { item } = props;
  return (
    <Fragment>
      <View style={styles.item}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={[styles.image, { width: width - 32 }]}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {item?.title}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
          <Text numberOfLines={1} style={styles.createdAt}>
            {moment(item?.createdAt).format("MMMM Do YYYY")}
          </Text>
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  item: {
    elevation: 1,
    backgroundColor: "#fdfdfd",
    overflow: "hidden",
    borderRadius: 10,
    paddingBottom: 5,
  },
  image: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  createdAt: {
    paddingVertical: 5,
    fontSize: 10,
    color: "#555",
  },
});
export default FeedListItem;
