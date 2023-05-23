import {useOutletContext} from 'react-router-dom';

export type Role = 'trader' | 'merchant'

export type roleType = { role: Role };

export const useUserRole = () => {
    return useOutletContext<roleType>();
};
