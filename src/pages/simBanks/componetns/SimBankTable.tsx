import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ChangeableTitle} from '../../../components/changeableTitle';
import {ICellPhoneSimBank, ISimBank} from '../store/types';
import {Button, OutputClipBoard, SubTitle} from '../../../fields';
import {Close, Delete} from '../../../icons';
import {useAppDispatch} from '../../../hooks/app';
import {deleteCellPhones, deleteSimBank} from '../store/simBanks.thunk';
import {Modal} from '../../../components/modal';
import {setConnectingCellPhones} from '../store/simBanks.slice';
import styles from './styles.module.scss';
import {CellPhoneList} from './CellPhoneList';

export const SimBankTable = ({name, create_as, redirectMail, cellPhones, id}: ISimBank) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [phones, setPhones] = useState<ICellPhoneSimBank[]>([]);
    const [isSelectAll, setSelectAll] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [isDeleteCellPhones, setDeleteCellPhonesModal] = useState<boolean>(false);
    const [isCopyPress, setCopyPress] = useState<boolean>(false);

    useEffect(() => {
        if (isSelectAll) {
            const items = cellPhones.map(item => ({...item, status: 'active'})) as ICellPhoneSimBank[];
            setPhones(items);
        } else {
            setPhones(cellPhones);
        }
    }, [cellPhones, isSelectAll]);

    const handleChecked = (id: number) => {
        const items = phones.map(item => {
            if (item.id === id) {
                return {...item, status: item.status === 'active' ? 'inactive' : 'active'};
            }
            return item;
        }) as ICellPhoneSimBank[];

        setPhones(items);
    };

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
        await navigator.clipboard.writeText(redirectMail);
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
                    <ChangeableTitle title={name} handleChangeTitle={() => {
                    }}/>
                    <span className={styles.data}>Добавлен: {create_as} &#183; ID: {id}</span>
                </div>
                <div className={styles.headerButton}>
                    <Button
                        text={isSelectAll ? 'Снять выделение' : 'Выбрать все номера'}
                        variant={'outline'}
                        style={{color: '#ffffff'}}
                        onClick={() => setSelectAll(!isSelectAll)}
                    />
                </div>
            </div>
            <div className={'space-top-24'}/>
            <CellPhoneList items={phones} interactive={true} handleChecked={handleChecked}/>
            <div className={'space-top-32'}/>
            <div className={styles.footer}>
                <div className={styles.footerCol}>
                    <Button
                        text={'Подключить'}
                        variant={'full'}
                        onClick={() => setShowModal(true)}
                    />
                </div>
                <div className={styles.footerCol}>
                    <Button
                        text={'Удалить номера'}
                        variant={'outline'}
                        onClick={() => setDeleteCellPhonesModal(true)}
                    />
                </div>
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
                    text={redirectMail}
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
