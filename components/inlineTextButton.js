import { Text, Pressable } from 'react-native';
import AppStyle from '../styles/AppStyle.js';

export default function InlineTextButton(props) { 
  return (
    <Pressable onPress={props.onPress}>
          {({ pressed }) => (
            <Text 
              style={pressed ? AppStyle.inLineTextButtonPressed : AppStyle.inLineTextButton}
              >   
              {props.text}
            </Text>
           )}
    </Pressable>
  )
}