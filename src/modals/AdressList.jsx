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
import { FontAwesome } from '@expo/vector-icons';
import barakocta from "../../Styles/barakocta";
import axios from "axios";
import { BaseUrl } from "../config";
import { AuthContext } from "../context/AuthContext";
import NoNetwork from "./noNetwork";
import IsErrorModal from "./IsErrorModal";

const Address = ({ Colors, neighbourhood, city, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={[barakocta.fRow, { borderBottomWidth: 1, borderBottomColor: Colors.fourth, borderStyle: "dashed" }, barakocta.w100, barakocta.jcEnd, barakocta.aiCenter]}>
            <View >
                <Text style={[barakocta.tRight, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 16 },]}>{neighbourhood}</Text>
                <Text style={[barakocta.tRight, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 12, opacity: 0.8 },]}>{city}</Text>
            </View>
            <View style={[barakocta.p3,]}>
                <FontAwesome name="map-marker" size={48} color={Colors.fourth} />
            </View>
        </TouchableOpacity>
    )
}

export default function AdressList({ navigation, route }) {

    const { Dimention, Colors, userToken, logout } = useContext(AuthContext);
    const { setname, setphone, setdetails, setneighbourhood, setcity } = route.params ? route.params : {};
    const [addresses, setaddresses] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFetchDataError, setIsFetchDataError] = useState(false);
    const renderAddress = addresses?.map((item, index) => {
        console.log("#" + index, item);
        return (
            <Address Colors={Colors} key={index} neighbourhood={item.neighbourhood} city={item.city.name} onPress={() => {
                setname(item.name);
                setphone(item.phone);
                setdetails(item.details);
                setneighbourhood(item.neighbourhood);
                setcity(item.city.id);
                navigation.goBack();
            }} />
        );
    });
    const fetchData = () => {
        setIsFetchDataError(false);
        console.log("AddressList FETCHDATA");
        const config = {
            timeout: 10000,
            headers: { Authorization: `Bearer ${userToken}` },
        };
        axios
            .get(`${BaseUrl}profile/addresslist`, config)
            .then((response) => {
                console.log("AddressList FETCHDATA THEN");
                console.log(response.data.addresses);
                setaddresses(response.data.addresses);
                setIsLoaded(true);
            })
            .catch(async (e) => {
                setIsFetchDataError(true);
                console.log("AddressList", e?.response?.data?.message);
                console.log("AddressList", e?.response?.status);
                if (e?.response?.status == 401) {
                    await logout();
                    return
                }
            });
    };
    useEffect(() => {
        console.log("AddressList");
        fetchData();
    }, []);
    const networkback = () => {
        if (!isLoaded)
            fetchData();
    }
    return (
        <SafeAreaView
            style={[barakocta.fFill]}
        >
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'transparent', }}>
                <Pressable onPress={() => {
                    navigation.goBack()
                }} style={[{ height: "60%", width: '100%', position: 'relative', top: 27, backgroundColor: Colors.tertiary, opacity: 0.15 }]}></Pressable>
                <View style={[{ height: "50%", width: '100%', backgroundColor: Colors.secondary, borderTopEndRadius: 50, borderTopStartRadius: 50 }, barakocta.pt5, barakocta.px3]}>
                    <NoNetwork networkback={networkback} />
                    <IsErrorModal isModalVisible={isFetchDataError} CallBack={fetchData} />
                    {isLoaded ? (
                        <>
                            <ScrollView>
                                <Text style={[barakocta.tRight, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 20 },]}>عناوين سابقة</Text>
                                {renderAddress}
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
