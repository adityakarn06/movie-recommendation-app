import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-dark-200">
        Welcome back!
      </Text>
      <Link href="/onboarding">onboarding</Link>
      <Link href="/movie/avengers">avengers</Link>
    </View>
  );
}