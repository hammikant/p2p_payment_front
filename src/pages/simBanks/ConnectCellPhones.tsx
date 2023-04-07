import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {Button} from '../../fields';
import {GoBack} from './componetns/GoBack';
import {clearConnectingCellPhones} from './store/simBanks.slice';
import {CellPhoneList} from './componetns';
import {connectCellPhonesInSimBank} from './store/simBanks.thunk';

export const ConnectCellPhones = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {connectingCellPhones} = useAppSelector(state => state.simBanks);

    const handleGoBack = () => {
        dispatch(clearConnectingCellPhones());
        navigate(-1);
    };

    const sendCellPhones = () => {
        const id = location.state?.simBankId;
        if (id) {
            dispatch(connectCellPhonesInSimBank({id: Number(id), cellPhones: connectingCellPhones}));
            navigate(-1);
        }
    };

    return (
        <MainLayout
            titlePage={'Подключение номеров'}
            descriptionPage={<GoBack text={'SIM-Банки'} handleGoBack={handleGoBack}/>}
        >
            <CellPhoneList items={connectingCellPhones} interactive={false}/>
            <div className={'space-top-32'}/>
            <Button text={'Готово'} variant={'full'} style={{width: '167px'}} onClick={sendCellPhones}/>
        </MainLayout>
    );
};
