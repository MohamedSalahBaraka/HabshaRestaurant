import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Text,
    TextInput,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import barakocta from "../../Styles/barakocta";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BaseUrl } from "../config";
import NoNetwork from "../modals/noNetwork";
import IsErrorModal from "../modals/IsErrorModal";

export default function FoodFormerOrders({ navigation }) {

    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const [orders, setorders] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFetchDataError, setIsFetchDataError] = useState(false);
    const renderOrders = orders?.map((item, index) => {
        let date = new Date(item.created_at);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let publish = `${year}-${month}-${day}`;
        return (
            <Order Colors={Colors}
                status={item.status}
                price={item.total}
                navigation={navigation}
                id={item.id}
                key={index}
                captin={item.delivary?.captin}
                date={publish}
                title={item.restaurant?.name}
            />

        );
    });
    const fetchData = () => {
        setIsFetchDataError(false);
        console.log("FoodFormerOrders FETCHDATA");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}cart/formersOrderrestaurant`, config)
            .then((response) => {
                console.log(response.data);
                setorders(response.data.orders);
                setIsLoaded(true);
            })
            .catch(async (e) => {
                setIsFetchDataError(true);
                console.log("FoodFormerOrders", e?.response?.data.message);
                console.log("FoodFormerOrders", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    useEffect(() => {
        console.log("FoodFormerOrders");
        fetchData();
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);
    const networkback = () => {
        if (!isLoaded)
            fetchData();
    }
    return (
        <SafeAreaView
            style={[barakocta.fFill]}
        >

            <NoNetwork networkback={networkback} />
            <IsErrorModal isModalVisible={isFetchDataError} CallBack={fetchData} />
            {isLoaded ? (
                <>
                    <ScrollView>
                        <View style={[barakocta.jcCenter, { height: Dimention.height * 0.4, borderBottomEndRadius: Dimention.height * 0.1, borderBottomStartRadius: Dimention.height * 0.1, width: '100%', backgroundColor: Colors.primary }]}>

                            <Image
                                source={require('../../assets/Drive-thru-pana.png')}
                                resizeMode={"contain"}
                                style={[barakocta.mxAuto, { width: Dimention.height * 0.3, height: Dimention.height * 0.3 }, barakocta.my0, barakocta.p0]} />
                        </View>
                        <View style={[{ backgroundColor: Colors.fourth, borderRadius: 20, }, barakocta.pt3, barakocta.px2, barakocta.positionRelative, barakocta.m4, { top: -100 }]} >
                            <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>الطلبات السابقة:</Text>
                            {renderOrders}
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={[barakocta.positionAbsolute, { right: 20, top: 30, }]}
                        onPress={() => {
                            navigation.toggleDrawer();
                            // navigation.navigate('MyModal');
                        }}>
                        <Image
                            source={require('../../assets/icons8-bars-96.png')}
                            resizeMode={"contain"}
                            style={[barakocta.mxAuto, { width: 50, height: 50 }, barakocta.my0, barakocta.p0]} />
                    </TouchableOpacity>
                </>) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }} >
                    <ActivityIndicator size={"large"} color={Colors.primary} />
                </View>
            )
            }
        </SafeAreaView >
    );
}
const Order = ({ Colors, status, navigation, title, id, captin, price, date }) => {
    return (
        <View style={[barakocta.w100, barakocta.my2, { borderWidth: 1, borderColor: Colors.tertiary, borderStyle: 'dotted', borderRadius: 15 }, barakocta.p2]}>
            <Text style={[barakocta.tRight, { color: Colors.secondary, fontFamily: 'Cairo', fontSize: 16 },]}>{title}</Text>
            <View style={[barakocta.fRow]}>
                <View style={[barakocta.col6]}>
                    <TouchableOpacity
                        style={[barakocta.jcEnd, { width: 100 }, barakocta.fRow]}
                        onPress={() => {
                            // navigation.toggleDrawer();
                            navigation.navigate('OrderDetails', { id });
                        }}>
                        <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 10, },]}>التفاصيل</Text>
                        <Image
                            source={require('../../assets/icons8-restaurant-80.png')}
                            resizeMode={"contain"}
                            style={[{ width: 20, height: 20 }]} />

                    </TouchableOpacity>
                </View>
                <View style={[barakocta.col6, barakocta.fRow]}>
                    <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 8, },]}>جنيه</Text>
                    <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>{price}</Text>
                </View>
            </View>
            {captin ?
                <Text style={[barakocta.tCenter, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12 },]}>{captin.name} - {captin.phone}</Text> : null}
            <View style={[barakocta.fRow, barakocta.jcBetween, barakocta.p2]}>
                <Text style={[barakocta.tRight, { color: Colors.secondary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 },]}>{status}</Text>
                <Text style={[barakocta.tRight, { color: Colors.secondary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 },]}>{date}</Text>

            </View>
        </View>
    )
}