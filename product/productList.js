import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Text, Alert, RefreshControl, ActivityIndicator } from 'react-native';

const ProductList = ({ navigation }) => {
    const [productData, setProductData] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to fetch productData only once

    const fetchData = async () => {
        setRefreshing(true)
        try {
            const response = await fetch('https://dummyjson.com/products');  // Fetching the productData
            const fetchedData = await response.json();
            setProductData(fetchedData.products)
            setRefreshing(false); // Storing it in a state
        } catch (error) {
            setRefreshing(false)
            Alert.alert('Error', 'Server Error', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'Retry', onPress: () => fetchData() },
            ])
        }
    };

    const handleRefresh = () => {
        setRefreshing(true); // Set refreshing to true when pull-down starts
        fetchData();
    };

    const handleNavigation = (id) => {
        navigation.navigate("Product Details", { id })
    }

    return (
        <View>
            {refreshing ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            ) : productData.length > 0 ? (
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    data={productData}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleNavigation(item.id)}
                            style={styles.itemContainer}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    style={styles.image}
                                    resizeMode='contain'
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.brandText}>{item.brand}</Text>
                                <Text style={styles.titleText}>{item.title}</Text>
                                <Text style={styles.priceText}>${(item.price - item.price * item.discountPercentage / 100).toFixed(2)}</Text>
                                <Text style={styles.ratingText}>Rating: {item.rating}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()} // Ensure key is a string
                />
            ) 
            :
                <View style={{ justifyContent: "center", alignItems: "center" }}><Text style={{ fontWeight: "bold", fontSize: 20 }}>No Products Found</Text></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        margin: 8,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 5,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    brandText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    titleText: {
        fontSize: 14,
        marginBottom: 5,
    },
    priceText: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratingText: {
        fontSize: 14,
        color: '#888',
    },
});

export default ProductList;
