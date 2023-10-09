import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import Feather from '@expo/vector-icons/Feather';

const NoNetwork = ({ networkback }) => {
    const [isConnected, setIsConnected] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // Subscribe to network state changes
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });

        // Unsubscribe when the component is unmounted
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        // Show or hide the modal based on the network status
        if (isConnected) {
            setIsModalVisible(false);
            networkback()
        } else {
            setIsModalVisible(true);
        }
    }, [isConnected]);

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.5}>
            <View style={styles.modal}>
                <Feather name="wifi-off" size={32} color="black" />
                <Text style={styles.modalText}>لا يوجد اتصال بالانترنت</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'black',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 10,
    },
});

export default NoNetwork;
