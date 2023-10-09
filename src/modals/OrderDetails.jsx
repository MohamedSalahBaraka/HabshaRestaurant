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
    Pressable,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import barakocta from "../../Styles/barakocta";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BaseUrl, ImageUrl } from "../config";
import NoNetwork from "./noNetwork";
import IsErrorModal from "./IsErrorModal";

const Dish = ({ Colors, Dimention, photo, count, price, title, category, sizename }) => {
    return (
        <View style={[{ borderBottomWidth: 1, borderBottomColor: Colors.tertiary, borderStyle: "dashed" }, barakocta.w100, barakocta.jcEnd, barakocta.aiCenter]}>
            <View style={[barakocta.fRow]}>
                <View style={[{ width: Dimention.width * 0.55 }]} >
                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 16 },]}>{title}</Text>
                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 },]}>{category}-{sizename}</Text>
                </View>
                <View style={[barakocta.px3]}>
                    <Image
                        source={{ uri: photo }}
                        resizeMode={"contain"}
                        style={[barakocta.mxAuto, { width: Dimention.width * 0.17, height: Dimention.width * 0.17 }, barakocta.my0, barakocta.p0]} />
                </View>
            </View>
            <View style={[barakocta.fRow, barakocta.mb0, barakocta.jcBetween, barakocta.w100, barakocta.px2]}>
                <View style={[barakocta.fRow]}>
                    <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 8, },]}>جنيه</Text>
                    <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>{price}</Text>
                </View>
                <View style={[barakocta.fRow]}>
                    <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>{count}</Text>
                    <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>العدد:</Text>
                </View>
            </View>
        </View>
    )
}

export default function OrderDetails({ navigation, route }) {

    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = route.params ? route.params : {};
    const [dishes, setdishes] = useState();
    const [total, settotal] = useState();
    const [isFetchDataError, setIsFetchDataError] = useState(false);
    const [Fee, setFee] = useState();
    const fetchData = () => {
        setIsFetchDataError(false)
        console.log("Dish FETCHDATA");
        const config = {
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}show/order/${id}`, config)
            .then((response) => {
                console.log("Dish FETCHDATA THRN");

                setdishes(response.data.order.dish_order);
                settotal(response.data.order.total);
                setFee(response.data.order.fee);
                console.log(response.data.order);
                setIsLoaded(true);
            })
            .catch(async (e) => {
                setIsFetchDataError(true)
                console.log("Dish", e?.response?.data.message);
                console.log("Dish", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    useEffect(() => {
        console.log("Dish");
        fetchData();
    }, []);
    const networkback = () => {
        if (!isLoaded)
            fetchData
    }
    const renderdishes = dishes?.map((item, index) => {
        return (
            <Dish Colors={Colors} photo={ImageUrl + item.dish?.photo} key={index} Dimention={Dimention} title={item.dish?.name} category={item.dish?.category?.name} price={item.price} sizename={item.size?.name} count={item.count} />
        );
    });
    return (
        <SafeAreaView
            style={[barakocta.fFill]}
        >
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'transparent', }}>
                <Pressable onPress={() => {
                    navigation.goBack()
                }} style={[{ height: "60%", width: '100%', position: 'relative', top: 27, backgroundColor: Colors.tertiary, opacity: 0.15 }]}></Pressable>
                <View style={[{ height: "50%", width: '100%', overflow: 'hidden', backgroundColor: Colors.fourth, borderTopEndRadius: 50, borderTopStartRadius: 50 }]}>
                    <NoNetwork networkback={networkback} />
                    <IsErrorModal isModalVisible={isFetchDataError} CallBack={fetchData} />
                    {isLoaded ? (
                        <ScrollView style={[barakocta.p2, barakocta.pt4]}>
                            <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>تفاصيل الطلب</Text>
                            <View style={[barakocta.fRow, barakocta.mt4, barakocta.jcBetween, barakocta.w100, barakocta.px2]}>
                                <View style={[barakocta.fRow]}>
                                    <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 8, },]}>جنيه</Text>
                                    <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>{total}</Text>
                                </View>
                                <View style={[barakocta.fRow]}>
                                    <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>المبلغ الكلي:</Text>
                                </View>
                            </View>
                            <View style={[barakocta.fRow, barakocta.mt4, barakocta.jcBetween, barakocta.w100, barakocta.px2]}>
                                <View style={[barakocta.fRow]}>
                                    <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 8, },]}>جنيه</Text>
                                    <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>{Fee}</Text>
                                </View>
                                <View style={[barakocta.fRow]}>
                                    <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>نصيب التطبيق:</Text>
                                </View>
                            </View>
                            {renderdishes}
                            <View style={{ height: 50 }}></View>
                        </ScrollView>
                    ) : (
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
                    )}
                </View>
            </View>
        </SafeAreaView >
    );
}
