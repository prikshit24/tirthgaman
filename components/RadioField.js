import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RadioField = ({options = [], onChangeSelect, selected}) => {
  return (
    <View style={{marginLeft:2,flexDirection:'row',justifyContent:'space-around'}}>
      {options.map((opt, index) => (
        <TouchableOpacity
          onPress={() => onChangeSelect(opt, index)}
          style={styles.optContainer}>
          <View style={styles.outlineCircle}>
            {selected === index && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.text}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default RadioField;

const styles = StyleSheet.create({
  outlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#db4242',
},
  optContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#db4242',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#633549',
},
  text: {
    fontSize: 15,
    color: '#000',
    paddingLeft: 10,
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
