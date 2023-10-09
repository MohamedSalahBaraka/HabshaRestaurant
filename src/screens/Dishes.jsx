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
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import barakocta from "../../Styles/barakocta";
import { AuthContext } from "../context/AuthContext";
import { BaseUrl, ImageUrl } from "../config";
import axios from "axios";
import NoNetwork from "../modals/noNetwork";
import IsErrorModal from "../modals/IsErrorModal";

export default function Dishes({ navigation, route }) {

    const { Dimention, Colors, userToken, user, logout } = useContext(AuthContext);
    const [categories, setCategories] = useState();
    const [keyword, setKeyword] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const { category } = route.params ? route.params : {};
    const [dishes, setdishes] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchDataError, setIsFetchDataError] = useState(false);
    const [isSearchError, setIsSearchError] = useState(false);
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
    const toggleCategories = (id, index) => {
        const checkboxData = [...categories];
        checkboxData[index].checked = !checkboxData[index].checked;
        setCategories(checkboxData);
    };
    const fetchData = () => {
        setIsFetchDataError(false)
        console.log("Dishes FETCHDATA");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        let bodyParameters = {
            key: "value",
        };
        if (category) {
            console.log(category);
            bodyParameters = {
                categories: [category],
            };
        }
        bodyParameters.user_id = user.id;

        const prepare = (data) => {
            let datafinal = new Array();
            data.map((result) => {
                datafinal.push({
                    id: result.id,
                    title: result.name,
                    checked: false,
                });
            });
            return datafinal;
        };
        axios
            .post(`${BaseUrl}show/dishes`, bodyParameters, config)
            .then((response) => {
                setdishes(response.data.dishes);
                setCategories(prepare(response.data.categories));
                setIsLoaded(true);
            })
            .catch(async (e) => {
                setIsFetchDataError(true)
                console.log("Dishes", e?.response?.data.message);
                console.log("Dishes", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    const search = () => {
        setIsSearchError(false)
        setIsLoading(true);
        console.log("Dishes SEARCH");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        let bodyParameters = {
            user_id: user.id
        };
        let selectedCategories = [];
        categories
            .filter((cb) => cb.checked === true)
            .map((cate) => {
                selectedCategories.push(cate.id);
            });

        if (selectedCategories.length != 0) {
            bodyParameters.categories = selectedCategories;
        }
        if (keyword) {
            bodyParameters.keyword = keyword;
        }
        axios
            .post(`${BaseUrl}show/dishes`, bodyParameters, config)
            .then((response) => {
                setdishes(response.data.dishes);
                setIsLoaded(true);
                setIsLoading(false);
            })
            .catch(async (e) => {
                setIsSearchError(true)
                console.log("Dishes", e?.response?.data.message);
                console.log("Dishes", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    useEffect(() => {
        console.log("Dishes");
        fetchData();
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);
    const renderCategorieschecked = categories?.map((cb, index) => {
        if (cb.checked)
            return (
                <Categorycheck Colors={Colors} Title={cb.title} onPress={() => {
                    toggleCategories(cb.id, index);
                    search();
                }} />
            );
        return null;
    });
    const renderCategories = categories?.map((cb, index) => {
        if (!cb.checked)
            return (
                <Category Colors={Colors} Title={cb.title} onPress={() => {
                    toggleCategories(cb.id, index);
                    search();
                }} />
            );
        return null;
    });
    const renderdishes = dishes?.map((cb, index) => {
        if (!cb.checked)
            return (
                <DishComponent Colors={Colors}
                    Dimention={Dimention}
                    navigation={navigation}
                    id={cb.id}
                    Title={cb.name}
                    uri={cb.photo}
                    price={cb.sizes[0]?.price}

                />
            );
        return null;
    });
    const networkback = () => {
        if (!isLoaded)
            fetchData();
    }
    return (
        <SafeAreaView
            style={[barakocta.fFill]}
        >

            <IsErrorModal isModalVisible={isFetchDataError} CallBack={fetchData} />
            <IsErrorModal isModalVisible={isSearchError} CallBack={search} />
            <NoNetwork networkback={networkback} />
            {isLoaded ? (
                <>
                    <ScrollView>
                        <View style={[barakocta.jcCenter, { height: Dimention.height * 0.4, borderBottomEndRadius: Dimention.height * 0.1, borderBottomStartRadius: Dimention.height * 0.1, width: '100%', backgroundColor: Colors.primary }]}>

                            <Image
                                source={require('../../assets/Chef-bro.png')}
                                resizeMode={"contain"}
                                style={[barakocta.mxAuto, { width: Dimention.height * 0.3, height: Dimention.height * 0.3 }, barakocta.my0, barakocta.p0]} />
                        </View>
                        <View style={[{ backgroundColor: Colors.fourth, borderRadius: 20, }, barakocta.pt3, barakocta.px2, barakocta.positionRelative, barakocta.m4, { top: -100 }]} >
                            <View style={[barakocta.bgLight, barakocta.w100, barakocta.pb3, barakocta.aiCenter]}>
                                <View style={[{ borderRadius: 30 }, { borderWidth: 1, borderColor: Colors.tertiary, borderStyle: "dashed" }, barakocta.w100, barakocta.px3, barakocta.fRow]}>
                                    <TouchableOpacity onPress={search} style={[barakocta.p2]} >
                                        <FontAwesome5 name="search" size={20} color={Colors.tertiary} />
                                    </TouchableOpacity>
                                    <TextInput
                                        value={keyword}
                                        onChangeText={setKeyword}
                                        style={[barakocta.fFill]} placeholder="إبحث..." />
                                </View>
                            </View>
                            <ScrollView horizontal={true} style={[barakocta.my2, { transform: [{ scaleX: -1 }] }]}>
                                {renderCategorieschecked}
                            </ScrollView>
                            <ScrollView horizontal={true} style={[barakocta.mb3, { transform: [{ scaleX: -1 }] }]}>
                                {renderCategories}
                            </ScrollView>
                            <Text style={[barakocta.tRight, barakocta.my3, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>الاطباق</Text>
                            <View style={[barakocta.fRow, barakocta.fWrap]}>
                                {renderdishes}
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={[barakocta.positionAbsolute, { right: 20, bottom: 30, }]}
                        onPress={() => {
                            navigation.navigate('AddDish');
                        }}>
                        <Image
                            source={require('../../assets/icons8-add-64.png')}
                            resizeMode={"contain"}
                            style={[barakocta.mxAuto, { width: 70, height: 70 }, barakocta.my0, barakocta.p0]} />
                    </TouchableOpacity>
                    <Loading />
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
        </SafeAreaView >
    );
}
const Categorycheck = ({ Colors, Title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[barakocta.p2, { transform: [{ scaleX: -1 }] }, barakocta.fRow, barakocta.jcCenter, barakocta.aiCenter, barakocta.mx1, { backgroundColor: Colors.secondary, borderRadius: 20 }]}>
            <Text style={[barakocta.tRight, barakocta.mx2, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 14, opacity: 0.8 },]}>{Title}</Text>
            <FontAwesome5 name="check" size={24} color={Colors.fourth} />
        </TouchableOpacity>
    )
}
const Category = ({ Colors, Title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[barakocta.p2, { transform: [{ scaleX: -1 }] }, barakocta.fRow, barakocta.jcCenter, barakocta.aiCenter, barakocta.mx1, { backgroundColor: Colors.primary, borderRadius: 20 }]}>
            <Text style={[barakocta.tRight, barakocta.mx2, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 14, opacity: 0.8 },]}>{Title}</Text>
            <FontAwesome5 name="plus" size={24} color={Colors.tertiary} />
        </TouchableOpacity>
    )
}
const DishComponent = ({ Colors, Title, uri, price, id, Dimention, navigation }) => {
    return (
        <View style={[barakocta.p2, barakocta.my1, barakocta.jcCenter, barakocta.aiCenter, barakocta.mx1, { width: Dimention.width * 0.38, borderColor: Colors.primary, borderWidth: 1, borderRadius: 20 }]}>
            <Text style={[{ color: Colors.tertiary, fontFamily: 'Marhey', fontSize: 16, },]}>{Title}</Text>
            <View style={[barakocta.fRow]}>
                <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 10, },]}>جنيه</Text>
                <Text style={[{ color: Colors.tertiary, fontFamily: 'Alexandria', fontSize: 13, },]}>{price}</Text>
            </View>
            <Image
                source={{ uri: ImageUrl + uri }}
                resizeMode={"contain"}
                style={[barakocta.mxAuto, { width: Dimention.width * 0.27, height: Dimention.width * 0.27 }, barakocta.my0, barakocta.p0]} />
            <TouchableOpacity
                style={[barakocta.jcEnd, { width: Dimention.width * 0.27, }, barakocta.fRow]}
                onPress={() => {
                    // navigation.toggleDrawer();
                    navigation.navigate('Dish', { id });
                }}>
                <Text style={[{ color: Colors.secondary, fontFamily: 'Alexandria', fontSize: 10, },]}>التفاصيل</Text>
                <Image
                    source={require('../../assets/icons8-restaurant-80.png')}
                    resizeMode={"contain"}
                    style={[{ width: 20, height: 20 }]} />

            </TouchableOpacity>
        </View >)
}
