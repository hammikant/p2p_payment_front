export interface ISignUpRequest {
    email: string;
    password: string;
    invitationCode: string;
}

export interface ISignInRequest {
    email: string;
    password: string;
}
