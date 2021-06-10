import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Modal from "../../components/Modal";
import { userDataService } from "../../services/userDataService";
import Loading from "../../components/Loading";

export const RegisterForm = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { name: "", phone: "", password: "" },
  });
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await userDataService.register(data);
    setIsSubmitting(false);
  };
  const onError = (errors, e) => console.log(errors, e);
  return (
    <form
      onSubmit={formSubmit(onSubmit, onError)}
      className={cn(className, "auth-form form")}
    >
      <div className="form__wrapper">
        <h2 className="form__heading">Реєстрація</h2>
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("customer_name", { required: true }),
            type: "text",
            placeholder: "Ім'я",
          }}
          error={errors.name && errors.name.message}
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("phone", { required: true }),
            type: "text",
            placeholder: "Номер телефону",
          }}
          error={errors.name && errors.name.message}
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("password", { required: true }),
            type: "password",
            placeholder: "Пароль",
          }}
          error={errors.name && errors.name.message}
        />
        <Button type="submit" primary className="form__submit">
          {isSubmitting ? (
            <Loading className="form__submitting" message="Реєстрація" />
          ) : (
            "Зареєструватися"
          )}
        </Button>
        <div className="form__links">
          Вже маєте профіль?
          <Link className="form__link" to="/login">
            Увійти
          </Link>
        </div>
      </div>
    </form>
  );
};

export const RegisterModal = Modal(RegisterForm);
