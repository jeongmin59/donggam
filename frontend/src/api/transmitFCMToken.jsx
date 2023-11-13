import axiosInstance from './axiosConfig';

export const transmitFCMToken = async (fcmToken) => {
    console.log('FCMToken : ', fcmToken);
    const res = await axiosInstance.post(`/member/FCMToken`, {
        firebaseToken: fcmToken
    });
    return res;
}