import { ChangeEvent, useRef, useState, useEffect, useCallback } from 'react';

import { Backdrop } from '@ui/backdrop';
import { ActionModal } from '@ui/action-modal';
import { ImageFigure } from '@ui/image-figure';
import { updateUser } from '@features/services/auth';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';
import { readFileAsDataURL, resizeImage } from 'helpers/image-config';
import { authSelector, resetAuthStatus, setAuthActionType } from '@features/slices/auth';
import defaultUserImg from '../../assets/user-default-image.webp';

export const UserImage = ({ maxHeight = 300 }: { maxHeight?: number }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { status, actionType } = useAppSelector(authSelector);
  const [modal, setModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>('');
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const imageSelectHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.match(/^image\//)) {
      const originalURL = await readFileAsDataURL(file);
      const image = await resizeImage(
        maxHeight,
        originalURL as string,
        canvas as HTMLCanvasElement,
      );
      dispatch(resetAuthStatus());
      setImage(image as string);
    }
  };

  const triggerFileInput = () => inputRef.current?.click();
  const resetImage = useCallback(() => setImage(''), []);
  const closeModal = () => {
    setModal(false);
    resetImage();
  };
  const uploadImage = () => {
    dispatch(setAuthActionType('uploading image'));
    dispatch(updateUser({ image }));
  };

  useEffect(() => {
    if (status !== 'loading' && actionType === 'uploading image')
      dispatch(setAuthActionType(''));
  }, [status]);

  useEffect(() => {
    const fileInput = inputRef.current;
    const canvas = document.createElement('canvas');
    setCanvas(canvas);
    fileInput?.addEventListener('reset', resetImage);
    return () => {
      fileInput?.removeEventListener('reset', resetImage);
    };
  }, [inputRef, resetImage]);

  return (
    <>
      {modal ? (
        <>
          <ActionModal
            image={image}
            actionType="upload"
            closeModal={closeModal}
            extraAction={triggerFileInput}
            confirmAction={uploadImage}
          />
          <Backdrop onClick={closeModal} className="z-30" />
        </>
      ) : null}

      <ImageFigure
        status={status}
        actionType={actionType}
        className={`h-36 w-36 bg-black`}
        onClick={() => (status !== 'loading' ? setModal(true) : null)}
        src={`${user?.image ? user?.image : defaultUserImg}`}>
        <input aria-hidden={true} type="hidden" value={image} />
        <input
          type="file"
          ref={inputRef}
          id="user-image"
          name="user-image"
          onChange={imageSelectHandler}
          className="center-absolute hidden"
        />
      </ImageFigure>
    </>
  );
};
