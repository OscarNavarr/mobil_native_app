import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import "../global.css"
import { Link, useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies } from "@/services/api";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import MovieCard from "@/components/MovieCard";

export default function Index() {

  const router = useRouter();

  const {data: movies, loading: moviesLoading, error: moviesError} = useFetch(() => fetchPopularMovies({ query: ''}))
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-primary"> 
        <Image source={images.bg} className="absolute w-full z-0"/>

        <ScrollView className="flex-1 px-5" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{minHeight: '100%', paddingBottom:10}}
        >
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

          {moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ): moviesError ? (
            <Text >Error: {moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for movies"
              />
                
              <>
                <Text className="text-lg text-white  font-bold mt-5 mb-3">Latest Movies</Text>

                <FlatList
                  data={movies}
                  renderItem={({item}) => (
                    <MovieCard
                      {...item}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight:5,
                    marginBottom: 10
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            </View>
          )}

          
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}
