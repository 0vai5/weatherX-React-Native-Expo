import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const Index = () => {
    const [city, setCity] = useState<any>('Karachi');
    const [weatherData, setWeatherData] = useState<any | null>(null);
    let cityName = weatherData ? weatherData.name : 'Karachi';
    const [loading, setLoading] = useState<boolean>(false);
    const apiKey = "1f0cb792c4f28ea9f0f23e1330f74a98";
    const apiUrlBase = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${apiKey}`;

    const fetchWeather = async () => {
        try {
            setLoading(true);
            const response = await fetch(apiUrlBase + '&q=' + city);
            const result = await response.json();

            if (response.ok) {
                setWeatherData(result);
                console.log('Weather Data:', result);
            } else {
                console.error('Error fetching weather data:', result.message);
                setWeatherData(null);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.icon}>
                    {/* Updated image source to support static image assets */}
                    <Image
                        source={require('../assets/images/searchIcon.svg')}
                        style={{ width: 20, height: 20 }}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='City'
                        style={styles.input}
                        value={city}
                        onChangeText={(text) => setCity(text)}
                    />
                </View>
                <View style={styles.searchBtn}>
                    <TouchableOpacity onPress={fetchWeather}>
                        <Text style={{ color: 'white' }}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.weatherContainer}>
                <View style={styles.initialsContainer}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{cityName}</Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{new Date().toDateString()}</Text>
                </View>
                {weatherData ? (
                    <View style={styles.temperatureContainer}>
                        <View style={styles.temperatureNumbers}>
                            <Text style={{ fontSize: 100, fontWeight: 'bold', color: "#696969" }}>
                                {Math.round(weatherData.main.temp)}
                            </Text>
                            <Text style={{ fontSize: 50, fontWeight: 'bold', color: "#696969" }}>&#x2103;</Text>
                        </View>
                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: "#696969" }}>
                            {weatherData.weather[0].main}
                        </Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#696969" }}>
                            Feels Like {Math.round(weatherData.main.feels_like)} &#x2103;
                        </Text>
                        <View style={styles.others}>
                            <View style={styles.wind}>
                                <Image
                                    source={require('../assets/images/windIcon.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: "#696969" }}>
                                    {weatherData.wind.speed} m/s
                                </Text>
                            </View>
                            <View style={styles.visibility}>
                                <Image
                                    source={require('../assets/images/eyeIcon.svg')}
                                    style={{ width: 20, height: 20 }}
                                />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: "#696969" }}>
                                    {weatherData.visibility / 1000} km
                                </Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <Text style={{ fontSize: 20, color: 'red', marginTop: 20 }}>
                        {loading ? 'Loading...' : 'No Data Available'}
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        fontFamily: 'PoppinsRegular',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: "#E9E9E9",
        borderWidth: 1,
        borderColor: "red"
    },
    inputContainer: {
        padding: 0,
        width: '80%',
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        backgroundColor: 'white',
        height: '93%',
        width: '10%',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: 12,
        fontSize: 17,
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    searchBtn: {
        backgroundColor: 'black',
        height: '93%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    weatherContainer: {
        width: '80%',
        height: '70%',
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 10
    },
    initialsContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    temperatureContainer: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    temperatureNumbers: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    others: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    wind: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    visibility: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
});
