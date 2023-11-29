import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/layout';
import { fetchAllUserChannelDetails, fetchAllUsers, fetchChannel, fetchDirectMessages, fetchMessage, fetchUserChannels } from '../../services/api';
import { useToast } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { capitalize, getChannelMembers, getDmUsers } from '../../utils/helper';
import useFetch from '../../utils/hooks/useFetch';
import MessageContainer from '../../components/MessageContainer/MessageContainer';

function HomePage() {
    const userId = localStorage.getItem('id');
    const uid = localStorage.getItem('uid');
    const signedInUser = capitalize(uid.split('@')[0]);

    const [loading, setLoading] = useState(false);
    const [messageReceiver, setMessageReceiver] = useState(null);
    const [channel, setChannel] = useState(null);
    const [channelDetails, setChannelDetails] = useState(null);
    const [messages, setMessages] = useState([]);
    const [dmUsers, setDmUsers] = useState([]);
    const [directMessages, setDirectMessages] = useState([]);
    const [dmLoading, setDmLoading] = useState(true);
    const [channels, setChannels] = useState([]);
    const [toScroll, setToScroll] = useState(true);

    const { apiUrl: userUrl, options: userOptions } = fetchAllUsers();
    const { apiUrl: userChannelUrl, options: userChannelOptions } = fetchUserChannels();

    const { data: userData, error: userError, load: userLoading, fetchData: fetchUsers } = useFetch();
    const { data: userChannelData, error: userChannelError, load: userChannelLoading, fetchData: fetchChannels } = useFetch();
    const { data: channelData, error: channelError, load: channelLoading, fetchData: fetchChannelDetail } = useFetch();
    const { data: messagesData, error: messagesError, load: messagesLoading, fetchData: fetchMessages } = useFetch();

    const toast = useToast();

    let channelList = [
      { id: 1, name: 'general' },
      { id: 2, name: 'random' },
    ];
    
    // Check for channel updates 
    const retrieveChannelData = (id) => {
      const { apiUrl, options } = fetchChannel(id);
      fetchChannelDetail(apiUrl, options);
    }

    const retrieveChannels = (channel) => {
      setChannels((prevState) => [
        ...prevState,
        { id: channel.id, name: channel.name }
      ]);

      retrieveChannelData(channel.id);
    }

    const switchConvo = (receiver) => {
      setMessageReceiver(receiver);
      setToScroll(false)
    }

    // Retrieve messages from specific users or channels
    const retrieveMessages = (receiver) => {   
      if(!receiver) setMessages([]);
      setMessageReceiver(receiver);
      if(receiver){
        if(receiver.class === 'Channel'){
          retrieveChannelData(receiver.id)
        }
        const { apiUrl, options } = fetchMessage(receiver.id, receiver.class);
        fetchMessages(apiUrl, options);
      } 
    }

    // Listens to new messages
    useEffect(() => {
      
      const fetchRetrieveMessages = async () => {
        if(messageReceiver){
          try {
            const { apiUrl, options } = fetchMessage(messageReceiver.id, messageReceiver.class);
            await fetchMessages(apiUrl, options);
            // setToScroll(true);
          } catch (error) {
            console.log('Error fetching messages', error)
          }
        }
      }

      const intervalId = setInterval(() => {
        fetchRetrieveMessages();
      }, 3000);

      return () => { clearInterval(intervalId)}
    }, [messageReceiver])

    // For initial load of all users and channels
    useEffect(() => {
      fetchUsers(userUrl, userOptions);
      fetchChannels(userChannelUrl, userChannelOptions);
    },[userUrl, userChannelUrl]);

    // For fetch all users response
    useEffect(() => {
      if (userError) {
        console.error('User Error:', userError);
        toast({
          title: 'Failed to load users',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        });
      }
      if (userData) {
        setLoading(userLoading);
        localStorage.setItem('users', JSON.stringify(userData));
      }
    }, [userData, userError, userLoading, toast]);

    // For fetch all channels response
    useEffect(() => {
      if (userChannelError) {
        console.error('Channel Error:', userChannelError);
        toast({
          title: 'Failed to load channels',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        });
      }
      if (userChannelData) {
        setLoading(userChannelLoading);

        // Define channels to display on sidebar
        if (userChannelData && Array.isArray(userChannelData.data)) {
          channelList = channelList.concat(userChannelData.data.map(channel => ({ id: channel.id, name: channel.name })));
          setChannels(channelList);
        }
        localStorage.setItem('channels', JSON.stringify(userChannelData));
      }
    }, [userChannelData, userChannelError, userChannelLoading, toast]);

    // Fetching user channels' details
    useEffect(() => {
      const fetchData = async () => {
        if(userChannelData && !userChannelData.errors){
          try{
            const data = await fetchAllUserChannelDetails(userChannelData);
            if(data){
              setChannelDetails(data);
            }
          } catch (error){
            console.log('Error fetching channel details',error)
          }
        }
      }
      fetchData();
    }, [userChannelData, toast])

    // Retrieving user channels members
    useEffect(() => {
      let members = [];
      if(channelDetails){
        channelDetails.forEach(channel => {
          const channelMembers = getChannelMembers(channel.data, userData);
          members.push(channelMembers);
        });
      }
      const users = getDmUsers(members);
      setDmUsers(users);
    }, [channelDetails, userData]);

    // Retrieving direct messages
    useEffect(() => {
      const fetchData =  async () => {
        if(dmUsers && dmUsers.length){
          try {       
            const dms = await fetchDirectMessages(dmUsers);
            if(dms) {
              const dm = dms.map(m => {

                const receiverId = m.data[0].receiver.id;
                const receiverName = m.data[0].receiver.uid;
                const senderId = m.data[0].sender.id;
                const senderName = m.data[0].sender.uid;

                const label = uid === receiverName ? senderName : receiverName;
                const uId = userId === receiverId.toString() ? senderId : receiverId; 

                const uName = label.split('@')[0];
                const uclass = 'User';

                return { id: uId, name: uName, class: uclass }
              });
              setDirectMessages(dm);
            }
          } catch (error) {
            console.error('Failed to retrieve direct messages');
          }finally {
            setDmLoading(false);
          }
        } 
      }
      fetchData();
    }, [dmUsers]);

    // For fetching specific channel details response
    useEffect(() => {
      if(channelError){
        console.error('Error fetching channel detail', channelError)
      }
      if(channelData){
        const data = channelData.data
        setChannel(data);
        setLoading(channelLoading)
      }
      if(channelLoading){
        setLoading(channelLoading);
      }
    }, [channelData, channelError, channelLoading]);

    // For fetch messages response
    useEffect(() => {
      if(messagesError){
        console.log('error', messagesError);
        setMessages([]);
        toast({
          title: 'Failed to retrieve messages',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
      }
      if(messagesData){
        setMessages(messagesData.data.map(message => message));
      }
    }, [messagesData, messagesError, messagesLoading, toast]);

    return (
        <div className='home-container'>
          <div className="progress-container">
            {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
          </div>
            <Header signedInUser={signedInUser} />
            <Flex  maxH='50%'>
                <Sidebar 
                  channels={channels}
                  directMessages={directMessages}
                  retrieveMessages={retrieveMessages} 
                  retrieveChannels={retrieveChannels}
                  users={userData}
                  dmLoading={dmLoading}
                  switchConvo={switchConvo}
                />
                <MessageContainer 
                  messageReceiver={messageReceiver} 
                  messages={messages}
                  users={userData}
                  dmUsers={dmUsers}
                  channelDetail={channel}
                  retrieveMessages={retrieveMessages}
                  toScroll={toScroll}
                />
            </Flex>
        </div>
    );
}

export default HomePage;