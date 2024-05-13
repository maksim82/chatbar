import { Modal } from '@/shared/ui/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { Loader } from '@/shared/ui/Loader/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { GoogleLogin } from '@react-oauth/google';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <LoginFormAsync />
            {/*<GoogleLogin*/}
            {/*    onSuccess={credentialResponse => {*/}
            {/*        console.log(credentialResponse);*/}
            {/*    }}*/}
            {/*    onError={() => {*/}
            {/*        console.log('Login Failed');*/}
            {/*    }}*/}
            {/*/>*/}
        </Suspense>
    </Modal>
);
