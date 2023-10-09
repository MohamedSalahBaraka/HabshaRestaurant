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
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BaseUrl, ImageUrl } from "../config";
import NoNetwork from "./noNetwork";
import IsErrorModal from "./IsErrorModal";


export default function UpdateInfo({ navigation }) {

    const { Dimention, Colors, userToken, logout, user, setUser, save } = useContext(AuthContext);
    const [phone, setphone] = useState(user?.phone);
    const [name, setname] = useState(user?.name);
    const [PhoneError, setPhoneError] = useState();
    const [PickedImagePath, setPickedImagePath] = useState();
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
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        // Explore the result
        console.log(result);

        if (!result.canceled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.canceled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }
    const getuser = () => {
        console.log("DISh getuser");
        const config = {
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}user`, config)
            .then((response) => {

                setUser(response.data.user);
                Alert.alert('تم', "تم تحديث البيانات بنجاح");
                setIsLoading(false);
                navigation.goBack();
            })
            .catch(async (e) => {
                console.log("DISh", e?.response?.data.message);
                console.log("DISh", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    const sendForm = () => {
        setIsError(false)
        if (typeof name == "undefined" || name == "") {
            Alert.alert("خطأ", "عليك اضافة الاسم");
            return;
        }
        if (typeof phone == "undefined" || phone == "") {
            Alert.alert("خطأ", "عليك اضافة رقم الهاتف");
            return;
        }
        setIsLoading(true);
        console.log("CheakOut sendForm");
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "multipart/form-data",
            },
        };
        let data = new FormData();
        data.append("name", name);
        data.append("phone", phone);
        if (PickedImagePath != null) {
            console.log(PickedImagePath);
            let myStr = PickedImagePath;
            let strArray = myStr.split("/");
            let fileName = strArray[strArray.length - 1];

            console.log(fileName);
            data.append("photo", {
                uri: PickedImagePath,
                name: fileName,
                type: "image/jpeg",
            });
        }
        console.log(data);
        axios
            .post(`${BaseUrl}profile/updateInfo`, data, config)
            .then((response) => {
                // navigation.navigate("SuccessOrder");
                getuser();
            })
            .catch(async (e) => {
                setIsError(true)
                setIsLoading(false);
                console.log("CheakOut", e?.response?.data.message);
                console.log("CheakOut", e?.response?.status);
                setPhoneError(e?.response?.data.errors.phone);
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
                    <IsErrorModal isModalVisible={isError} CallBack={sendForm} />
                    <ScrollView style={[barakocta.p3, barakocta.pt4]}>
                        <Text style={[barakocta.tRight, barakocta.mb3, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>معلومات المستخدم</Text>
                        <Text style={[{ fontFamily: 'Cairo' }]}>الاسم</Text>
                        <TextInput

                            value={name}
                            onChangeText={setname}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb3,]} />
                        <Text style={[{ fontFamily: 'Cairo' }]}>رقم الهاتف</Text>
                        <TextInput
                            value={phone}
                            keyboardType="numeric"
                            onChangeText={setphone}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb3,]} />
                        <Text style={[barakocta.colorDanger]}>{PhoneError}</Text>
                        {PickedImagePath ?
                            <Image
                                source={{ uri: PickedImagePath }}
                                resizeMode={"contain"}
                                style={[barakocta.mxAuto, { width: Dimention.height * 0.17, height: Dimention.height * 0.17 }, barakocta.my0, barakocta.p0]} />
                            :
                            <Image
                                source={{ uri: ImageUrl + user.photo }}
                                resizeMode={"contain"}
                                style={[barakocta.mxAuto, { width: Dimention.height * 0.17, height: Dimention.height * 0.17 }, barakocta.my0, barakocta.p0]} />
                        }
                        <View style={[barakocta.fRow]}>
                            <TouchableOpacity
                                style={[barakocta.p3, barakocta.my2, { backgroundColor: Colors.primary, width: Dimention.height * 0.17, borderRadius: 30 }, barakocta.mxAuto]}
                                onPress={openCamera}
                            >
                                <Text style={[barakocta.tCenter, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 16 },]}>التقاط صورة</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[barakocta.p3, barakocta.my2, { backgroundColor: Colors.primary, width: Dimention.height * 0.17, borderRadius: 30 }, barakocta.mxAuto]}
                                onPress={showImagePicker}
                            >
                                <Text style={[barakocta.tCenter, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 16 },]}>رفع صورة</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[barakocta.p3, { backgroundColor: Colors.secondary, width: Dimention.height * 0.17, borderRadius: 30 }, barakocta.mxAuto]}
                            onPress={() => {
                                sendForm();
                            }}
                        >
                            <Text style={[barakocta.tCenter, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 16 },]}>حفظ</Text>
                        </TouchableOpacity>
                        <View style={{ height: 50 }}></View>
                    </ScrollView>
                    <Loading />
                </View>
            </View>
        </SafeAreaView >
    );
}
