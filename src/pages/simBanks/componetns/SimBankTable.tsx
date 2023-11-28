import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ChangeableField} from '../../../components/changeableField';
import {ICellPhoneSimBank, ISimBank} from '../store/types';
import {Button, OutputClipBoard, SubTitle} from '../../../fields';
import {Close, Delete} from '../../../icons';
import {useAppDispatch} from '../../../hooks/app';
import {changeSimBank, deleteCellPhones, deleteSimBank} from '../store/simBanks.thunk';
import {Modal} from '../../../components/modal';
import {setConnectingCellPhones} from '../store/simBanks.slice';
import styles from './styles.module.scss';
import {CellPhoneList} from './CellPhoneList';

interface SimBankTableProps {
    bank: ISimBank;
    handleEdit: () => void;
}

export const SimBankTable = ({bank, handleEdit}: SimBankTableProps) => {
    const {id, displayName, numbers} = bank;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [phones, setPhones] = useState<ICellPhoneSimBank[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [isDeleteCellPhones, setDeleteCellPhonesModal] = useState<boolean>(false);
    const [isCopyPress, setCopyPress] = useState<boolean>(false);
    const [isSelectAll, setSelectAll] = useState<boolean>(false);

    const handleDeleteSelected = () => {
        const cellPhones = phones.filter(i => i.status === 'active');
        dispatch(deleteCellPhones({id, cellPhones}));
        setDeleteCellPhonesModal(false);
    };

    const handleDeleteBank = () => {
        dispatch(deleteSimBank({id}));
    };

    const handleClipBoard = async () => {
        setCopyPress(true);
    };

    const handleConnect = () => {
        dispatch(setConnectingCellPhones(phones));
        navigate('/connect-cellphones', {
            state: {simBankId: id}
        });
    };
    return (
        <div className={styles.simBankTable}>
            <div className={styles.header}>
                <div>
                    <ChangeableField
                        title={displayName}
                        handleEdit={handleEdit}
                    />
                    <span className={styles.data}>ID: {id}</span>
                </div>
                {/*<div className={styles.headerButton}>*/}
                {/*    <Button*/}
                {/*        text={isSelectAll ? 'Снять выделение' : 'Выбрать все номера'}*/}
                {/*        variant={'outline'}*/}
                {/*        style={{color: '#ffffff'}}*/}
                {/*        onClick={() => setSelectAll(!isSelectAll)}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
            <div className={'space-top-24'}/>
            <CellPhoneList items={numbers}/>
            <div className={'space-top-32'}/>
            <div className={styles.footer}>
                {/*<div className={styles.footerCol}>*/}
                {/*    <Button*/}
                {/*        text={'Подключить'}*/}
                {/*        variant={'full'}*/}
                {/*        onClick={() => setShowModal(true)}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className={styles.footerCol}>*/}
                {/*    <Button*/}
                {/*        text={'Удалить номера'}*/}
                {/*        variant={'outline'}*/}
                {/*        onClick={() => setDeleteCellPhonesModal(true)}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className={styles.footerCol}>
                    <button
                        className={styles.deleteButton}
                        type={'button'}
                        onClick={() => setDeleteModal(true)}>
                        <Delete/> Удалить банк
                    </button>
                </div>
            </div>
            <Modal
                show={showModal}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setShowModal(false)}>
                <span
                    className={'closeIcon'}
                    onClick={() => setShowModal(false)}>
                    <Close
                        color={'#667180'}
                        height={'32'}
                        width={'32'}/>
                </span>
                <SubTitle text={'Подключение номеров'} style={{textAlign: 'center'}}/>
                <div className={'space-top-48'}/>
                <p className={'text-16'} style={{textAlign: 'center'}}>Включите переадресацию на данную почту, после
                    чего нажмите кнопку «Далее»</p>
                <div className={'space-top-24'}/>
                <OutputClipBoard
                    text={'redirectMail'}
                    isCopyPress={isCopyPress}
                    onMouseUp={() => setCopyPress(false)}
                    onMouseDown={handleClipBoard}
                />
                <div className={'space-top-72'}/>
                <div className={styles.modalFooter}>
                    <Button
                        text={'Далее'}
                        variant={'full'}
                        style={{width: '146px'}}
                        onClick={handleConnect}
                    />
                    <Button
                        text={'Отмена'}
                        variant={'outline'}
                        style={{width: '146px', color: '#ffffff'}}
                    />
                </div>
            </Modal>
            <Modal
                show={deleteModal}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setDeleteModal(false)}>
                <span
                    className={'closeIcon'}
                    onClick={() => setDeleteModal(false)}>
                    <Close
                        color={'#667180'}
                        height={'32'}
                        width={'32'}/>
                </span>
                <SubTitle text={'Удалить банк?'} style={{textAlign: 'center'}}/>
                <div className={'space-top-24'}/>
                <div className={styles.delete}>
                    <Button
                        text={'Удалить'}
                        variant={'full'}
                        style={{width: '48%', backgroundColor: '#F22451'}}
                        onClick={handleDeleteBank}
                    />
                    <Button
                        text={'Отмена'}
                        variant={'outline'}
                        style={{width: '48%', color: '#ffffff'}}
                        onClick={() => setDeleteModal(false)}
                    />
                </div>
            </Modal>
            <Modal
                show={isDeleteCellPhones}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setDeleteCellPhonesModal(false)}>
                <span
                    className={'closeIcon'}
                    onClick={() => setDeleteCellPhonesModal(false)}>
                    <Close
                        color={'#667180'}
                        height={'32'}
                        width={'32'}/>
                </span>
                <SubTitle text={'Удаление номера'} style={{textAlign: 'center'}}/>
                <p className={'text-16'}>Вы уверены, что хотите
                    удалить {phones.filter(i => i.status === 'active').length} номеров из SIM-Банка Небольшое
                    название?</p>
                <div className={'space-top-24'}/>
                <div className={styles.delete}>
                    <Button
                        text={'Удалить'}
                        variant={'full'}
                        style={{width: '48%', backgroundColor: '#F22451'}}
                        onClick={handleDeleteSelected}
                    />
                    <Button
                        text={'Отмена'}
                        variant={'outline'}
                        style={{width: '48%', color: '#ffffff'}}
                        onClick={() => setDeleteModal(false)}
                    />
                </div>
            </Modal>
        </div>
    );
};
