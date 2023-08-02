export interface ISignUpRequest {
    email: string;
    password: string;
    invitation_code: string;
}

export interface ISignInRequest {
    email: string;
    password: string;
}
