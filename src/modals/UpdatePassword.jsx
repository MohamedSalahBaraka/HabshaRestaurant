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
import axios from "axios";
import { BaseUrl } from "../config";
import { AuthContext } from "../context/AuthContext";
import NoNetwork from "./noNetwork";
import IsErrorModal from "./IsErrorModal";


export default function UpdatePassword({ navigation }) {

    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confiremNewPassword, setConfiremNewPassword] = useState();
    const [responce, setResponce] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const networkback = () => {

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
        setIsLoading(true);
        setIsError(false);
        if (typeof oldPassword == "undefined" || oldPassword == "") {
            Alert.alert("خطأ", "عليك اضافة كلمة السر القديمة");
            return;
        }
        if (typeof newPassword == "undefined" || newPassword == "") {
            Alert.alert("خطأ", "عليك اضافة كلمة السر الجديدة");
            return;
        }
        if (typeof confiremNewPassword == "undefined" || confiremNewPassword == "") {
            Alert.alert("خطأ", "عليك تأكيد كلمة السر");
            return;
        }
        if (newPassword == confiremNewPassword) {
            let data = new FormData();
            data.append("old_password", oldPassword);
            data.append("new_password", newPassword);

            const config = {
                timeout: 10000,
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "multipart/form-data",
                },
            };
            axios
                .post(`${BaseUrl}profile/changePassword`, data, config)
                .then((response) => {
                    Alert.alert('تم', "تم تغير كلمة السر بنجاح");
                    setIsLoading(false);
                    navigation.goBack();
                })
                .catch((e) => {
                    setIsLoading(false);
                    setIsError(true);
                    console.log(e);
                    console.log(e?.response?.data);

                    if (e?.response?.status == 401) {
                        logout();
                        return
                    }
                    if (e?.response?.status == 403) {
                        setResponce(e?.response?.data.message);
                        return
                    }
                    // navigation.navigate("Faild");
                });
        } else {
            Alert.alert('خطأ', "كلمة السر الجديدة غير متطابقة مع التأكيد");
            setNewPassword("");
            setConfiremNewPassword("");
            setOldPassword("");
            setIsLoading(false);
        }
    };
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
                    <IsErrorModal isModalVisible={isError} CallBack={sendForm} />


                    <ScrollView style={[barakocta.p3]}>
                        <Text style={[barakocta.tRight, barakocta.mb3, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>غير كلمة السر</Text>
                        <Text style={[{ fontFamily: 'Cairo' }]}>كلمة السر السابقة</Text>
                        <TextInput
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            secureTextEntry={true}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb3,]} />
                        <Text style={[barakocta.colorDanger]}>{responce}</Text>
                        <Text style={[{ fontFamily: 'Cairo' }]}>كلمة السر الجديدة</Text>
                        <TextInput
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb3,]} />
                        <Text style={[{ fontFamily: 'Cairo' }]}>أكد كلمة السر</Text>
                        <TextInput
                            value={confiremNewPassword}
                            onChangeText={setConfiremNewPassword}
                            secureTextEntry={true}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb3,]} />
                        <TouchableOpacity
                            style={[barakocta.p3, { backgroundColor: Colors.secondary, width: Dimention.height * 0.17, borderRadius: 30 }, barakocta.mxAuto]}
                            onPress={() => {
                                sendForm();
                            }}
                        >
                            <Text style={[barakocta.tCenter, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 16 },]}>حفظ</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <Loading />
                </View>
            </View>
        </SafeAreaView >
    );
}
