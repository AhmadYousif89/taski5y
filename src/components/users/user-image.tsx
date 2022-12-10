import { ChangeEvent, useRef, useState, useEffect, useCallback } from 'react';
import { Backdrop } from '@ui/backdrop';
import { ActionModal } from '@ui/action-modal';
import { ImageFigure } from '@ui/image-figure';
import { useAppDispatch, useAuth } from '@app/hooks';
import { readFileAsDataURL, resizeImage } from 'helpers/image-config';
import { updateUser } from '@features/services/auth';
import { resetAuth } from '@features/slices/auth';

export const UserImage = ({ maxHeight = 300 }: { maxHeight?: number }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
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
      setImage(image as string);
    } else setImage('');
  };

  const triggerFileInput = () => inputRef.current?.click();
  const handleImageReset = useCallback(() => setImage(''), [setImage]);

  useEffect(() => {
    const fileInput = inputRef.current;
    const canvas = document.createElement('canvas');
    setCanvas(canvas);
    fileInput?.addEventListener('reset', handleImageReset);
    return () => {
      fileInput?.removeEventListener('reset', handleImageReset);
    };
  }, [inputRef, handleImageReset]);

  const closeModal = () => {
    dispatch(resetAuth());
    setModal(false);
    setImage('');
  };

  return (
    <>
      {modal ? (
        <>
          <ActionModal
            image={image}
            actionType="upload"
            closeModal={closeModal}
            extraAction={triggerFileInput}
            confirmAction={() => dispatch(updateUser({ image }))}
          />
          <Backdrop onClick={closeModal} className="z-30" />
        </>
      ) : null}

      <ImageFigure
        className="ring-color-base"
        onClick={() => setModal(true)}
        src={`${user?.image ? user?.image : '/public/user-profile-img.webp'}`}>
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
