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
import * as ImagePicker from 'expo-image-picker';
import barakocta from "../../Styles/barakocta";
import { BaseUrl } from "../config";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import NoNetwork from "./noNetwork";
import IsErrorModal from "./IsErrorModal";


export default function AddDish({ navigation }) {

    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const [SelectedCategory, setSelectedCategory] = useState();
    const [categories, setcategories] = useState();
    const [name, setname] = useState();
    const [sizes, setsizes] = useState([]);
    const [details, setdetails] = useState();
    const [PickedImagePath, setPickedImagePath] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchDataError, setIsFetchDataError] = useState(false);
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

    const rendercategories = categories?.map((item, index) => {
        return (
            <Picker.Item label={item.name} value={item.id} key={item.id} />
        );
    });
    const rendersizes = sizes?.map((item, index) => {
        return (
            <Size Colors={Colors} key={index} Title={item.name} Price={item.price} onPress={() => {
                navigation.navigate('Editsize', { size: item, index, sizes, setsizes });
            }} />
        );
    });
    const GetCategories = () => {
        setIsFetchDataError(false)
        console.log("OrderDelivary Getcategories");
        const config = {
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}show/categories`, config)
            .then((response) => {
                setcategories(response.data.categories);
                setIsLoaded(true);

            })
            .catch(async (e) => {
                setIsFetchDataError(true)
                console.log("Getcategories", e?.response?.data.message);
                console.log("Getcategories", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }

            });
    };
    useEffect(() => {
        console.log("home");
        GetCategories();
    }, []);
    const sendForm = () => {
        setIsError(false)
        if (typeof name == "undefined" || name == "") {
            Alert.alert("خطأ", "عليك اضافة الأسم");
            return;
        }
        if (typeof details == "undefined" || details == "") {
            Alert.alert("خطأ", "عليك اضافة تفاصيل");
            return;
        }
        if (!PickedImagePath) {
            Alert.alert("خطأ", "عليك اختيار صورة");
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
        console.log(sizes);
        let data = new FormData();
        data.append("name", name);
        data.append("details", details);
        data.append("category_id", SelectedCategory);
        data.append("sizes", JSON.stringify(sizes));
        console.log(data);
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
        axios
            .post(`${BaseUrl}show/dishstore`, data, config)
            .then((response) => {
                // navigation.navigate("SuccessOrder");
                console.log('MESSAGE', response.data.message);
                setIsLoading(false);
                navigation.goBack();
            })
            .catch(async (e) => {
                setIsLoading(false); setIsError(true);
                console.log("CheakOut", e?.response?.data.message);
                console.log("CheakOut", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
                // navigation.navigate("Faild");
            });
    };
    const networkback = () => {

    }
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
                    <IsErrorModal isModalVisible={isFetchDataError} CallBack={GetCategories} />
                    <IsErrorModal isModalVisible={isError} CallBack={sendForm} />
                    <ScrollView style={[barakocta.p3, barakocta.pt4]}>
                        <Text style={[barakocta.tRight, barakocta.mb3, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>اضافة طبق</Text>
                        <Text style={[{ fontFamily: 'Cairo' }]}>الاسم</Text>
                        <TextInput
                            value={name}
                            onChangeText={setname}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb3,]} />
                        <Text style={[{ fontFamily: 'Cairo' }]}>تفاصيل الطبق</Text>
                        <TextInput
                            value={details}
                            onChangeText={setdetails}
                            style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb2,]}
                            multiline={true}
                            numberOfLines={4

                            } />
                        <Text style={[{ fontFamily: 'Cairo' }]}>التصنيف</Text>
                        <Picker
                            style={[
                                barakocta.bgLight,
                                barakocta.w75,
                                barakocta.mxAuto,
                                barakocta.br1,
                                barakocta.mb2
                            ]}
                            selectedValue={SelectedCategory}
                            onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                        >
                            {rendercategories}
                        </Picker>
                        <ScrollView horizontal={true} style={[barakocta.my3, { transform: [{ scaleX: -1 }] }]}>
                            {rendersizes}
                        </ScrollView>
                        <TouchableOpacity
                            style={[barakocta.p3, barakocta.my2, { backgroundColor: Colors.primary, width: Dimention.height * 0.17, borderRadius: 30 }, barakocta.mxAuto]}
                            onPress={() => {
                                navigation.navigate('Addsize', { setsizes, sizes, send: false });
                            }}
                        >
                            <Text style={[barakocta.tCenter, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 16 },]}>اضافة حجم</Text>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: PickedImagePath }}
                            resizeMode={"contain"}
                            style={[barakocta.mxAuto, { width: Dimention.height * 0.17, height: Dimention.height * 0.17 }, barakocta.my0, barakocta.p0]} />
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
                            <Text style={[barakocta.tCenter, barakocta.my2, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 16 },]}>حفظ</Text>
                        </TouchableOpacity>
                        <View style={{ height: 50 }}></View>
                    </ScrollView>
                    <Loading />
                </View>
            </View>
        </SafeAreaView >
    );
}
const Size = ({ Colors, Title, Price, Active, onPress }) => {
    let dot = { borderWidth: 1, borderColor: Colors.tertiary, };
    let mainborder = { borderColor: Colors.primary, };
    if (Active) {
        dot = { borderWidth: 5, borderColor: Colors.secondary, };
        mainborder = { borderColor: Colors.secondary, };
    }
    return (
        <TouchableOpacity onPress={onPress} style={[barakocta.p2, { transform: [{ scaleX: -1 }], height: 130 }, barakocta.jcCenter, barakocta.aiCenter, barakocta.mx1, { borderWidth: 1, borderRadius: 20 }, mainborder]}>
            <View style={[barakocta.my3, { height: 15, width: 15, borderRadius: 8 }, dot]}></View>
            <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.5 },]}>{Title}</Text>
            <View style={[barakocta.fRow]}>
                <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 10, },]}>جنيه</Text>
                <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 16, },]}>{Price}</Text>
            </View>
        </TouchableOpacity>
    )
}