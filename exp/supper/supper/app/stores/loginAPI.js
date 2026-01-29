import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Config } from '../../env';

const api = createApi({
	reducerPath: 'loginApi',
	baseQuery: fetchBaseQuery({ baseUrl: `https://${Config.API}` }),
	tagTypes: ['Login'],
	endpoints: (builder) => ({
		addLogin: builder.mutation({
			query: ({ username, password, deviceId, recaptchaToken: Token, domain }) => {
				return {
					url: '/Auth/Login',
					method: 'POST',
					credentials: 'include',
					headers: { ValidateDevice: 1, domain, Token },
					body: { username, password, deviceId },
				};
			},
			providesTags: (result, error, id) => [{ type: 'Login', id, result }],
			transformResponse: (response, meta, arg) => {
				return response.data;
			},
		}),
	}),
});

export const { useAddLoginMutation } = api;
export default api;
