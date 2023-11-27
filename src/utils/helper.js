import { useState } from "react";

export function flattenArray(arr) {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), [])
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
    if(channelDetail && channelDetail.channel_members){
        const members = channelDetail.channel_members.map(member => member.user_id);
        const membersInfo = members.map(member => {
            const userInfo = getUserInfo(member, users);
            return userInfo[0];
        });
        return membersInfo;
    } 
    return [];
}

export function getDMUsers(channels) {
    const users = JSON.parse(localStorage.getItem('users'));
    console.log(channels, users);
    if(channels && users){
        let usersChannelMembers = [];
        channels.forEach(channel => {
            const channelMembers = getChannelMembers(channel,users);
            usersChannelMembers.push(channelMembers);
            console.log(usersChannelMembers);
        });
        localStorage.setItem('dmUsers', usersChannelMembers);
    }
}