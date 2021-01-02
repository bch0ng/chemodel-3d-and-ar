import * as React from 'react';
import { Modal, SafeAreaView, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export function TipModal(): JSX.Element {
    const [isModalOpen, setIsModalOpen] = React.useState(true);

    return (
        <Modal
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            transparent={true}
            animationType="fade"
            visible={isModalOpen}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '80%',
                        borderRadius: 5,
                        padding: 25
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}
                    >
                        Tips
                    </Text>
                    <FlatList
                        data={[
                            {
                                key: 0,
                                action: 'Drag',
                                tip: ' to move the molecule.'
                            },
                            {
                                key: 1,
                                action: 'Click',
                                tip: ' on an atom to see more info.'
                            }
                        ]}
                        keyExtractor={(item, _index) => item.key.toString()}
                        renderItem={({ item }) => (
                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    - {item.action}
                                </Text>
                                {item.tip}
                            </Text>
                        )}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'lightblue',
                            marginTop: 25,
                            padding: 10,
                            borderRadius: 5
                        }}
                        onPress={(): void => setIsModalOpen(false)}
                    >
                        <Text style={{ fontWeight: 'bold' }}>Got it</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
}
