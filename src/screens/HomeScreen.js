import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { getPosts } from '../services/postService';

export default function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPosts();
                setPosts(data.result);
                setFilteredPosts(data.result); // Ban đầu danh sách bài viết hiển thị đầy đủ
            } catch (error) {
                console.error('Failed to load posts', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Hàm lọc bài viết theo từ khóa tìm kiếm
    const handleSearch = (text) => {
        setSearchText(text);
        if (text.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const filteredData = posts.filter((item) =>
                (item.tieude && item.tieude.toLowerCase().includes(text.toLowerCase())) || 
                (item.body && item.body.toLowerCase().includes(text.toLowerCase()))
            );
            setFilteredPosts(filteredData);
        }
    };

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
            
            {/* Ô nhập tìm kiếm */}
            <TextInput
                style={{
                    height: 40,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    marginBottom: 10,
                }}
                placeholder="Tìm kiếm bài viết..."
                value={searchText}
                onChangeText={handleSearch}
            />

            <FlatList
                data={filteredPosts}
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

            {/* Nếu không có bài viết nào sau khi tìm kiếm */}
            {filteredPosts.length === 0 && (
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' }}>
                    Không tìm thấy bài viết nào!
                </Text>
            )}
        </View>
    );
}