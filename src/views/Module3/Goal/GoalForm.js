import React from "react";
import { Card, Select } from "../../../components/ui";
import { Field, Form, Formik } from "formik";
import { Input, Button, FormItem, FormContainer } from "components/ui";
import ActionPlanList from "../ActionPlan/ActionPlanList";
import ActionPlan from "../ActionPlan";
import { conquistasOptions } from "../../auto-conhecimento/form.options";

function GoalForm() {

	function validateField(value) {
		if (!value) {
			return "Required";
		}
		return;
	}

	// const data = {
	// 	value,
	// 	icon,
	// 	motivation,
	// 	estimated_deadline,
	// 	action_plan,
	// 	action_plan_list
	// };
	return (
		<Card header="Cadastrar Meta">
			<Formik
				initialValues={{
					value: "",
					icon: "",
					motivation: "",
					estimated_deadline: ""
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ errors, touched, isValidating }) => (
					<Form>
						<FormContainer>
							<div className="flex flex-row gap-4">
								<FormItem
									label="Meta"
									invalid={errors.value && touched.value}
									errorMessage={errors.value}
								>
									<Field
										className="w-[400px]"
										type="text"
										name="value"
										placeholder="Meta"
										component={Input}
										validate={validateField}
									/>
								</FormItem>
								<FormItem
									label="Icone"
									invalid={errors.icon && touched.icon}
									errorMessage={errors.icon}
								>
									<Select placeholder="Icone"
									        name="icon"
									        className="max-w-[100px] h-10"
									        isSearchable={false}
									        options={conquistasOptions}
										// value={icon}
										// onChange={(e) => setIcon(e)}
									/>
								</FormItem>
							</div>
							<FormItem
								label="Motivação"
								invalid={errors.motivation && touched.motivation}
								errorMessage={errors.motivation}
							>
								<Field
									type="text"
									name="motivation"
									placeholder="Motivação"
									component={Input}
									validate={validateField}
								/>
							</FormItem>
							<FormItem
								label="Prazo Estimado"
								invalid={errors.estimated_deadline && touched.estimated_deadline}
								errorMessage={errors.estimated_deadline}
							>
								<Field
									type="date"
									name="estimated_deadline"
									className="w-[165px]"
									placeholder="Motivação"
									component={Input}
									validate={validateField}
								/>
							</FormItem>
							<ActionPlan />
							<FormItem className="mt-10">
								<Button type="submit" variant="solid">
									Salvar
								</Button>
							</FormItem>
						</FormContainer>
					</Form>
				)}
			</Formik>

		</Card>
	);
}

export default GoalForm;
