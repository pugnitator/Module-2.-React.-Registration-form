import { React, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputComponent } from "./FormInputComponent.jsx";
import styled from 'styled-components';

const emailRegex = /^[\w\._]+@[a-z]+\.[a-z]{2,}$/;

const registrationFormScheme = yup
  .object()
  .required()
  .shape({
    email: yup
      .string()
      .min(4, "В email должно быть не менее 4х символов")
      .max(20, "В email должно быть не более 20 символов")
      .matches(
        emailRegex,
        "Форма записи example@example.domain. Допустимые символы: a-z A-Z 0-9 _"
      ),
    password: yup
      .string()
      .min(4, "В пароле должно быть не менее 4х символов")
      .max(20, "В пароле должно быть не более 20 символов"),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], 'Не совпадает с полем "password"'),
  }
);

export function FormComponent() {
  const submitButtonRef = useRef();
  const form = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(registrationFormScheme),
  });

  const { register, handleSubmit, formState: { errors, isValid } } = form;

  // Тут фокусируемся на кнопке Отправить, если в форме нет ошибок
  // if (isValid) {
  //   submitButtonRef.current.focus();
  // }

  const onSubmit = (data) => {
    const {email, password} = data
    console.log("submit", {email, password})
};

  return (
      <Form {...form} onSubmit={handleSubmit(onSubmit)}>
        <FormInputComponent
          register={register("email")}
          placeholder="E-mail"
          type='email'
          errorMessage={errors.email?.message}
        />
        <FormInputComponent
          register={register("password")}
          placeholder="Password"
          type='password'
          errorMessage={errors.password?.message}
        />
        <FormInputComponent
          register={register("repeatPassword")}
          placeholder="Repeat password"
          type='password'
          errorMessage={errors.repeatPassword?.message}
        />
        <SubmitButton 
            type="submit"  
            ref={submitButtonRef} 
            disabled={form.isValid} 
        />
      </Form>
  );
}

const Form = styled.form`
    box-sizing: border-box;
    margin: auto;
    padding: 20px;
    min-width: 300px;
    max-width: 70%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    background-color: #beccf79e;
`

const SubmitButton = styled.input`
    margin: auto;
    height: 30px;
    border: none;
    border-radius: 3px;
    color: white;
    background-color: #6D3FE0;
    &:hover {
      background-color: #6D7DE0;
      border: 2px solid #6D3FE0;
    };
    &:focus {
      background-color: #6D7DE0;
      border: 2px solid #6D3FE0;
    }
`