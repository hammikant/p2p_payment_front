import {useOutletContext} from 'react-router-dom';

export type roleType = { role: 'trader' | 'merchant' };

export const useUserRole = () => {
    return useOutletContext<roleType>();
};
