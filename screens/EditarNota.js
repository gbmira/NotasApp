import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarNota({ route, navigation }) {
    const { note } = route.params || { note: null };
    const [title, setTitle] = useState(note ? note.title : '');
    const [content, setContent] = useState(note ? note.content : '');

    const createNote = async (title, content) => {
        try {
            const noteId = Date.now();
            const newNote = { id: noteId, title, content };
            await AsyncStorage.setItem(noteId.toString(), JSON.stringify(newNote));
            return newNote;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    };

    const saveNote = async () => {
        try {
            if (note) {
                const updatedNote = { ...note, title, content };
                await AsyncStorage.setItem(note.id.toString(), JSON.stringify(updatedNote));
                console.log(updatedNote);
                navigation.navigate('DetalheNota', { note: updatedNote });
            } else {
                const newNote = await createNote(title, content);
                console.log(newNote);
                navigation.navigate('DetalheNota', { note: newNote });
            }
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const deleteNote = async () => {
        try {
            if (note) {
                await AsyncStorage.removeItem(note.id.toString());
            }
            navigation.navigate('ListaNotas');
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.texts}>Editar Nota</Text>
            <TextInput
                placeholder="Titulo"
                placeholderTextColor="#2171AC"
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.inputs}
            />
            <TextInput
                placeholder="Descrição"
                placeholderTextColor="#2171AC"
                value={content}
                onChangeText={text => setContent(text)}
                style={styles.inputs}
            />
            <Button title="Save Note" onPress={saveNote} />
            {note && <Button title="Delete Note" onPress={deleteNote} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        gap: 10,
        marginTop: 10
    },

    texts: {
        fontSize: 22,
        marginBottom: 10
    },

    inputs: {
        borderWidth: 2,
        width: 300,
        height: 30,
        paddingLeft: 4
    }
})