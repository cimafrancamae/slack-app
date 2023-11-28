import { fetchMessage } from "../services/api";

export function flattenArray(arr) {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), [])
}

export function removeDuplicates(arr) {
    return [...new Set(arr)];
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase().concat(string.slice(1));
}

export function getLastTenUsers(users) {
    if(!users) return;

    const lastTenUsers = users.data.slice(-10);
    return lastTenUsers.map((user) => user.id);
}

export function getUserInfo(userId, users) {  
    if(!users) return;

    const userData = flattenArray(users.data);
    return userData.filter(user => user.id === userId);
}

export function getChannelMembers (channelDetail, users) {

    if(channelDetail && channelDetail.channel_members && users){
        const members = channelDetail.channel_members.map(member => member.user_id);
        const membersInfo = members.map(member => {
            const userInfo = getUserInfo(member, users);
            return userInfo[0];
        });
        return membersInfo;
    } 
    return [];
}

export function getDmUsers(users) {
    const flattenedUsers = flattenArray(users);
    const dmUsers = removeDuplicates(flattenedUsers);
    localStorage.setItem('dm-users', JSON.stringify(dmUsers));

    return dmUsers;
}