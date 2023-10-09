import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default styles = StyleSheet.create({
    positionRelative: {
        position: 'relative'
    }, positionAbsolute: {
        position: 'absolute'
    }, t1: {
        fontSize: 7
    }, t2: {
        fontSize: 10
    }, t3: {
        fontSize: 14
    }, t4: {
        fontSize: 16
    }, t5: {
        fontSize: 18
    }, t6: {
        fontSize: 24
    }, br1: {
        borderRadius: 5
    }, br2: {
        borderRadius: 10
    }, br3: {
        borderRadius: 15
    }, br4: {
        borderRadius: 20
    }, br5: {
        borderRadius: 25
    }, br6: {
        borderRadius: 30
    }, tRight: {
        textAlign: 'right'
    }, tLeft: {
        textAlign: 'left'
    }, tCenter: {
        textAlign: 'center'
    }, tJustify: {
        textAlign: 'justify'
    }, tAuto: {
        textAlign: 'auto'
    }, colorPrimary: {
        color: '#0d6efd',
    }, colorSecondary: {
        color: '#6c757d',
    }, colorSuccess: {
        color: '#198754',
    }, colorInfo: {
        color: '#0dcaf0',
    }, colorWarning: {
        color: '#ffc107',
    }, colorDanger: {
        color: '#dc3545',
    }, colorLight: {
        color: '#f8f9fa',
    }, colorDark: {
        color: '#212529',
    }, colorMuted: {
        color: '#6c757d',
    }, bgPrimary: {
        backgroundColor: '#0d6efd',
    }, bgSecondary: {
        backgroundColor: '#6c757d',
    }, bgSuccess: {
        backgroundColor: '#198754',
    }, bgInfo: {
        backgroundColor: '#0dcaf0',
    }, bgWarning: {
        backgroundColor: '#ffc107',
    }, bgDanger: {
        backgroundColor: '#dc3545',
    }, bgLight: {
        backgroundColor: '#f8f9fa',
    }, bgDark: {
        backgroundColor: '#212529',
    }, bgMuted: {
        backgroundColor: '#6c757d',
    }, bgTransparent: {
        backgroundColor: 'transparent',
    }, col1: {
        width: '8.33333333%'
    }, col2: {
        width: '16.66666667%'
    }, col3: {
        width: '25%'
    }, col4: {
        width: '33.33333333%'
    }, col5: {
        width: '41.66666667%'
    }, col6: {
        width: '50%'
    }, col7: {
        width: '58.33333333%'
    }, col8: {
        width: '66.66666667%'
    }, col9: {
        width: '75%'
    }, col10: {
        width: '83.33333333%'
    }, col11: {
        width: '91.66666667%'
    }, col12: {
        width: '100%'
    }, offset1: {
        width: '8.33333333%'
    }, offset2: {
        width: '16.66666667%'
    }, offset3: {
        width: '25%'
    }, offset4: {
        width: '33.33333333%'
    }, offset5: {
        width: '41.66666667%'
    }, offset6: {
        width: '50%'
    }, offset7: {
        width: '58.33333333%'
    }, offset8: {
        width: '66.66666667%'
    }, offset9: {
        width: '75%'
    }, offset10: {
        width: '83.33333333%'
    }, offset11: {
        width: '91.66666667%'
    }, btn: {
        backgroundColor: 'transparent',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'transparent',
        opacity: 0.65,
        padding: 10,
        textAlign: 'center',
        textDecoration: 'none',
        verticalAlign: 'middle',
    }, btnPrimary: {
        color: '#fff',
        backgroundColor: '#0d6efd',
        borderColor: '#0a58ca',
    }, btnSecondary: {
        color: '#fff',
        backgroundColor: '#6c757d',
        borderColor: '#565e64',
    }, btnSuccess: {
        color: '#fff',
        backgroundColor: '#198754',
        borderColor: '#146c43',
    }, btnInfo: {
        color: '#fff',
        backgroundColor: '#0dcaf0',
        borderColor: '#25cff2',
    }, btnWarning: {
        color: '#000',
        backgroundColor: '#ffc107',
        borderColor: '#ffc720',
    }, btnDanger: {
        color: '#fff',
        backgroundColor: '#dc3545',
        borderColor: '#b02a37',
    }, btnLight: {
        color: '#000',
        backgroundColor: '#f8f9fa',
        borderColor: '#c6c7c8',
    }, btnDark: {
        color: '#fff',
        backgroundColor: '#212529',
        borderColor: '#373b3e',
    }, btnOPrimary: {
        color: '#0d6efd',
        borderColor: '#0d6efd',
    }, btnOSecondary: {
        color: '#6c757d',
        borderColor: '#6c757d',
    }, btnOSuccess: {
        color: '#198754',
        borderColor: '#198754',
    }, btnOInfo: {
        color: '#0dcaf0',
        borderColor: '#0dcaf0',
    }, btnOWarning: {
        color: '#ffc107',
        borderColor: '#ffc107',
    }, btnODanger: {
        color: '#dc3545',
        borderColor: '#dc3545',
    }, btnOLight: {
        color: '#f8f9fa',
        borderColor: '#f8f9fa',
    }, btnODark: {
        color: '#212529',
        borderColor: '#212529',
    }, opacity0: {
        opacity: 0
    }, opacity25: {
        opacity: 0.25
    }, opacity50: {
        opacity: 0.5
    }, opacity75: {
        opacity: 0.75
    }, opacity100: {
        opacity: 1
    }, overflowHidden: {
        overflow: 'hidden'
    }, overflowVisible: {
        overflow: 'visible',
    }, w25: {
        width: '25%'
    }, w50: {
        width: '50%'
    }, w75: {
        width: '75%'
    }, w100: {
        width: '100%'
    }, wauto: {
        width: 'auto'
    }, h25: {
        height: '25%'
    }, h50: {
        height: '50%'
    }, h75: {
        height: '75%'
    }, h100: {
        height: '100%'
    }, hauto: {
        height: 'auto'
    }, fFill: {
        flex: 1
    }, fRow: {
        flexDirection: 'row'
    }, fColumn: {
        flexDirection: 'column'
    }, fRRow: {
        flexDirection: 'row-reverse'
    }, fRColumn: {
        flexDirection: 'column-reverse'
    }, fWrap: {
        flexWrap: 'wrap'
    }, fNOWrap: {
        flexWrap: 'nowrap'
    }, fRWrap: {
        flexWrap: 'wrap-reverse'
    }, jcCenter: {
        justifyContent: 'center'
    }, jcBetween: {
        justifyContent: 'space-between'
    }, jcAround: {
        justifyContent: 'space-around'
    }, jcEven: {
        justifyContent: 'space-evenly'
    }, jcStart: {
        justifyContent: 'flex-start'
    }, jcEnd: {
        justifyContent: 'flex-end'
    }, aiStart: {
        alignItems: 'flex-start'
    }, aiEnd: {
        alignItems: 'flex-end'
    }, aiCenter: {
        alignItems: 'center'
    }, aiBaseline: {
        alignItems: 'baseline'
    }, aiStretch: {
        alignItems: 'stretch'
    }, m0: {
        margin: 0
    }, m1: {
        margin: 4
    }, m2: {
        margin: 8
    }, m3: {
        margin: 16
    }, m4: {
        margin: 24
    }, m5: {
        margin: 48
    }, mAuto: {
        margin: 'auto'
    }, mx0: {
        marginLeft: 0,
        marginRight: 0
    }, mx1: {
        marginLeft: 4,
        marginRight: 4
    }, mx2: {
        marginLeft: 8,
        marginRight: 8
    }, mx3: {
        marginLeft: 16,
        marginRight: 16
    }, mx4: {
        marginLeft: 24,
        marginRight: 24
    }, mx5: {
        marginLeft: 48,
        marginRight: 48
    }, mxAuto: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }, my0: {
        marginTop: 0,
        marginBottom: 0
    }, my1: {
        marginTop: 4,
        marginBottom: 4
    }, my2: {
        marginTop: 8,
        marginBottom: 8
    }, my3: {
        marginTop: 16,
        marginBottom: 16
    }, my4: {
        marginTop: 24,
        marginBottom: 24
    }, my5: {
        marginTop: 48,
        marginBottom: 48
    }, myAuto: {
        marginTop: 'auto',
        marginBottom: 'auto'
    }, mt0: {
        marginTop: 0,
    }, mt1: {
        marginTop: 4,
    }, mt2: {
        marginTop: 8,
    }, mt3: {
        marginTop: 16,
    }, mt4: {
        marginTop: 24,
    }, mt5: {
        marginTop: 48,
    }, mtAuto: {
        marginTop: 'auto',
    }, ml0: {
        marginLeft: 0,
    }, ml1: {
        marginLeft: 4,
    }, ml2: {
        marginLeft: 8,
    }, ml3: {
        marginLeft: 16,
    }, ml4: {
        marginLeft: 24,
    }, ml5: {
        marginLeft: 48,
    }, mlAuto: {
        marginLeft: 'auto',
    }, mr0: {
        marginRight: 0,
    }, mr1: {
        marginRight: 4,
    }, mr2: {
        marginRight: 8,
    }, mr3: {
        marginRight: 16,
    }, mr4: {
        marginRight: 24,
    }, mr5: {
        marginRight: 48,
    }, mrAuto: {
        marginRight: 'auto',
    }, mb0: {
        marginBottom: 0,
    }, mb1: {
        marginBottom: 4,
    }, mb2: {
        marginBottom: 8,
    }, mb3: {
        marginBottom: 16,
    }, mb4: {
        marginBottom: 24,
    }, mb5: {
        marginBottom: 48,
    }, mbAuto: {
        marginBottom: 'auto',
    }, p0: {
        padding: 0
    }, p1: {
        padding: 4
    }, p2: {
        padding: 8
    }, p3: {
        padding: 16
    }, p4: {
        padding: 24
    }, p5: {
        padding: 48
    }, pAuto: {
        padding: 'auto'
    }, px0: {
        paddingLeft: 0,
        paddingRight: 0
    }, px1: {
        paddingLeft: 4,
        paddingRight: 4
    }, px2: {
        paddingLeft: 8,
        paddingRight: 8
    }, px3: {
        paddingLeft: 16,
        paddingRight: 16
    }, px4: {
        paddingLeft: 24,
        paddingRight: 24
    }, px5: {
        paddingLeft: 48,
        paddingRight: 48
    }, pxAuto: {
        paddingLeft: 'auto',
        paddingRight: 'auto'
    }, py0: {
        paddingTop: 0,
        paddingBottom: 0
    }, py1: {
        paddingTop: 4,
        paddingBottom: 4
    }, py2: {
        paddingTop: 8,
        paddingBottom: 8
    }, py3: {
        paddingTop: 16,
        paddingBottom: 16
    }, py4: {
        paddingTop: 24,
        paddingBottom: 24
    }, py5: {
        paddingTop: 48,
        paddingBottom: 48
    }, pyAuto: {
        paddingTop: 'auto',
        paddingBottom: 'auto'
    }, pt0: {
        paddingTop: 0,
    }, pt1: {
        paddingTop: 4,
    }, pt2: {
        paddingTop: 8,
    }, pt3: {
        paddingTop: 16,
    }, pt4: {
        paddingTop: 24,
    }, pt5: {
        paddingTop: 48,
    }, ptAuto: {
        paddingTop: 'auto',
    }, pl0: {
        paddingLeft: 0,
    }, pl1: {
        paddingLeft: 4,
    }, pl2: {
        paddingLeft: 8,
    }, pl3: {
        paddingLeft: 16,
    }, pl4: {
        paddingLeft: 24,
    }, pl5: {
        paddingLeft: 48,
    }, plAuto: {
        paddingLeft: 'auto',
    }, pr0: {
        paddingRight: 0,
    }, pr1: {
        paddingRight: 4,
    }, pr2: {
        paddingRight: 8,
    }, pr3: {
        paddingRight: 16,
    }, pr4: {
        paddingRight: 24,
    }, pr5: {
        paddingRight: 48,
    }, prAuto: {
        paddingRight: 'auto',
    }, pb0: {
        paddingBottom: 0,
    }, pb1: {
        paddingBottom: 4,
    }, pb2: {
        paddingBottom: 8,
    }, pb3: {
        paddingBottom: 16,
    }, pb4: {
        paddingBottom: 24,
    }, pb5: {
        paddingBottom: 48,
    }, pbAuto: {
        paddingBottom: 'auto',
    },
});