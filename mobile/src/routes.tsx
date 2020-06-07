import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from './pages/Detail';
import Home from './pages/Home';
import Points from './pages/Points';

// cria navegação stack (sem remover views visitadas anteriormente)
const AppStack = createStackNavigator(); 

const Routes = () => {
    return (
        <NavigationContainer>
            {/* 
                - `headerMode="none"` oculta o nome da roda da view do app 
                - `screenOptions.cardStyle` aplica o estilo globalmente a todas as views do app
            */}
            <AppStack.Navigator 
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5'
                    }
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;