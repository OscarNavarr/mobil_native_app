import { Text, View } from "react-native";
import "../global.css"
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center h-full w-full"> 
      <Text className="text-5xl text-dark-200">Welcome!</Text>
    </View>
  );
}
