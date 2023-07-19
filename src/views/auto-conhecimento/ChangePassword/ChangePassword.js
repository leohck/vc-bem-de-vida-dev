import { Button, Input, FormItem, FormContainer } from "../../../components/ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMainUserID } from "../../../hooks/useMainUserID";
import { apiResetPassword } from "../../../services/AuthService";
import { toastFeedback } from "../../../utils/actionFeedback";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const validationSchema = Yup.object().shape({
	old_password: Yup.string().required("Senha Atual"),
	password: Yup.string().required("Nova Senha"),
	password2: Yup.string()
		.required("Confirmar Nova Senha")
		.oneOf([Yup.ref("password")], "As senhas precisam ser iguais")
});

const DependentValidation = () => {
	
	const { userID } = useMainUserID();
	
	const [pwInputType, setPwInputType] = useState('password')
	
	const onPasswordVisibleClick = (e) => {
		e.preventDefault()
		setPwInputType(pwInputType === 'password' ? 'text' : 'password')
	}
	
	const passwordVisible = (
		<span
			className="cursor-pointer"
			onClick={(e) => onPasswordVisibleClick(e)}
		>
            {pwInputType === 'password' ? (
	            <HiOutlineEyeOff />
            ) : (
	            <HiOutlineEye />
            )}
        </span>
	)
	
	return (
		<Formik
			enableReinitialize
			initialValues={{
				old_password: "",
				password: "",
				password2: ""
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { resetForm, setSubmitting, setFieldError }) => {
				setSubmitting(true);
				await apiResetPassword(userID, {
					old_password: values['old_password'],
					password: values['password'],
					password2: values['password2'],
				}).then(
					response => {
						if (response.status === 200) {
							toastFeedback("success", "Senha Alterada");
							resetForm();
							setSubmitting(false);
						}
					}
				).catch(
					error => {
						setFieldError('old_password', 'Senha Atual Incorreta!')
					}
				);
			}}
		>
			{({ resetForm, touched, errors, isSubmitting }) => {
				return (
					<Form>
						<FormContainer>
							<FormItem
								label="Senha Atual"
								invalid={errors.old_password && touched.old_password}
								errorMessage={errors.old_password}
							>
								<Field
									type={pwInputType}
									suffix={passwordVisible}
									autoComplete="off"
									name="old_password"
									placeholder="Senha Atual"
									component={Input}
								/>
							</FormItem>
							<FormItem
								label="Nova Senha"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									type={pwInputType}
									suffix={passwordVisible}
									autoComplete="off"
									name="password"
									placeholder="Nova Senha"
									component={Input}
								/>
							</FormItem>
							<FormItem
								label="Confirmar Nova Senha"
								invalid={
									errors.password2 &&
									touched.password2
								}
								errorMessage={errors.password2}
							>
								<Field
									type={pwInputType}
									suffix={passwordVisible}
									autoComplete="off"
									name="password2"
									placeholder="Confirmar Nova Senha"
									component={Input}
								/>
							</FormItem>
							<FormItem>
								<div className="flex gap-2">
									<Button
										variant="solid"
										size="sm"
										type="submit"
										loading={isSubmitting}
									>
										Salvar
									</Button>
								</div>
							</FormItem>
						</FormContainer>
					</Form>
				);
			}}
		</Formik>
	);
};

export default DependentValidation;

