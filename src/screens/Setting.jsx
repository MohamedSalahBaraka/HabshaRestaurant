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
import { AntDesign } from '@expo/vector-icons';
import barakocta from "../../Styles/barakocta";
import { AuthContext } from "../context/AuthContext";

export default function Setting({ navigation }) {
    const { Dimention, Colors, logout } = useContext(AuthContext);

    return (
        <SafeAreaView
            style={[barakocta.fFill]}
        >
            <ScrollView>
                <View style={[barakocta.jcCenter, { height: Dimention.height * 0.4, borderBottomEndRadius: Dimention.height * 0.1, borderBottomStartRadius: Dimention.height * 0.1, width: '100%', backgroundColor: Colors.primary }]}>

                    <Image
                        source={require('../../assets/icons8-gear-80.png')}
                        resizeMode={"contain"}
                        style={[barakocta.mxAuto, { width: Dimention.height * 0.3, height: Dimention.height * 0.3 }, barakocta.my0, barakocta.p0]} />
                </View>
                <View style={[{ backgroundColor: Colors.fourth, borderRadius: 20, }, barakocta.pt3, barakocta.px2, barakocta.positionRelative, barakocta.m4, { top: -100 }]} >
                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>الاعدادات</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('UpdateInfo');
                    }}
                        style={[barakocta.p3, barakocta.mb3, barakocta.fRow, barakocta.jcBetween, { borderBottomWidth: 1 }]}>
                        <AntDesign name="left" size={24} color={Colors.tertiary} />
                        <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 14 },]}>معلومات المطعم</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('UpdatePassword');
                    }}
                        style={[barakocta.p3, barakocta.mb3, barakocta.fRow, barakocta.jcBetween, { borderBottomWidth: 1 }]}>
                        <AntDesign name="left" size={24} color={Colors.tertiary} />
                        <Text style={[barakocta.tStart, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 14 },]}>كلمة السر</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('UpdateAdress', { type: 'address_sent_id' });
                    }}
                        style={[barakocta.p3, barakocta.mb3, barakocta.fRow, barakocta.jcBetween, { borderBottomWidth: 1 }]}>
                        <AntDesign name="left" size={24} color={Colors.tertiary} />
                        <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 14 },]}>عنوان المطعم</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        logout();
                    }}
                        style={[barakocta.p3, barakocta.mb3, barakocta.fRow, barakocta.jcBetween, { borderBottomWidth: 1 }]}>
                        <AntDesign name="left" size={24} color={Colors.tertiary} />
                        <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 14 },]}>تسجيل خروج</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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