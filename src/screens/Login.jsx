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
import barakocta from "../../Styles/barakocta";
import { AuthContext } from "../context/AuthContext";

export default function Login({ navigation }) {
    const { login, Dimention, Colors, passwordresponce, phonerespoce, typeResponce } = useContext(AuthContext);
    const [password, setPassword] = useState();
    const [phone, setphone] = useState();
    const [isLoading, setIsLoading] = useState(false);
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
            <ScrollView>
                <View style={[barakocta.jcCenter, { height: Dimention.height * 0.4, borderBottomEndRadius: Dimention.height * 0.1, borderBottomStartRadius: Dimention.height * 0.1, width: '100%', backgroundColor: Colors.primary }]}>

                    <Image
                        source={require('../../assets/Fingerprint-pana.png')}
                        resizeMode={"contain"}
                        style={[barakocta.mxAuto, { width: Dimention.height * 0.3, height: Dimention.height * 0.3 }, barakocta.my0, barakocta.p0]} />
                </View>
                <View style={[{ backgroundColor: Colors.fourth, borderRadius: 20, }, barakocta.pt3, barakocta.px2, barakocta.positionRelative, barakocta.m4, { top: -100 }]} >
                    <Image
                        source={require('../../assets/icon2.png')}
                        resizeMode={"contain"}
                        style={[barakocta.mxAuto, { width: Dimention.height * 0.17, height: Dimention.height * 0.17 }, barakocta.my0, barakocta.p0]} />
                    <Text style={[barakocta.tCenter, { color: Colors.tertiary, fontFamily: 'ElMessiri', fontSize: 24 },]}>هبشة | HAPSHA</Text>
                    <Text style={[barakocta.tRight, { color: Colors.tertiary, fontFamily: 'Cairo', fontSize: 20 },]}>تسجيل دخول</Text>
                    <Text style={[barakocta.colorDanger]}>{typeResponce}</Text>
                    <Text style={[{ fontFamily: 'Cairo' }]}>رقم الهاتف</Text>
                    <TextInput
                        style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb3,]}
                        value={phone}
                        keyboardType="numeric"
                        onChangeText={setphone}
                    />
                    <Text style={[barakocta.colorDanger]}>{phonerespoce}</Text>
                    <Text style={[{ fontFamily: 'Cairo' }]}>كلمة السر</Text>
                    <TextInput
                        style={[{ borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#999' }, barakocta.w75, barakocta.mb3,]}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Text style={[barakocta.colorDanger]}>{passwordresponce}</Text>
                    <TouchableOpacity
                        style={[barakocta.p3, { backgroundColor: Colors.secondary, width: Dimention.height * 0.17, borderRadius: 30 }, barakocta.mxAuto]}

                        onPress={() => { login(phone, password, setIsLoading) }}

                    >
                        <Text style={[barakocta.tCenter, { color: Colors.fourth, fontFamily: 'Cairo', fontSize: 16 },]}>سجل دخولك</Text>
                    </TouchableOpacity>
                    <View style={[barakocta.fRow, barakocta.my2, barakocta.jcEnd]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Register');
                            }}
                        >
                            <Text style={[{ color: '#1850a5', fontFamily: 'Cairo' }]}>سجل حساب جديد </Text>
                        </TouchableOpacity>
                        <Text style={[{ fontFamily: 'Cairo' }]}>ليس لديك حساب </Text>
                    </View>

                </View>
            </ScrollView>
            <Loading />
        </SafeAreaView >
    );
}