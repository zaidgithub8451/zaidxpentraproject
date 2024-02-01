import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, ActivityIndicator, Alert } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';


const ProductDetails = (props) => {
    const [productDetailData, setProductDetailData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://dummyjson.com/products/${props.route.params.id}`);  // Fetching the productDetailData
            const fetchedData = await response.json();
            setProductDetailData(fetchedData) // Storing it in a state
            setLoading(false);
        } catch (error) {
            setLoading(false)
            Alert.alert('Error', 'Server Error', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'Retry', onPress: () => fetchData() },
            ])
        }
    };

    const width = Dimensions.get('window').width;
    return (
        <>
            {loading ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                    <ActivityIndicator size={'large'} />
                </View>) : <View style={styles.cardContainer}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardHeader}>{productDetailData.brand} - {productDetailData.category} </Text>
                </View>
                <Carousel
                    loop
                    width={width}
                    height={300}
                    autoPlay={true}
                    data={productDetailData.images}
                    scrollAnimationDuration={2000}
                    renderItem={({ index }) => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >

                            <Image source={{ uri: productDetailData.images[index] }} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
                        </View>
                    )}
                />
                <View style={styles.cardContent}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.cardTitle}>{productDetailData.title}</Text>
                        <Text style={styles.cardTitle}>{productDetailData.rating} <Text style={{ color: "#F7DC6F" }}>&#9733;</Text></Text>
                    </View>
                    <Text style={styles.cardDiscount}>
                        -{productDetailData.discountPercentage}%  <Text style={{ color: 'black' }}>
                            ${productDetailData.price - (productDetailData.price * productDetailData.discountPercentage / 100).toFixed(2)}
                        </Text>
                    </Text>
                    <Text style={styles.cardDescription}>
                        M.R.P.: $<Text style={{ textDecorationLine: "line-through" }}>{productDetailData.price}</Text>
                    </Text>
                    <Text style={styles.cardTitle}>
                        {productDetailData.stock > 0 ?
                            <Text style={{ color: "green" }}>In Stock</Text>
                            :
                            <Text style={{ color: "red" }}>Out of Stock</Text>}
                    </Text>

                    <Text style={styles.cardTitle}>Description</Text>
                    <Text style={styles.cardDescription}>{productDetailData.description}</Text>
                </View>
            </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 10,
        margin: 10,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        marginVertical: 10
    },
    cardContent: {
        padding: 15,
    },
    cardHeader: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 5,
        textTransform: "uppercase"
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,

    },
    cardDiscount: {
        fontSize: 30,
        marginBottom: 5,
        color: "red"

    },
    cardDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
});

export default ProductDetails