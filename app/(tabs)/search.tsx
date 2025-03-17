import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchPopularMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies, 
    loading, 
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchPopularMovies({ query: searchQuery}), false)

  useEffect(() => {

    const timeoutID = setTimeout(async () => {
      if(searchQuery.trim() ) {
        await loadMovies()
      }else{
        reset()
      }
    }, 500)

    return () => clearTimeout(timeoutID)
  }, [searchQuery])


  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>

      <FlatList 
        data={movies}
        renderItem={({item}) => <MovieCard{...item}/>}
        keyExtractor={(item) => item.id.toString()}
        className='px-3'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{paddingBottom: 100}}
        ListHeaderComponent={
          <>
            <View className='flex-full flex-row justify-center  mt-20 items-center'>

              <Image source={icons.logo} className='w-12 h-10'/>
            </View>

            <View className='my-5'>
              <SearchBar 
                placeholder='Search movies' 
                value= {searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#0000ff" className='my-3'/>
            )}

            {error && (
              <Text className='text-red-500 px-5 my-3'>
                Error: {error?.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold '>
                Search results for{' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        } 
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
               {searchQuery.trim() ? 'No movies found' : 'Search for movies'} 
              </Text>
            </View>
          ): null
        }
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})