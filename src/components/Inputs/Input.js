import { View, TextInput, StyleSheet, Text } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const Input = ({ placeholder, rules = {}, control, name, secureTextEntry }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View style={styles.container}>
            <TextInput
              style={[styles.input, { borderColor: error ? "red" : "white" },]}
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="white"
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#93B1A6",
    padding: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: "white",
    fontSize: 20
  },


});

export default Input;
