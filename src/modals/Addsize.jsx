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
import barakocta from "../../Styles/barakocta";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BaseUrl } from "../config";
import NoNetwork from "./noNetwork";
import IsErrorModal from "./IsErrorModal";


export default function Addsize({ navigation, route }) {

    const [name, setname] = useState();
    const [price, setprice] = useState();
    const { setsizes, sizes, id, send } = route.params ? route.params : {};
    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
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
        setIsError(false)
        if (typeof name == "undefined" || name == "") {
            Alert.alert("خطأ", "عليك اضافة الأسم");
            return;
        }
        if (typeof price == "undefined" || price == "") {
            Alert.alert("خطأ", "عليك اضافة السعر");
            return;
        }
        setIsLoading(true);
        console.log("CheakOut sendForm");
        const config = {
            headers: { Authorization: `Bearer ${userToken}` },
        };
        const bodyParameters = {
            name,
            price,
            dish_id: id
        };
        axios
            .post(`${BaseUrl}show/sizeStore`, bodyParameters, config)
            .then((response) => {
                navigation.goBack();
                setIsLoading(false);

            })
            .catch(async (e) => {
                setIsLoading(false);
                setIsError(true)
                console.log("CheakOut", e?.response?.data.message);
                console.log("CheakOut", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
                // navigation.navigate("Faild");
            });
    };
    const networkback = () => { }
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
                    <IsErrorModal CallBack={sendForm} isModalVisible={isError} />
                    <ScrollView style={[barakocta.p3, barakocta.pt4]}>
                        <Text style={[barakocta.tRight, barakocta.mb3, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>اضافة حجم</Text>
                        <Text style={[{ fontFamily: 'Cairo' }]}>الاسم</Text>
                        <TextInput
                            value={name}
                            onChangeText={setname}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb2,]} />
                        <Text style={[{ fontFamily: 'Cairo' }]}>السعر</Text>
                        <TextInput
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setprice}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb2,]} />

                        <TouchableOpacity
                            style={[barakocta.p3, { backgroundColor: Colors.secondary, width: Dimention.height * 0.17, borderRadius: 30 }, barakocta.mxAuto]}
                            onPress={() => {
                                console.log(sizes);
                                let si = [...sizes, { name, price }];
                                setsizes(si);
                                if (send) {
                                    sendForm();
                                }
                                else {
                                    navigation.goBack()
                                }
                            }}
                        >
                            <Text style={[barakocta.tCenter, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 16 },]}>حفظ</Text>
                        </TouchableOpacity>

                        <View style={{ height: 50 }}></View>
                    </ScrollView>
                    <Loading />
                </View>
            </View >
        </SafeAreaView >
    );
}
