export const authDb = (
    {
        email,
        displayName = '',
        role
    }: { email: string, displayName?: string, role: 'trader' | 'merchant' }) => {
    return {
        token: '23jk4h24h2kh5g2h345g2h35gk23452khg52kh5gk345gkj42hg2k',
        email: email,
        displayName: displayName,
        changeDataPassword: '20 мар. 2023, 15:48',
        role
    };
};
