import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getPosts } from '../services/postService';

export default function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPosts();
                setPosts(data.result);
            } catch (error) {
                console.error('Failed to load posts', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Danh sách bài viết</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            marginBottom: 10,
                            padding: 10,
                            backgroundColor: '#f9f9f9',
                            borderRadius: 5,
                        }}
                        onPress={() => navigation.navigate('Detail', { postId: item.id, htmlContent: item.noidung })}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.tieude}</Text>
                        <Text numberOfLines={2}>{item.body}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
