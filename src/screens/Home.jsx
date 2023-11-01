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
    Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import barakocta from "../../Styles/barakocta";
import axios from "axios";
import { BaseUrl, ImageUrl } from "../config";
import { AuthContext } from "../context/AuthContext";
import NoNetwork from "../modals/noNetwork";
import IsErrorModal from "../modals/IsErrorModal";

export default function Home({ navigation }) {
    const { Dimention, Colors, userToken, setColors, user, setUser, logout } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orders, setorders] = useState();
    const [sitename, setsitename] = useState();
    const [logo, setlogo] = useState();
    const [price, setprice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchDataError, setIsFetchDataError] = useState(false);
    const [IsordercancelError, setIsordercancelError] = useState(false);
    const [isOrderprogressError, setIsOrderprogressError] = useState(false);
    const [orderid, setorderid] = useState(false);
    const Loading = () => {
        if (isLoading)
            return (
                <>
                    <View style={[barakocta.positionAbsolute, barakocta.w100, barakocta.h100, barakocta.bgMuted, barakocta.opacity75]}></View>
                    <View style={[barakocta.positionAbsolute, barakocta.w100, barakocta.h100, barakocta.jcCenter, barakocta.aiCenter]}>
                        <Text style={[barakocta.colorLight, barakocta.t6, { fontFamily: 'Cairo' }]}>جاري التحميل... </Text>
                    </View>
                </>
            )
    }
    const orderCancel = (id) => {
        setorderid(id)
        setIsordercancelError(false);
        setIsLoading(true);

        console.log("HOME ordercancel");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}cart/ordercancel/${id}`, config)
            .then((response) => {
                console.log("HOME ordercancelTHEN");
                Alert.alert('تم', 'تم الإلغاء بنجاح');
                fetchData();
            })
            .catch(async (e) => {
                setIsordercancelError(true);
                setIsLoading(false);
                console.log("HOME", e?.response?.data.message);
                console.log("HOME", e?.response?.status);
                console.log("HOME", e?.response?.data);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    const orderProgress = (id) => {
        setorderid(id)
        setIsOrderprogressError(false);
        setIsLoading(true);

        console.log("HOME orderProgress");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}cart/orderProgress?id=${id}`, config)
            .then((response) => {
                console.log("HOME orderProgressTHEN");
                fetchData();
            })
            .catch(async (e) => {
                setIsOrderprogressError(true);
                setIsLoading(false);
                console.log("HOME", e?.response?.data.message);
                console.log("HOME", e?.response?.status);
                console.log("HOME", e?.response?.data);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    const fetchData = () => {
        console.log("HOME FETCHDATA");
        setIsFetchDataError(false)
        setIsLoading(true);
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}show/homeRestaurant`, config)
            .then((response) => {
                console.log("HOME FETCHDATA Then");
                let pcolor = '#FFCA3A';
                let scolor = '#F97068';
                if (response.data.setting.primaryColor)
                    pcolor = response.data.setting.primaryColor;
                if (response.data.setting.secondaryColor)
                    scolor = response.data.setting.secondaryColor;
                setColors({
                    primary: pcolor,
                    secondary: scolor,
                    tertiary: '#010400',
                    fourth: '#FFFBFC',
                })
                setUser(response.data.user);
                setorders(response.data.orders);
                setprice(response.data.price);
                setsitename(response.data.setting.sitename);
                setlogo(ImageUrl + response.data.setting.logo);
                setIsLoaded(true);
                setIsLoading(false);
            })
            .catch(async (e) => {
                setIsFetchDataError(true)
                setIsLoading(false);
                console.log("HOME", e?.response?.data);
                console.log("HOME", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    const showCancelDialog = (id) => {
        return Alert.alert(
            "هل انت متأكد؟",
            "هل انت متاكد من الغاء الطلب",
            [
                // The "Yes" button
                {
                    text: "الغاء",
                    onPress: () => {
                        orderCancel(id);
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "تراجع",
                },
            ]
        );
    };
    const showConfirmDialog = (id) => {
        return Alert.alert(
            "هل انت متأكد؟",
            "هل انت متاكد تسجيل التقدم في الطلب",
            [
                // The "Yes" button
                {
                    text: "تقدم",
                    onPress: () => {
                        orderProgress(id);
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "تراجع",
                },
            ]
        );
    };
    useEffect(() => {
        console.log("home");
        fetchData();
    }, []);
    const renderorders = orders?.map((cb, index) => {
        return (
            <Order Colors={Colors}
                Cancel={() => {
                    showCancelDialog(cb.id);
                }}
                key={index} Dimention={Dimention} id={cb.id} count={cb.count} price={cb.total} captin={cb.delivary?.captin} status={cb.status} navigation={navigation} onPress={() => {
                    showConfirmDialog(cb.id);
                }} />
        );
    });
    const networkback = () => {
        if (!isLoaded)
            fetchData();
    }
    return (
        <SafeAreaView
            style={[barakocta.fFill]}
        ><IsErrorModal isModalVisible={isFetchDataError} CallBack={fetchData} />
            <IsErrorModal isModalVisible={isOrderprogressError} CallBack={() => {
                orderProgress(orderid);
            }} />
            <IsErrorModal isModalVisible={IsordercancelError} CallBack={() => {
                orderCancel(orderid);
            }} />

            <NoNetwork networkback={networkback} />
            <ScrollView>
                <View style={[{ height: Dimention.height * 0.2, borderBottomEndRadius: Dimention.height * 0.1, borderBottomStartRadius: Dimention.height * 0.1, width: '100%', backgroundColor: Colors.primary }]}></View>
                <View style={[{ backgroundColor: Colors.fourth, borderRadius: 20, }, barakocta.positionRelative, barakocta.m4, { top: -100 }]} >
                    <Image
                        source={{ uri: logo }}
                        resizeMode={"contain"}
                        style={[barakocta.mxAuto, { width: Dimention.height * 0.17, height: Dimention.height * 0.17 }, barakocta.my0, barakocta.p0]} />
                    <Text style={[barakocta.tCenter, { color: Colors.tertiary, fontFamily: 'ElMessiri', fontSize: 24 },]}>{sitename}</Text>
                </View>
                <View style={[barakocta.positionRelative, barakocta.p2, { top: -80 }]}>
                    <View style={[barakocta.fRow, barakocta.mb3, barakocta.jcAround, barakocta.aiCenter]}>
                        {price > 0 ? (<View style={[barakocta.fRow, barakocta.p2, { borderWidth: 1, borderRadius: 10, borderColor: Colors.secondary }]}>
                            <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 10, },]}>جنيه</Text>
                            <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 14, },]}>{price}</Text>
                        </View>) : null}
                        <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 14, },]}>اهلا {user?.name}</Text>
                    </View>
                    <TouchableOpacity style={[barakocta.btnInfo, barakocta.p3, barakocta.m2, barakocta.br3, { alignSelf: 'center' }]}
                        onPress={() => {
                            fetchData()
                        }}>
                        <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 14, },]}>تحديث</Text>
                    </TouchableOpacity>
                    <View style={[{ backgroundColor: Colors.fourth, borderRadius: 20, }]} >
                        {renderorders}
                    </View>
                </View>
            </ScrollView>
            <Loading />
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
        </SafeAreaView >
    );
}
const Order = ({ Colors, onPress, Cancel, Dimention, status, navigation, id, count, price, captin }) => {
    return (
        <View style={[{ borderBottomWidth: 1, borderBottomColor: Colors.tertiary, borderStyle: "dashed" }, barakocta.w100, barakocta.jcEnd, barakocta.aiCenter]}>
            <View style={[barakocta.fRow, barakocta.my2]}>

                <TouchableOpacity onPress={Cancel} style={[barakocta.jcCenter, barakocta.aiCenter, { width: Dimention.width * 0.12, }]}>
                    <AntDesign name="close" size={24} color={Colors.tertiary} />
                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 },]}>الغاء</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress} style={[barakocta.jcCenter, barakocta.aiCenter, { width: Dimention.width * 0.2, }]}>
                    <AntDesign name="left" size={24} color={Colors.tertiary} />
                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 },]}>{status}</Text>
                </TouchableOpacity>
                <View style={[{ width: Dimention.width * 0.45 }]} >
                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 16 },]}>رقم الطلب: #{count}</Text>
                    <View style={[barakocta.fRow, barakocta.mlAuto]}>
                        <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 8, },]}>جنيه</Text>
                        <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 12, },]}>{price}</Text>
                    </View>
                    {captin ?
                        <Text style={[barakocta.tCenter, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12 },]}>{captin.name} - {captin.phone}</Text> : null}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('OrderDetails', { id });
                    }}
                    style={[barakocta.px3]}>
                    <Image
                        source={require('../../assets/icons8-restaurant-80.png')}
                        resizeMode={"contain"}
                        style={[{ width: 50, height: 50 }]} />
                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 },]}>التفاصيل</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}