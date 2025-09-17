import { View, Image, FlatList, ActivityIndicator, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import Searchbar from '@/components/Searchbar'
import { updateSearchCount } from '@/services/appwrite'

const search = () => {
  const  [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() =>
    fetchMovies({
      query: searchQuery,
    }), false
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-Primary">
      <Image
        source={images.bg}
        className='absolute w-full h-full flex-1 z-0'
        resizeMode='cover'
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => (<MovieCard {...item} />)}
        keyExtractor={(item) => item.id.toString()} 
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: 'center', 
          gap: 16, 
          marginVertical: 16, 
          paddingRight:5 
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        className="mt-2 pb-32 px-5"
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image
                source={icons.logo}
                className='w-12 h-10'
                resizeMode='contain'
              />
            </View>
            <View className='my-5'>
              <Searchbar 
                placeholder='Search movies or TV series...' 
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator size='large' color='#0000ff' className='my-3' />
            )}
            {error && (
              <Text className='text-red-500 text-center my-3 px-5'>
                Error: {error?.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-white text-xl font-bold mb-3'>Search Result for
                <Text className='text-accent'> {searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
          <View className='mt-10 px-5'>

          <Text className='text-gray-400 text-center'>
            
            {searchQuery.trim() ?
              `No results found for "${searchQuery}". Please try a different search term.` :
              'Search for a movie or TV series.'
            }
          </Text>
          </View> 
        ) : null}
      /> 
    </View>
  )
}

export default search