import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

  const pass = watch("password");

  const onBackToLogin = () => {
    navigation.navigate("Login");
  };

  const onRegisterPressed = () => {
    navigation.navigate("Login");
  };

  const EMAIL_REGEX = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/;

  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, { height: height * 0.3 }]}
        source={Logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Create an account</Text>

      <Input
        name="Firstname"
        placeholder="FirstName"
        control={control}
        rules={{
          required: "FirstName is required",
        }}
      />

      <Input
        name="lastname"
        placeholder="Lastname"
        control={control}
        rules={{
          required: "Lastname is required",
        }}
      />

      <Input
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
        }}
      />
      <Input
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />
      <Input
        name="confirm-password"
        placeholder="Confirm Password"
        control={control}
        secureTextEntry
        rules={{
          validate: (value) => value === pass || "Password do not match",
        }}
      />

      <Button
        text="Register"
        type="PRIMARY"
        onPress={handleSubmit(onRegisterPressed)}
      />
      <Button
        text="Already have an account? Log in here."
        onPress={onBackToLogin}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#000000",
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },

  logo: {
    width: "70%",
    maxWidth: 300,
    height: 100,
  },
});

export default LogIn;
