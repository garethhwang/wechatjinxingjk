import React from 'react';
import {
asset,
AppRegistry,
Pano,
View,
Video,
VideoControl,
MediaPlayerState,
NativeModules,
} from 'react-vr';

export default React.createClass({
    render: function () {
        return (
            <View>
                <Pano source={asset('mpk18.jpg')}/>
                <Text
                  style={{
                    backgroundColor: 'blue',
                    fontSize: 0.8,
                    layoutOrigin: [0.5, 0.5],            
                    transform: [{translate: [0, 0, -3]}],
                  }}>
                  hello
                </Text>
            </View>
        );
    }
})
