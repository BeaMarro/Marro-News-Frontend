import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stomp from 'stomp-websocket';
import TokenManager from "../api/TokenManager";
import NotificationContainer from "./NotificationContainer";

function WebSocketNotifications() {
    const accessToken = TokenManager.getAccessToken();
    const isLoggedIn = TokenManager.getClaims() !== undefined;
    const role = isLoggedIn ? TokenManager.getClaims().role : null;
    const [topicMessages, setTopicMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    const navigate = useNavigate();

    const setupStompClient = () => {
        // stomp client over websockets
        const stompClient = Stomp.client('ws://localhost:8080/ws');

        stompClient.connect({}, () => {
            console.log('WebSocket connected');
            
            // subscribe to the backend public topic
            stompClient.subscribe('/topic/user', (data) => {
                onPublicMessageReceived(data);
            }, (error) => {
                console.error('Error subscribing to WebSocket topic:', error);
            });
        }, (error) => {
            console.error('Error connecting to WebSocket:', error);
        });

        setStompClient(stompClient);
    };

    // display the received data
    const onPublicMessageReceived = (data) => {
        const text = data.body;
        setTopicMessages(prevMessages => [...prevMessages, text]);
    };

    const disconnectStompClient = () => {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log('WebSocket disconnected');
                setStompClient(null); // Clear the client after disconnecting
            });
        }
    };

    useEffect(() => {
        if (accessToken) {
            setupStompClient();
        }

        // Cleanup function
        return () => {
            disconnectStompClient();
        };
    }, [accessToken, navigate]);

    if(role === "JOURNALIST") {
        return (
            <>
            <div>
                {topicMessages.length > 0 && (
                topicMessages.map((message, index) => (
                    <NotificationContainer key={index} notification={message} />
                ))
                )}
            </div>
            </>
        );
    }
}

export default WebSocketNotifications;
