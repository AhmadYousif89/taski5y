import { ChangeEvent, useRef, useState, useEffect, useCallback } from 'react';

import { useAuth, useAppDispatch, useAppSelector } from 'app/hooks';
import { ActionModal, Backdrop, ImageFigure } from 'components/ui';

import { updateUser } from 'features/services/auth';
import { authSelector, resetAuthStatus, setAuthActionType } from 'features/slices/auth';

import { readFileAsDataURL, resizeImage } from 'helpers';
import defaultUserImg from 'assets/avatar-default.png';

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
      if (originalURL && canvas) {
        const image = await resizeImage(maxHeight, `${originalURL}`, canvas);
        setImage(image + '');
        dispatch(resetAuthStatus());
      }
    }
  };

  const triggerFileInput = () => inputRef.current?.click();
  const resetImage = useCallback(() => setImage(''), []);
  const closeModal = () => {
    setModal(false);
    resetImage();
  };
  const uploadImage = () => {
    dispatch(setAuthActionType('uploading_image'));
    dispatch(updateUser({ image }));
  };

  useEffect(() => {
    if (status !== 'loading' && actionType === 'uploading_image') dispatch(setAuthActionType(''));
  }, [status, actionType, dispatch]);

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
          <Backdrop onClick={closeModal} className="z-[35]" />
        </>
      ) : null}

      <ImageFigure
        status={status}
        actionType={actionType}
        className={`h-36 w-36`}
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
