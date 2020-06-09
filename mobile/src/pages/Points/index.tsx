import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location';
import api from '../../services/api';

interface Item {
  id: number;
  title: string;
  image: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

const Points = () => {
    const navigation = useNavigation();

    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialCoords, setInitialCoords] = useState<[number, number]>([0,0]);

    // loaders
    const loadItems = async () => {
      const itemReponse = await api.get('/items');

      setItems(itemReponse.data);
    }

    const loadPoints = async () => {
      const pointsResponse = await api.get('/points', {
        params: {
          items: selectedItems
        }
       });

      setPoints(pointsResponse.data);
    }

    // carrega localização inicial do usuário
    useEffect(() => {
      async function loadPosition() {
        // aguarda o usuário conceder acesso a localização do dispositivo
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert("Precisamos da sua localização para mostrar os pontos mais próximos a você!");
          setInitialCoords([-8.0549795,-34.8783129]);
          return;
        }

        const location = await Location.getCurrentPositionAsync();

        const { latitude, longitude } = location.coords;

        setInitialCoords([latitude, longitude]);
      };

      loadPosition();
    }, []);

    useEffect(() => {
      loadItems();
    }, []);

    useEffect(() => {
      loadPoints();
    }, [selectedItems]);

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
                { initialCoords[0] !== 0 &&
                 <MapView 
                    style={styles.map} 
                    initialRegion={{
                        latitude: initialCoords[0],
                        longitude: initialCoords[1],
                        latitudeDelta: 0.014,
                        longitudeDelta: 0.014
                    }}
                  >
                    {points.map(point => (
                      <Marker
                          key={`point-${point.id}`}
                          style={styles.mapMarker} 
                          coordinate={{
                              latitude: point.latitude,
                              longitude: point.longitude
                          }}
                          onPress={handleNavigateToDetail}
                      >
                          <View style={styles.mapMarkerContainer}>
                              <Image 
                                  style={styles.mapMarkerImage}
                                  source={{ uri: point.image }} 
                              />
                              <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                          </View>
                      </Marker>
                    ))}
                    
                  </MapView>
                }
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