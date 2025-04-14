import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Login.module.scss";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "lolka@gmail.com",
      password: "123456",
    },
    mode: 'onChange',
  });

  async function onSubmit(values) {
    const data = await dispatch(fetchUserData(values));
    
    if (!data.payload) {
      return (alert("Не удалось авторизоваться"))
    }

    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token)
    }
  }
  
  if (isAuth) {
    navigate("/");
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={errors.email && true}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Укажите почту",
          })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
          error={errors.password && true}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Укажите пароль",
          })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
