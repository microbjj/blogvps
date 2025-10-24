import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { AuthFormError, Button, Input } from '@/components'
import { Link, useNavigate } from 'react-router'
import { setUser } from '@/actions/index.js'
import { useDispatch } from 'react-redux'
import { request } from '@/utils'

const authSchema = yup.object().shape({
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
})

export function Auth() {
	const [authError, setAuthError] = useState(null)
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
		},
		resolver: yupResolver(authSchema),
	})

	const onSubmit = async ({ login, password }) => {
		reset()
		setAuthError(null)
		try {
			const { error, user } = await request('/login', 'POST', { login, password })
			if (error) {
				console.error('Ошибка авторизации: ', error)
				setAuthError(error)
				return
			}
			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
			navigate('/')
		} catch (error) {
			console.error('Непредвиденная ошибка:', error)
		}
	}

	const formErrors = errors?.login?.message || errors?.password?.message
	const errorMessage = formErrors || authError

	return (
		<div className="flex flex-col gap-y-2 w-60 items-center mx-auto">
			<h2 className="text-lg font-bold mb-2">Авторизация</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-y-2"
			>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', { onChange: () => setAuthError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', { onChange: () => setAuthError(null) })}
				/>
				<Button disabled={!!formErrors}>Войти</Button>
			</form>
			{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			<Link
				className="inline-flex w-full justify-start text-sm underline"
				to="/register"
			>
				Регистрация
			</Link>
		</div>
	)
}
