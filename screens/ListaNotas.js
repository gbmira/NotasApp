import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 

export default function NoteList({ navigation }) {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const notesData = await AsyncStorage.multiGet(keys);
            const parsedNotes = notesData.map(([key, value]) => JSON.parse(value));
            setNotes(parsedNotes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchNotes();
        }, [])
    );

    const NoteItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('DetalheNota', { note: item })}>
                <View style={styles.noteContainer}>
                    <Text>Title: {item.title}</Text>
                    <Text>Content: {item.content}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderNoteItem = ({ item }) => {
        return (
            <View style={styles.noteWrapper}>
                <NoteItem item={item} />
            </View>
        );
    };

    const deleteNote = async (noteId) => {
        try {
            await AsyncStorage.removeItem(noteId.toString());
            const updatedNotes = notes.filter((note) => note.id !== noteId);
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.texts}>Lista de Notas</Text>
            <FlatList
                data={notes}
                renderItem={renderNoteItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button
                title="Criar Nota"
                onPress={() => navigation.navigate('EditarNota', { note: null })}
                style={styles.button}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 10
    },
      
    texts: {
        fontSize: 22,
        marginBottom: 10
    },
      
    noteWrapper: {
        marginBottom: 10
    },

    noteContainer: {
        backgroundColor: 'white',
        borderWidth: 2,
        padding: 10,
        borderRadius: 20,
        borderColor: '#2171AC'
    },

    button: {
        backgroundColor: 'white',
        margin: 30,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        marginBottom: 4
    },
});