import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetalheNota({ route, navigation }) {
    const { note } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.texts}>Detalhes da nota</Text>

            <View style={styles.nota}>
            <Text>Titulo: {note.title}</Text>
            <Text>Descrição: {note.content}</Text>
            </View>
            <Button
                title="Editar Nota"
                onPress={() => navigation.navigate('EditarNota', { note })}
            />
            <Button
                title="Visualizar todas as notas"
                onPress={() => navigation.navigate('ListaNotas')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        gap: 10
    },

    nota: {
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#2171ac'
    },

    texts: {
        fontSize: 22,
        marginBottom: 10
    },
})