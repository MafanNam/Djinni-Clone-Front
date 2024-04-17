import { ChangeEvent, FormEvent } from 'react'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface LoginForm extends FormSubmit {
  email: string
  password: string
}

export interface BaseApi {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ListBaseApi {
  count: number;
  next: string;
  previous: string;
}