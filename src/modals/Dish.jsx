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
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import barakocta from "../../Styles/barakocta";
import { BaseUrl, ImageUrl } from "../config";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import NoNetwork from "./noNetwork";
import IsErrorModal from "./IsErrorModal";



export default function Dish({ navigation, route }) {

    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const { id } = route.params ? route.params : {};
    const [isLoaded, setIsLoaded] = useState(false);
    const [dish, setdish] = useState();
    const [sizes, setsizes] = useState();
    const [isFetchDataError, setIsFetchDataError] = useState(false);
    const [isDeleteError, setIsDeleteError] = useState(false);

    const rendersizes = sizes?.map((item, index) => {
        return (
            <Size Colors={Colors} Title={item.name} Price={item.price} />
        );
    });
    const Delete = () => {
        console.log("DISh DELETE");
        setIsDeleteError(false)
        const config = {
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}show/DishDelete/${id}`, config)
            .then((response) => {
                console.log("DISh DELETE");
                Alert.alert('تم', 'تم الحذف بنجاح');
                navigation.goBack();
            })
            .catch(async (e) => {
                setIsDeleteError(true)
                console.log("DISh", e?.response?.data.message);
                console.log("DISh", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    const fetchData = () => {
        setIsFetchDataError(false)
        console.log("Dish FETCHDATA");
        const config = {
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}show/dish/${id}`, config)
            .then((response) => {
                setdish(response.data.dish);
                setsizes(response.data.dish.sizes);
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
    const showConfirmDialog = () => {
        return Alert.alert(
            "هل انت متأكد؟",
            "هل انت متاكد من رغبتك للحذف",
            [
                // The "Yes" button
                {
                    text: "احذف",
                    onPress: () => {
                        Delete();
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
        const unsubscribe = navigation.addListener("focus", () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);
    const networkback = () => {
        if (!isLoaded)
            fetchData
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
                    <IsErrorModal isModalVisible={isFetchDataError} CallBack={fetchData} />
                    <IsErrorModal isModalVisible={isDeleteError} CallBack={Delete} />
                    {isLoaded ? (
                        <>
                            <ScrollView>

                                <Image
                                    source={{ uri: ImageUrl + dish.photo }}
                                    resizeMode={'cover'}
                                    style={[barakocta.jcCenter, { height: Dimention.height * 0.25, borderRadius: 50, width: '100%', }]} />

                                <View style={[{ backgroundColor: Colors.fourth, borderRadius: 20, }, barakocta.pt3, barakocta.px2, barakocta.positionRelative, barakocta.mx4, { top: -50 }]} >
                                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>{dish.name}</Text>
                                    <Text style={[barakocta.tRight, { color: Colors.secondary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 },]}>{dish.category?.name}</Text>
                                </View>
                                <View style={[barakocta.p3, { position: 'relative', top: -50 }]}>
                                    <ScrollView horizontal={true} style={[barakocta.my3, { transform: [{ scaleX: -1 }] }]}>
                                        {rendersizes}
                                    </ScrollView>
                                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 }]}>{dish.details}</Text>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('EditDish', { dish });
                                    }} style={[barakocta.mxAuto, barakocta.aiCenter, barakocta.p3, { borderRadius: 20, backgroundColor: Colors.secondary }]}>
                                        <AntDesign name="edit" size={50} color={Colors.fourth} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        showConfirmDialog()
                                    }} style={[barakocta.mxAuto, barakocta.my3, barakocta.aiCenter, barakocta.p3, { borderRadius: 20, backgroundColor: Colors.secondary }]}>
                                        <AntDesign name="delete" size={50} color={Colors.fourth} />
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
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
                    )}
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