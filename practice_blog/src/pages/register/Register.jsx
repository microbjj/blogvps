import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { AuthFormError, Button, Input } from '@/components'
import { useNavigate } from 'react-router'
import { setUser } from '@/actions/index.js'
import { useDispatch } from 'react-redux'
import { request } from '@/utils'

const registerSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры.')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки % и #',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Введите повторно пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

export function Register() {
	const [registerError, setRegisterError] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(registerSchema),
	})

	const onSubmit = async ({ login, password }) => {
		reset()
		setRegisterError(null)
		try {
			const { error, user } = await request('/register', 'POST', {
				login,
				password,
			})
			if (error) {
				console.error('Ошибка регистрации: ', error)
				setRegisterError(error)
				return
			}
			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
			navigate('/')
		} catch (error) {
			console.error('Непредвиденная ошибка:', error)
		}
	}

	const formErrors =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message
	const errorMessage = formErrors || registerError

	return (
		<div className="flex flex-col gap-y-2 w-60 items-center mx-auto">
			<h2 className="text-lg font-bold mb-2">Регистрация</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-y-2"
			>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', { onChange: () => setRegisterError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', { onChange: () => setRegisterError(null) })}
				/>
				<Input
					type="password"
					placeholder="Повтор пароля"
					{...register('passcheck', { onChange: () => setRegisterError(null) })}
				/>
				<Button disabled={!!formErrors}>Зарегистрироваться</Button>
			</form>
			{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
		</div>
	)
}
