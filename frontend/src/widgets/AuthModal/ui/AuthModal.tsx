import { FC, useState } from "react";
import { authenticateUser } from "../../../api/auth";
import { useAuth } from "../../../app/context/AuthContext";
import styles from "./AuthModal.module.pcss";

interface Props {
    onClose: () => void;
}

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const PASSWORD_REGEX = /^.{3,}$/;

const AuthModal: FC<Props> = ({ onClose }) => {
    const { login } = useAuth();

    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const resetFields = () => {
        setUsername("");
        setPassword("");
        setUsernameError(false);
        setPasswordError(false);
        setErrorText("");
    };

    const switchMode = () => {
        setIsRegister(prev => !prev);
        resetFields();
    };

    const validate = () => {
        const isUsernameValid = USERNAME_REGEX.test(username);
        const isPasswordValid = PASSWORD_REGEX.test(password);

        setUsernameError(!isUsernameValid);
        setPasswordError(!isPasswordValid);

        if (!isUsernameValid) {
            setErrorText(
                "Имя пользователя: 3–20 символов, латиница, цифры или _"
            );
            return false;
        }

        if (!isPasswordValid) {
            setErrorText(
                "Пароль: минимум 3 символа"
            );
            return false;
        }

        setErrorText("");
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const success = await authenticateUser(username, password);

            if (success) {
                login();
                onClose();
            } else {
                setUsernameError(true);
                setPasswordError(true);
                setErrorText("Неверное имя пользователя или пароль");
            }
        } catch {
            setErrorText("Ошибка сервера");
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>{isRegister ? "Регистрация" : "Вход"}</h2>

                <input
                    className={usernameError ? styles.inputError : ""}
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value);
                        setUsernameError(false);
                    }}
                />

                <div className={styles.passwordWrapper}>
                    <input
                        className={passwordError ? styles.inputError : ""}
                        type={showPassword ? "text" : "password"}
                        placeholder={isRegister ? "Придумайте пароль" : "Пароль"}
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setPasswordError(false);
                        }}
                    />
                    <span
                        className={styles.monkey}
                        onClick={() => setShowPassword(prev => !prev)}
                        title={showPassword ? "Скрыть пароль" : "Показать пароль"}
                    >
                        {showPassword ? "🙉" : "🙊"}
                    </span>
                </div>

                {errorText && <p className={styles.error}>{errorText}</p>}

                <button onClick={handleSubmit}>
                    {isRegister ? "Зарегистрироваться" : "Войти"}
                </button>

                <p className={styles.switch}>
                    {isRegister ? "Есть аккаунт?" : "Нет аккаунта?"}
                    <span onClick={switchMode}>
            {isRegister ? " Войти" : " Зарегистрироваться"}
          </span>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
