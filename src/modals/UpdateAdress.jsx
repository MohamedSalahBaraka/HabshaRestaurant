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
    Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import barakocta from "../../Styles/barakocta";
import { BaseUrl } from "../config";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import NoNetwork from "./noNetwork";
import IsErrorModal from "./IsErrorModal";


export default function UpdateAdress({ navigation, route }) {

    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const { type } = route.params ? route.params : {};
    const [isLoaded, setIsLoaded] = useState(false);
    const [cities, setcities] = useState([]);
    const [city, setcity] = useState();
    const [neighbourhood, setneighbourhood] = useState();
    const [details, setdetails] = useState();
    const [phone, setphone] = useState();
    const [name, setname] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchDataError, setIsFetchDataError] = useState(false);
    const [isError, setIsError] = useState(false);
    const networkback = () => {
        if (!isLoaded)
            fetchData();
    }
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
    const sendForm = () => {
        if (typeof city == "undefined" || city == "") {
            Alert.alert("خطأ", "عليك اختيار مدينة");
            return;
        }
        if (typeof neighbourhood == "undefined" || neighbourhood == "") {
            Alert.alert("خطأ", "عليك اضافة الحي التسلم");
            return;
        }
        setIsLoading(true);
        setIsError(false);
        console.log("CheakOut sendForm");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        const bodyParameters = {
            name,
            neighbourhood,
            city,
            details,
            phone,
            type
        };
        console.log(bodyParameters);
        axios
            .post(`${BaseUrl}profile/updateAddress`, bodyParameters, config)
            .then((response) => {
                navigation.goBack();

                setIsLoading(false);
            })
            .catch(async (e) => {
                setIsLoading(false);
                setIsError(true);
                console.log("CheakOut", e?.response?.data.message);
                console.log("CheakOut", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
                // navigation.navigate("Faild");
            });
    };
    const fetchData = () => {
        setIsFetchDataError(false);
        console.log("Dish FETCHDATA");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        let bodyParameters = {
            type,
        };
        axios
            .post(`${BaseUrl}profile/getAddress`, bodyParameters, config)
            .then((response) => {
                setcities(response.data.cities);
                console.log(response.data);
                if (response.data.address) {
                    setneighbourhood(response.data.address.neighbourhood);
                    setdetails(response.data.address.details);
                    setcity(response.data.address.city_id);
                    setname(response.data.address.name);
                    setphone(response.data.address.phone);
                }
                setIsLoaded(true);
            })
            .catch(async (e) => {
                setIsFetchDataError(true);
                console.log("Dish", e?.response?.data.message);
                console.log("Dish", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    const renderCities = cities?.map((item, index) => {
        return (
            <Picker.Item label={item.name} value={item.id} key={item.id} />
        );
    });
    useEffect(() => {
        console.log("Dish");
        fetchData();
    }, []);
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
                    <IsErrorModal isModalVisible={isError} CallBack={sendForm} />
                    {isLoaded ? (
                        <>
                            <ScrollView style={[barakocta.p2, barakocta.pt4]}>
                                <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>العنوان الافتراضي</Text>
                                <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12 },]}>ان كنت ستقوم بالكثير من الطلبات تعين عنوان افتراضي سيكون مفيداً، لا تقلق يمكنك دائما معاينته والتعديل عليه قبل ارسال الطلب</Text>
                                <View style={[barakocta.fRow, barakocta.jcBetween, barakocta.aiCenter]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('AdressList', { setphone, setcity, setneighbourhood, setdetails, setname });
                                        }}
                                    >
                                        <Image
                                            source={require('../../assets/icons8-address-100.png')}
                                            resizeMode={"contain"}
                                            style={[barakocta.mxAuto, { width: 50, height: 50 }, barakocta.my0, barakocta.p0]} />
                                        <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 10 },]}>عنوان سابق</Text>
                                    </TouchableOpacity>
                                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 16 },]}>عنوان التوصيل:</Text>
                                </View>
                                <View
                                    style={[
                                        barakocta.jcCenter,
                                        barakocta.mb0,
                                        barakocta.aiCenter,
                                    ]}
                                >
                                    <Text style={[{ fontFamily: 'Cairo' }]}>المدينة</Text>
                                    <Picker
                                        style={[
                                            barakocta.bgLight,
                                            barakocta.w75,
                                            barakocta.mxAuto,
                                            barakocta.br1,
                                            barakocta.mb0
                                        ]}
                                        selectedValue={city}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setcity(itemValue);
                                        }}
                                    >
                                        {renderCities}
                                    </Picker>
                                    <Text style={[{ fontFamily: 'Cairo' }]}>الحي</Text>
                                    <TextInput
                                        value={neighbourhood}
                                        onChangeText={setneighbourhood}
                                        style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb0,]} />
                                    <Text style={[{ fontFamily: 'Cairo' }]}>تفاصيل اضافية للعنوان(اختياري)</Text>
                                    <TextInput
                                        value={details}
                                        onChangeText={setdetails}
                                        style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb0,]}
                                        multiline={true}
                                        numberOfLines={4} />
                                    <Text style={[{ fontFamily: 'Cairo' }]}>اسم</Text>
                                    <TextInput
                                        value={name}
                                        onChangeText={setname}
                                        style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb0,]} />
                                    <Text style={[{ fontFamily: 'Cairo' }]}>رقم هاتف</Text>
                                    <TextInput
                                        value={phone}
                                        keyboardType="numeric"
                                        onChangeText={setphone}
                                        style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb0,]} />
                                </View>
                                <TouchableOpacity
                                    style={[{ backgroundColor: Colors.secondary, borderRadius: 30 }, barakocta.p3, barakocta.m2, barakocta.mxAuto]}
                                    onPress={() => {
                                        sendForm();
                                    }}
                                >
                                    <Text style={[barakocta.tCenter, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 16 },]}>احفظ</Text>
                                </TouchableOpacity>
                                <View style={{ height: 50 }}></View>
                            </ScrollView>
                            <Loading />
                        </>
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
            </View >
        </SafeAreaView >
    );
}
