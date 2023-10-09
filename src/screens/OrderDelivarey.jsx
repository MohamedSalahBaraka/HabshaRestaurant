import {
    SafeAreaView,
    Text,
    TextInput,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Alert
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import barakocta from "../../Styles/barakocta";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BaseUrl } from "../config";
import NoNetwork from "../modals/noNetwork";
import IsErrorModal from "../modals/IsErrorModal";


export default function OrderDelivarey({ navigation }) {

    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const [cities, setcities] = useState([]);
    const [city, setcity] = useState();
    const [title, settitle] = useState();
    const [neighbourhood, setneighbourhood] = useState();
    const [details, setdetails] = useState();
    const [phone, setphone] = useState();
    const [name, setname] = useState();
    const [citysent, setcitysent] = useState();
    const [neighbourhoodsent, setneighbourhoodsent] = useState();
    const [detailssent, setdetailssent] = useState();
    const [phonesent, setphonesent] = useState();
    const [namesent, setnamesent] = useState();
    const [isFetchDataError, setIsFetchDataError] = useState(false);
    const [isError, setIsError] = useState(false);
    const [delivaryPrice, setdelivaryPrice] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const sendForm = () => {
        if (typeof city == "undefined" || city == "") {
            Alert.alert("خطأ", "عليك اختيار مدينة");
            return;
        }
        if (typeof neighbourhood == "undefined" || neighbourhood == "") {
            Alert.alert("خطأ", "عليك اضافة الحي التسلم");
            return;
        }
        if (typeof citysent == "undefined" || citysent == "") {
            Alert.alert("خطأ", "عليك اضافة رقم الهاتف");
            return;
        } if (typeof neighbourhoodsent == "undefined" || neighbourhoodsent == "") {
            Alert.alert("خطأ", "عليك اضافة حي التسليم");
            return;
        }
        setIsLoading(true);
        setIsError(false);
        console.log("OrderDelivary sendForm");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        const bodyParameters = {
            package: title,
            nameGet: name,
            neighbourhoodGet: neighbourhood,
            cityGet: city,
            detailsGet: details,
            phoneGet: phone,
            nameSent: namesent,
            neighbourhoodSent: neighbourhoodsent,
            citySent: citysent,
            detailsSent: detailssent,
            phoneSent: phonesent,
        };
        axios
            .post(`${BaseUrl}cart/PlaceADelivary`, bodyParameters, config)
            .then((response) => {
                navigation.navigate("DelivareyFormerOrders");
                setIsLoading(false);

            })
            .catch(async (e) => {
                setIsLoading(false);
                setIsError(true);
                console.log("OrderDelivary", e?.response?.data.message);
                console.log("OrderDelivary", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
                // navigation.navigate("Faild");
            });
    };
    const GetCities = () => {
        setIsFetchDataError(false);
        console.log("OrderDelivary GetCities");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}profile/getAddressDelivary`, config)
            .then((response) => {
                setcities(response.data.cities);
                setcity(response.data.cities[0]?.id);
                setcitysent(response.data.cities[0]?.id);
                GetDelivaryPrice(response.data.cities[0]?.id, response.data.cities[0]?.id);
                if (response.data.address) {
                    setcity(response.data.address.city_id);
                    setneighbourhood(response.data.address.neighbourhood);
                    setdetails(response.data.address.details);
                    setname(response.data.address.name);
                    setphone(response.data.address.phone);
                }
                if (response.data.addressSent) {
                    setneighbourhoodsent(response.data.address.neighbourhood);
                    setdetailssent(response.data.address.details);
                    setcitysent(response.data.address.city_id);
                    setnamesent(response.data.address.name);
                    setphonesent(response.data.address.phone);
                }
                setIsLoaded(true);
                setIsLoading(false);
                setIsError(false);
            })
            .catch(async (e) => {
                setIsFetchDataError(true);
                console.log("GetCities", e?.response?.data.message);
                console.log("GetCities", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }

            });
    };
    const GetDelivaryPrice = (city, citysent) => {
        console.log("OrderDelivary GetDelivaryPrice");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        const bodyParameters = {
            citySent: citysent,
            cityGet: city,
        };
        console.log(bodyParameters);
        axios
            .post(`${BaseUrl}cart/delivary/delivaryPrice`, bodyParameters, config)
            .then((response) => {
                console.log(response.data);
                setdelivaryPrice(response.data.price);

            })
            .catch(async (e) => {
                console.log("GetDelivaryPrice", e?.response?.data.message);
                console.log("GetDelivaryPrice", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }

            });
    }
    const renderCities = cities?.map((item, index) => {
        return (
            <Picker.Item label={item.name} value={item.id} key={item.id} />
        );
    });
    const networkback = () => {
        if (!isLoaded)
            GetCities();
    }
    useEffect(() => {
        console.log("CheckOut");
        GetCities();
    }, []);
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
    return (
        <SafeAreaView
            style={[barakocta.fFill]}
        >
            <NoNetwork networkback={networkback} />
            <IsErrorModal isModalVisible={isFetchDataError} CallBack={GetCities} />
            <IsErrorModal isModalVisible={isError} CallBack={sendForm} />
            {isLoaded ? (
                <>
                    <ScrollView>
                        <View style={[{ height: Dimention.height * 0.4, borderBottomEndRadius: Dimention.height * 0.1, borderBottomStartRadius: Dimention.height * 0.1, width: '100%', backgroundColor: Colors.primary }]}>

                            <Image
                                source={require('../../assets/Delivery-bro.png')}
                                resizeMode={"contain"}
                                style={[barakocta.mxAuto, { width: Dimention.height * 0.35, height: Dimention.height * 0.35 }, barakocta.my0, barakocta.p0]} />
                        </View>
                        <View style={[{ backgroundColor: Colors.fourth, borderRadius: 20, }, barakocta.pt3, barakocta.px2, barakocta.positionRelative, barakocta.m4, { top: -100 }]}>
                            <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>أضف طلبية جديدة</Text>
                            <View
                                style={[
                                    barakocta.jcCenter,
                                    barakocta.mt3,
                                    barakocta.mb0,
                                    barakocta.aiCenter,
                                ]}
                            >
                                <Text style={[{ fontFamily: 'Cairo' }]}>المنقول</Text>
                                <TextInput
                                    value={title}
                                    onChangeText={settitle}
                                    style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75]} />
                            </View>
                            <View style={[, barakocta.fRow, barakocta.jcBetween, barakocta.aiCenter]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('AdressList', { setphone: setphonesent, setcity: setcitysent, setneighbourhood: setneighbourhoodsent, setdetails: setdetailssent, setname: setnamesent });
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/icons8-address-100.png')}
                                        resizeMode={"contain"}
                                        style={[barakocta.mxAuto, { width: 50, height: 50 }, barakocta.my0, barakocta.p0]} />
                                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 10 },]}>عنوان سابق</Text>
                                </TouchableOpacity>
                                <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 16 },]}>عنوان التسليم:</Text>
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
                                    selectedValue={citysent}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setcitysent(itemValue);
                                        GetDelivaryPrice(city, itemValue);
                                    }}
                                >
                                    {renderCities}
                                </Picker>
                                <Text style={[{ fontFamily: 'Cairo' }]}>الحي</Text>
                                <TextInput
                                    value={neighbourhoodsent}
                                    onChangeText={setneighbourhoodsent}
                                    style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb0,]} />
                                <Text style={[{ fontFamily: 'Cairo' }]}>تفاصيل اضافية للعنوان(اختياري)</Text>
                                <TextInput
                                    value={detailssent}
                                    onChangeText={setdetailssent}
                                    style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb0,]}
                                    multiline={true}
                                    numberOfLines={4} />
                                <Text style={[{ fontFamily: 'Cairo' }]}>اسم المستلم</Text>
                                <TextInput
                                    value={namesent}
                                    onChangeText={setnamesent}
                                    style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb0,]} />
                                <Text style={[{ fontFamily: 'Cairo' }]}>رقم هاتف المستلم</Text>
                                <TextInput
                                    value={phonesent}
                                    keyboardType="numeric"
                                    onChangeText={setphonesent}
                                    style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb0,]} />
                            </View>
                            <Text style={[barakocta.colorDanger]}>سعر التوصيل :{delivaryPrice}</Text>
                            <TouchableOpacity
                                style={[{ backgroundColor: Colors.secondary, width: Dimention.height * 0.17, height: Dimention.height * 0.17, borderRadius: 30 }, barakocta.mxAuto]}
                                onPress={() => {
                                    sendForm();
                                }}
                            >
                                <Image
                                    source={require('../../assets/icons8-delivery-80.png')}
                                    resizeMode={"contain"}
                                    style={[barakocta.mxAuto, { width: 100, height: 100 }, barakocta.my0, barakocta.p0]} />
                                <Text style={[barakocta.tCenter, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 16 },]}>ارسل الطلب</Text>
                            </TouchableOpacity>
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
                </>) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <ActivityIndicator size={"large"} color={Colors.primary} />
                </View>
            )
            }
        </SafeAreaView>
    );
}
