// import { useEffect, useState } from "react";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function Login() {
	function handleSuccess(credentialResponse: CredentialResponse): void {
		console.log('Login Success:', credentialResponse);
	}

	function handleError(): void {
		console.log('Login Failed');
	}

	return (
		<div className="login-container min-h-screen flex flex-col justify-center">
			<div className="login-content bg-white p-8 rounded-lg shadow-lg w-full flex flex-col items-center">
				<h2 className="login-title text-2xl font-bold text-center mb-6">Sign in</h2>
				<div className="google-login-wrapper flex justify-center">
					<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
						<GoogleLogin
							onSuccess={handleSuccess}
							onError={handleError}
							useOneTap
						/>
					</GoogleOAuthProvider>
				</div>
			</div>
		</div>
	)
}