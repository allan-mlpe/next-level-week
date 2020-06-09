import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg'

import api from '../../services/api';

interface Item {
  id: number;
  title: string;
  image: string;
}

const Points = () => {
    const navigation = useNavigation();

    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    // loaders
    const loadItems = async () => {
      const itemReponse = await api.get('/items');

      setItems(itemReponse.data);
    }

    useEffect(() => {
      loadItems();
    }, []);

    const handleNavigateBack = () => {
        navigation.goBack();
    }

    const handleNavigateToDetail = () => {
        navigation.navigate('Detail');
    }

    const handleSelectedItems = (itemId: number) => {
      const index = selectedItems.indexOf(itemId);

      const items =  index >= 0 ? selectedItems.filter(i => i !== itemId) 
          : [...selectedItems, itemId];

      setSelectedItems(items);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" color="#34cb79" size={20} />
            </TouchableOpacity>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Encontre no mapa o ponto de coleta.</Text>

            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map} 
                    initialRegion={{
                        latitude: -8.0549795,
                        longitude: -34.8783129,
                        latitudeDelta: 0.014,
                        longitudeDelta: 0.014
                    }}
                >
                    <Marker
                        style={styles.mapMarker} 
                        coordinate={{
                            latitude: -8.0549795,
                            longitude: -34.8783129
                        }}
                        onPress={handleNavigateToDetail}
                    >
                        <View style={styles.mapMarkerContainer}>
                            <Image 
                                style={styles.mapMarkerImage}
                                source={{ uri: 'https://images.unsplash.com/photo-1560891788-75137d27109c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=50' }} 
                            />
                            <Text style={styles.mapMarkerTitle}>Mercado</Text>
                        </View>
                    </Marker>
                </MapView>
            </View>

        </View>

        <View style={styles.itemsContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20
                }}
            >
                {items.map(item => (
                    <TouchableOpacity 
                        style={[
                          styles.item,
                          selectedItems.includes(item.id) ? styles.selectedItem : {}
                        ]} 
                        onPress={() => handleSelectedItems(item.id)}
                        key={`item-${item.id}`}
                        activeOpacity={0.5}
                    >
                        <SvgUri 
                            width={42}
                            height={42}
                            uri={item.image} 
                        />
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                  ))
                }
            </ScrollView>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Points;